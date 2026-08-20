'use client'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { DoughnutChartProps } from '@/types'

ChartJS.register(ArcElement, Tooltip, Legend)

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
    const data = {
        datasets: [
            {
                label: 'Banks',
                data: [1250, 2500, 3750],
                backgroundColor: ['#0047AB', '#4169E1', '#0033A0']
            }
        ],
        labels: ['Bank 1', 'Bank 2', 'Bank 3']
    }
    return (
        <div className='w-full max-w-[700px] mx-auto'>
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