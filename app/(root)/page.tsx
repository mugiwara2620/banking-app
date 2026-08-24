import HeaderBox from '@/components/HeaderBox'
import RightSideBar from '@/components/RightSideBar'
import { TotalBalanceBox } from '@/components/TotalBalanceBox'
import { getAccount, getAccounts } from '@/lib/actions/bank.actions'
import { getLoggedInUser } from '@/lib/actions/user1.actions'
import { redirect } from 'next/navigation'

export default async function Home({ searchParams }: SearchParamProps) {
    const { id, page } = await searchParams;
    const loggedIn = await getLoggedInUser();

    if (!loggedIn) redirect("/sign-in");

    // 1. Receive accounts object directly (no destructuring { accounts })
    const accounts = await getAccounts({
        userId: loggedIn?.$id
    });

    if (!accounts) return null;

    console.log(accounts)
    const accountsData = accounts?.data;
    // 2. Access the first account from the array
    const appwriteItemId = (id as string) || accountsData?.[0]?.appwriteItemId;

    const account = appwriteItemId ? await getAccount({ appwriteItemId }) : null;

    return (
        <section className='home'>
            <div className='home-content'>
                <header className='home-header'>
                    <HeaderBox
                        type="greeting"
                        title="Welcome"
                        user={loggedIn?.name || 'Guest'}
                        subtext="Access and manage your account and transactions efficiently."
                    />
                    <TotalBalanceBox
                        accounts={accountsData}
                        totalBanks={accounts?.totalBanks}
                        totalCurrentBalance={accounts?.totalCurrentBalance}
                    />
                </header>
            </div>
            <RightSideBar
                user={loggedIn}
                banks={accountsData?.slice(0, 2)}
                transactions={account?.transactions}
            />
        </section>
    );
}
