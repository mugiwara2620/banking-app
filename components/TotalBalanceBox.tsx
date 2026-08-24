import React from 'react'
import { formatAmount } from '@/lib/utils'
import CountUp from 'react-countup'
import AnimatedCounter from './AnimatedCounter'
import DoughnutChart from './DoughnutChart'
import { cn } from "../lib/utils";

export const TotalBalanceBox = ({ accounts, totalBanks, totalCurrentBalance }: TotalBalanceBoxProps) => {

    return (
        <section className='total-balance'>
            <div className='total-balance-chart'>
                <DoughnutChart accounts={accounts} />
            </div>
            <div className={cn('flex', 'flex-col', 'gap-6')}>
                <div className='header-2'>
                    {totalBanks} Bank{totalBanks !== 1 && 's'} Accounts
                </div>
                <div>
                    <div className='total-balance-label'>
                        Total Current Balance
                    </div>
                    <div className='total-balance-amount'>
                        <AnimatedCounter
                            amount={totalCurrentBalance} />
                    </div>
                </div>

            </div>

        </section>
    )
}