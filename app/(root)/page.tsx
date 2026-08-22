import HeaderBox from '@/components/HeaderBox'
import RightSideBar from '@/components/RightSideBar'
import { TotalBalanceBox } from '@/components/TotalBalanceBox'
import { getLoggedInUser } from '@/lib/actions/user1.actions'
import React from 'react'

export default async function Home() {
    const loggedIn = await getLoggedInUser()
    console.log(loggedIn?.name)

    const mockBanks = [
        { $id: '1', name: 'Bank of America', currentBalance: 3250.35, mask: '1234' },
        { $id: '2', name: 'Chase Bank', currentBalance: 3450.50, mask: '5678' },
    ]

    const mockTransactions = [
        { id: '1', name: 'Spotify Subscription', amount: -14.99, category: 'Subscription' },
        { id: '2', name: 'Salary Deposit', amount: 2500.00, category: 'Income' },
        { id: '3', name: 'Coffee Shop', amount: -4.50, category: 'Food and Drink' },
    ]

    return (
        <section className='home'>
            <div className='home-content'>
                <header className='home-header'>
                    <HeaderBox
                        type="greeting"
                        title="Welcome"
                        user={loggedIn?.name}
                        subtext="Access and manage your account and transactions efficiently."
                    />
                    <TotalBalanceBox
                        accounts={mockBanks as any}

                        totalBanks={mockBanks.length}
                        totalCurrentBalance={6700.85}
                    />
                </header>
            </div>
            <RightSideBar
                user={loggedIn}
                banks={mockBanks}
                transactions={mockTransactions}
            />
        </section>
    )
}
