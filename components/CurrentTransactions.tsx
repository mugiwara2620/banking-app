'use client'
import React, { useEffect } from 'react'
import { RecentTransactionsProps } from '@/types'
import { cn } from "../lib/utils";
import { Button, Select } from '@base-ui/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from 'next/link';
import BankCard from './BankCard';
import { BankTabItem } from './BankTabItem';
import BankInfo from './BankInfo';
import TransactionsTable from './TransactionsTable';
import { Pagination } from './Pagination';
const RecentTransactions = ({
    accounts,
    appwriteItemId,
    transactions,
    currentPage,
}: RecentTransactionsProps) => {
    const rowsPerPage = 10;
    const totalPages = Math.ceil(transactions.length / rowsPerPage);
    const indexOfLastTransaction = currentPage * rowsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;
    const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

    const [currentAccount, setCurrentAccount] = React.useState(null)

    useEffect(() => {
        setCurrentAccount(accounts?.data[0].name)
    }, [accounts])

    return (
        <section className='recent-transactions'>
            <header className={cn('flex', 'items-center', 'justify-between')}>
                <h2 className='recent-transactions-label'>
                    Recent Transactions
                </h2>
                <Link href={`/transaction-history/?id=${appwriteItemId}`} className='view-all-btn'>
                    View all
                </Link>
            </header>

            <Tabs defaultValue={appwriteItemId} className={cn('w-full', 'flex', 'flex-col')} >
                <TabsList className={cn('recent-transactions-tablist', 'flex')}>
                    {accounts && accounts?.data?.map((account: Account) => {
                        return (
                            <TabsTrigger key={account.id} value={account.appwriteItemId}>
                                <BankTabItem key={account.id} account={account} appwriteItemId={appwriteItemId} />
                            </TabsTrigger>
                        )
                    })}
                </TabsList>
                {accounts && accounts?.data?.map((account: Account) => {
                    return <TabsContent

                        key={account.name}
                        value={account.appwriteItemId}
                        className='space-y-4 z-0'>

                        <BankInfo
                            account={account}
                            appwriteItemId={appwriteItemId}
                            type="full"
                        />

                        <TransactionsTable
                            transactions={currentTransactions}
                        />
                        {totalPages > 1 && (
                            <div className='my-4 w-full'>
                                <Pagination page={currentPage} totalPages={totalPages} />
                            </div>

                        )}


                    </TabsContent>
                })}


            </Tabs>



        </section >

        // <section className='recent-transactions'>
        //     <header className={cn('flex', 'justify-between')}>
        //         <h1 className='recent-transactions-label'>
        //             Recent Transactions
        //         </h1>
        //         <div className='view-all-btn' >View all</div>
        //     </header>

        //     <div className='transactions-label'>
        //         {/* Accounts name header */}
        //         <div className={cn('flex', 'gap-2', 'text-gray-500', 'opacity-60')}>
        //             {
        //                 accounts && accounts?.data?.map((account: Account) => {
        //                     const isSelected = currentAccount === account.name;
        //                     return (
        //                         <div key={account.name} onClick={() => setCurrentAccount(account.name as any)}>
        //                             <p className={cn('text-16', 'cursor-pointer', 'duration-200', 'w-full', 'font-semibold', 'text-gray-900', isSelected ? 'border-b border-bank-blue' : '')}>{account.name}</p>
        //                         </div>
        //                     )
        //                 })
        //             }
        //         </div>

        //         {/* Selected account informations */}
        //         {/* Transactions table of selected account data  */}


        //     </div>


        // </section>
    )
}

export default RecentTransactions