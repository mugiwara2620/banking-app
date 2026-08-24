'use server'

import { ID, Query } from "node-appwrite"
import { createAdminClient, createSessionClient } from "../appwrite"
import { email } from "zod"
import { cookies } from "next/headers"
import { encryptId, extractCustomerIdFromUrl, parseStringify } from "../utils"
import { CountryCode, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum, Products } from "plaid"
import { plaidClient } from "../plaid"
import { revalidatePath } from "next/cache"
import { addFundingSource, createDwollaCustomer } from "./dwolla.actions"


const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
    APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
} = process.env



export const signUp = async (userData: SignUpParams) => {
    const { email, password, firstName, lastName } = userData;
    let newUserAccount;

    try {
        const { account, database } = await createAdminClient();

        newUserAccount = await account.create(
            ID.unique(),
            email,
            password,
            `${firstName} ${lastName}`
        );

        if (!newUserAccount) throw Error('Error creating user');

        const dwollaCustomerUrl = await createDwollaCustomer(
            {
                ...userData,
                type: 'personal'
            }
        )


        if (!dwollaCustomerUrl) throw Error('Error creating dwolla customer');

        const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

        const newUser = await database.createDocument(
            DATABASE_ID!,
            USER_COLLECTION_ID!,
            ID.unique(),
            {
                ...userData,
                userId: newUserAccount.$id,
                dwollaCustomerId,
                dwollaCustomerUrl,
            }
        )
        const session = await account.createEmailPasswordSession(email, password);

        (await cookies()).set('appwrite-session', session.secret, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
        });

        return parseStringify(newUser);
    } catch (error: any) {
        console.error('Sign-up error:', error);
        return { error: error?.message || 'Failed to create account.' };
    }
}

export async function logoutAccount() {
    try {
        const { account } = await createSessionClient();
        (await cookies()).delete('appwrite-session');
        const user = await account.deleteSession('current');
        return parseStringify(user);
    } catch (error) {
        console.log('Error', error)
    }
}

export const createLinkToken = async (user: User) => {
    try {
        if (!user?.$id) return null;

        const tokenParams = {
            user: {
                client_user_id: user.$id,
            },
            client_name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.name || 'User',
            products: ['auth'] as Products[],
            country_codes: ['US'] as CountryCode[],
            language: 'en',
        };

        const response = await plaidClient.linkTokenCreate(tokenParams);
        return parseStringify({ linkToken: response.data.link_token });
    } catch (error: any) {
        console.error('Error in createLinkToken:', error);
        return null;
    }
}

export const createBankAccount = async (
    {
        userId,
        bankId,
        accountId,
        accessToken,
        fundingSourceUrl,
        shareableId,
    }: createBankAccountProps
) => {
    try {
        const { database } = await createAdminClient();

        const bankAccount = await database.createDocument(
            DATABASE_ID!,
            BANK_COLLECTION_ID!,
            ID.unique(),
            {
                userId,
                bankId,
                accountId,
                accessToken,
                fundingSourceUrl,
                shareableId,
            }
        );

        return parseStringify(bankAccount);
    } catch (error: any) {
        console.error("Error creating bank account in Appwrite database:", error);
        throw error;
    }
}

export const exchangePublicToken = async ({ publicToken,
    user }: exchangePublicTokenProps
) => {
    try {
        if (!user) {
            throw new Error("No user object passed to exchangePublicToken.");
        }

        if (!user.dwollaCustomerId) {
            console.error("User is missing dwollaCustomerId:", user);
            throw new Error(`User "${user.name || user.$id}" is missing dwollaCustomerId. The user may have been created before Dwolla integration was configured.`);
        }

        // Exchange public token for access token and item ID.
        const response = await plaidClient.itemPublicTokenExchange({
            public_token: publicToken
        });

        const accessToken = response.data.access_token;
        const itemId = response.data.item_id;

        // Get account information from Plaid using the access token.
        const accountResponse = await plaidClient.accountsGet({
            access_token: accessToken,
        });

        const accountData = accountResponse.data.accounts[0];

        // Create a processor token for Dwolla using the access token and item ID.
        const request: ProcessorTokenCreateRequest = {
            access_token: accessToken,
            account_id: accountData.account_id,
            processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
        }

        const processorTokenResponse = await plaidClient.processorTokenCreate(request);
        const processorToken = processorTokenResponse.data.processor_token;

        // Create a funding source URL for the account using the Dwolla customer ID,
        // processor token, and bank account 
        const fundingSourceUrl = await addFundingSource({
            dwollaCustomerId: user.dwollaCustomerId,
            processorToken: processorToken,
            bankName: accountData.name
        });

        // If a funding source URL is not created, throw an error.
        if (!fundingSourceUrl) {
            throw new Error("Failed to create funding source in Dwolla.");
        }

        // Create the user's bank account in the database.
        const newBankAccount = await createBankAccount({
            userId: user.$id,
            bankId: itemId,
            accountId: accountData.account_id,
            accessToken: accessToken,
            fundingSourceUrl: fundingSourceUrl,
            shareableId: encryptId(accountData.account_id)
        });

        // Revalidate the path to reflect the changes
        revalidatePath('/');

        // Return a success message.
        return parseStringify({ publicTokenExchange: "Complete", bankAccount: newBankAccount });

    } catch (error: any) {
        console.error(
            "An error occurred while exchanging public token:",
            error
        );
        return { error: error?.message || "Failed to link bank account." };
    }
}

export async function getBanks({ userId }: getBanksProps) {
    try {
        const { database } = await createAdminClient();
        const banks = await database.listDocuments(
            DATABASE_ID!,
            BANK_COLLECTION_ID!,
            [Query.equal('userId', [userId])]
        )
        return parseStringify(banks.documents);
    } catch (error) {
        console.log('Error', error)
    }
}

export const getBank = async ({ documentId }: getBankProps) => {
    try {
        const { database } = await createAdminClient();

        const bank = await database.listDocuments(
            DATABASE_ID!,
            BANK_COLLECTION_ID!,
            [Query.equal('$id', [documentId])]
        )

        return parseStringify(bank.documents[0]);
    } catch (error) {
        console.log(error)
    }
}

// lib/actions/user1.actions.ts

// 1. Add getUserInfo
export const getUserInfo = async ({ userId }: getUserInfoProps) => {
    try {
        const { database } = await createAdminClient();

        const user = await database.listDocuments(
            DATABASE_ID!,
            USER_COLLECTION_ID!,
            [Query.equal('userId', [userId])]
        );

        return parseStringify(user.documents[0]);
    } catch (error) {
        console.log('Get user info error:', error);
    }
};

// 2. Update getLoggedInUser to fetch the full user document from the database
export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        const result = await account.get();

        const user = await getUserInfo({ userId: result.$id });

        return parseStringify(user);
    } catch (error: any) {
        const isUnauthorized = error?.message === 'No session' || error?.code === 401 || error?.type === 'general_unauthorized_scope';
        if (!isUnauthorized) {
            console.error('Get user error:', error);
        }
        return null;
    }
}

// 3. Update signIn to return the database user
export const signIn = async (userData: signInProps) => {
    try {
        const { account } = await createAdminClient();
        const { email, password } = userData;

        const session = await account.createEmailPasswordSession(email, password);

        (await cookies()).set('appwrite-session', session.secret, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
        });

        const user = await getUserInfo({ userId: session.userId });

        return parseStringify(user);
    } catch (error: any) {
        console.error('Sign-in error:', error);
        return { error: error?.message || 'Invalid email or password.' };
    }
};
