import BankCard from '@/components/BankCard'
import HeaderBox from '@/components/HeaderBox'
import { getAccounts } from '@/lib/actions/bank.actions'
import { getLoggedInUser } from '@/lib/actions/user1.actions'
import { redirect } from 'next/navigation'
import React from 'react'
import { cn } from "../../../lib/utils";

const MyBanks = async () => {
    const loggedIn = await getLoggedInUser();

    if (!loggedIn) redirect("/sign-in");

    // 1. Receive accounts object directly (no destructuring { accounts })
    const accounts = await getAccounts({
        userId: loggedIn?.$id
    });

    if (!accounts) return null;


    const mockAccounts = [
        {
            id: '1',
            name: 'Bank of America',
            currentBalance: 1250.35,
            mask: '1234',
            officialName: 'Bank of America Checking'
        },
        {
            id: '2',
            name: 'Chase Bank',
            currentBalance: 3450.50,
            mask: '5678',
            officialName: 'Chase Savings'
        },
        {
            id: '3',
            name: 'First National Bank',
            currentBalance: 8900.00,
            mask: '9012',
            officialName: 'First National Checking'
        }
    ]

    return (
        <section className="flex">
            <div className="my-banks">
                <HeaderBox
                    title="My Bank Accounts"
                    subtext="Effortlessly manage your banking activities."
                />

                <div className="space-y-4">
                    <h2 className="header-2">Your cards</h2>
                    <div className={cn('flex', 'flex-wrap', 'gap-6')}>
                        {accounts?.data?.map((a: Account) => (
                            <BankCard
                                key={a.id}
                                account={a}
                                userName={`${loggedIn.firstName} ${loggedIn.lastName}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MyBanks
