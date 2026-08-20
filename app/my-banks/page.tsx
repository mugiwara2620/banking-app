import BankCard from '@/components/BankCard'
import HeaderBox from '@/components/HeaderBox'
import React from 'react'
import { cn } from "../../lib/utils";

const MyBanks = () => {
    const loggedIn = {
        firstName: 'Aymane',
        lastName: 'Essakhil',
        email: 'aymane@jsmbank.com'
    }

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
                    subtext="Effortlessly  manage your banking activities."
                />

                <div className="space-y-4">
                    <h2 className="header-2">Your cards</h2>
                    <div className={cn('flex', 'flex-wrap', 'gap-6')}>
                        {mockAccounts.map((account) => (
                            <BankCard
                                key={account.id}
                                account={account}
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

