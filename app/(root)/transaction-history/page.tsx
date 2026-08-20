import HeaderBox from '@/components/HeaderBox'
import React from 'react'

const TransactionHistory = () => {
  return (
    <section className="transactions">
      <div className="space-y-4">
        <HeaderBox
          title="Transaction History"
          subtext="See your bank details and transactions."
        />
      </div>
    </section>
  )
}

export default TransactionHistory
