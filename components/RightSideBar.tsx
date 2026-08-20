import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import BankCard from './BankCard'
import { formatAmount } from '@/lib/utils'

interface RightSidebarProps {
  user: any
  transactions?: any[]
  banks?: any[]
}

export default function RightSideBar({
  user,
  banks = [],
  transactions = [],
}: RightSidebarProps) {
  return (
    <aside className="right-sidebar">
      {/* Profile Section */}
      <section className="flex flex-col pb-8">
        <div className="profile-banner" />
        <div className="profile">
          <div className="profile-img">
            <span className="text-5xl font-bold text-blue-500">
              {user?.firstName?.[0] || user?.name?.[0] || 'U'}
            </span>
          </div>

          <div className="profile-details">
            <h1 className="profile-name">
              {user?.firstName ? `${user.firstName} ${user.lastName || ''}` : user?.name || 'Guest User'}
            </h1>
            <p className="profile-email">
              {user?.email || 'contact@jsmbank.com'}
            </p>
          </div>
        </div>
      </section>

      {/* My Banks Section */}
      <section className="banks">
        <div className="flex w-full justify-between">
          <h2 className="header-2">My Banks</h2>
          <Link href="/" className="flex gap-2 items-center">
            <Image src="/icons/plus.svg" width={20} height={20} alt="plus" />
            <h2 className="text-14 font-semibold text-gray-600">Add Bank</h2>
          </Link>
        </div>

        {banks?.length > 0 ? (
          <div className="relative flex flex-1 flex-col items-center justify-center gap-5">
            <div className="relative z-10 w-full">
              <BankCard
                key={banks[0].$id || 1}
                account={banks[0]}
                userName={user?.firstName ? `${user.firstName} ${user.lastName || ''}` : user?.name || 'User'}
                showBalance={false}
              />
            </div>
            {banks[1] && (
              <div className="absolute right-0 top-8 z-0 w-[90%]">
                <BankCard
                  key={banks[1].$id || 2}
                  account={banks[1]}
                  userName={user?.firstName ? `${user.firstName} ${user.lastName || ''}` : user?.name || 'User'}
                  showBalance={false}
                />
              </div>
            )}
          </div>
        ) : (
          <p className="text-14 text-gray-500">No banks added yet.</p>
        )}
      </section>

      {/* Latest Transactions Section */}
      <section className="flex flex-col gap-4 px-6 py-4">
        <div className="flex w-full justify-between items-center">
          <h2 className="header-2">Latest Transactions</h2>
          <Link href="/transaction-history" className="text-14 font-semibold text-blue-600 hover:underline">
            View all
          </Link>
        </div>

        {transactions && transactions.length > 0 ? (
          <div className="flex flex-col gap-3">
            {transactions.slice(0, 4).map((transaction: any, index: number) => (
              <div key={transaction.id || transaction.$id || index} className="flex items-center justify-between border-b border-gray-100 pb-2 pt-1">
                <div className="flex items-center gap-3">
                  <div className="flex-center size-9 rounded-full bg-blue-25">
                    <Image src="/icons/transaction.svg" width={18} height={18} alt="transaction" />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-14 font-semibold text-gray-900 line-clamp-1">{transaction.name}</p>
                    <p className="text-12 font-normal text-gray-500">{transaction.category || 'General'}</p>
                  </div>
                </div>
                <p className={`text-14 font-semibold ${transaction.amount < 0 ? 'text-red-500' : 'text-green-600'}`}>
                  {formatAmount(transaction.amount)}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-14 text-gray-500">No recent transactions</p>
        )}
      </section>
    </aside>
  )
}