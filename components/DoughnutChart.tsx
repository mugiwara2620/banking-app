'use client'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { DoughnutChartProps } from '@/types'
import { cn } from "../lib/utils";

ChartJS.register(ArcElement, Tooltip, Legend)
const getRandomBlueColor = () => {
    const hue = Math.floor(Math.random() * 41) + 200 // Blue hue: 200° - 240°
    const saturation = Math.floor(Math.random() * 31) + 60 // 60% - 90%
    const lightness = Math.floor(Math.random() * 30) + 35 // 35% - 65%
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`
}

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
    const currentBalances = accounts.map((account: any) => {
        return account.currentBalance;
    });
    const accountNames = accounts.map((account: any) => {
        return account.name;
    });
    const colors = [];
    for (let i = 0; i < accounts.length; i++) {
        colors.push(getRandomBlueColor());
    }
    const data = {
        datasets: [
            {
                label: 'Banks',
                data: currentBalances,
                backgroundColor: colors
            }
        ],
        labels: accountNames
    }

    return (
        <div className={cn('w-full', 'max-w-[700px]', 'mx-auto')}>
            <Doughnut
                data={data}
                options={{
                    cutout: '60%',
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }}

            />
        </div>
    )
}

export default DoughnutChart