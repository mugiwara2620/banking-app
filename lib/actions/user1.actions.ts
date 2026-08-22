'use server'

import { ID } from "node-appwrite"
import { createAdminClient, createSessionClient } from "../appwrite"
import { email } from "zod"
import { cookies } from "next/headers"
import { parseStringify } from "../utils"

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

        return parseStringify(session);
    } catch (error: any) {
        console.error('Sign-in error:', error);
        return { error: error?.message || 'Invalid email or password.' };
    }
}


export const signUp = async (userData: SignUpParams) => {
    try {
        const { account } = await createAdminClient();
        const { email, password, firstName, lastName } = userData;

        const newUserAccount = await account.create(
            ID.unique(),
            email,
            password,
            `${firstName} ${lastName}`
        );

        const session = await account.createEmailPasswordSession(email, password);

        (await cookies()).set('appwrite-session', session.secret, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: true,
        });

        return parseStringify(newUserAccount);
    } catch (error: any) {
        console.error('Sign-up error:', error);
        return { error: error?.message || 'Failed to create account.' };
    }
}

export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();
        const user = await account.get();
        return parseStringify(user);
    } catch (error: any) {
        // "No session" is expected when the user is not logged in — don't log it
        if (error?.message !== 'No session') {
            console.log('Error', error);
        }
        return null;
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