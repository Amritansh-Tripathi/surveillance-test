'use client'
import { FC, useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface LiveCapacityData {
  Personal: number;
  Vehicle: number;
  Unknown: number;
  Visitors: number;
}

const POLLING_INTERVAL = 2000; // 2 seconds

const DoughnutChart: FC = () => {
  const [chartData, setChartData] = useState<any>(null);

  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.193.113:3000/api/oldapi/capacity-sse');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data: LiveCapacityData = await response.json();
      updateChartData(data);
    } catch (error) {
      console.error('Error fetching live capacity data:', error);
    }
  };

  useEffect(() => {
    fetchData(); // Initial fetch

    const intervalId = setInterval(fetchData, POLLING_INTERVAL);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const updateChartData = (data: LiveCapacityData) => {
    setChartData({
      labels: ["Personal", "Vehicle", "Unknown", "Visitors"],
      datasets: [
        {
          label: "Live Capacity",
          data: [data.Personal, data.Vehicle, data.Unknown, data.Visitors],
          backgroundColor: ['#3CD856', '#4657EF', '#FF6B00', '#FF947A'],
          borderWidth: 5,
          borderColor: '#1B1B2E',
          borderRadius: 10,
        },
      ],
    });
  };

  if (!chartData) {
    return <div className="flex w-[180px] h-[180px] md:h-72 md:w-72 rounded-full absolute place-self-center md:place-self-end md:-right-64 md:top-4 z-10 bg-[#121125] border border-[#1B1B2E] p-3">
      <div className='w-full bg-[#1B1B2E] rounded-full p-2 drop-shadow-[1px_1px_4px_rgba(0,0,0,0.25)] flex items-center justify-center'>
        Loading...
      </div>
    </div>
  }

  return (
    <div className="flex w-[180px] h-[180px] md:h-72 md:w-72 rounded-full absolute place-self-center md:place-self-end md:-right-64 md:top-4 z-10 bg-[#121125] border border-[#1B1B2E] p-3">
      <div className='w-full bg-[#1B1B2E] rounded-full p-2 drop-shadow-[1px_1px_4px_rgba(0,0,0,0.25)]'>
        <Doughnut
          data={chartData}
          options={{
            plugins: {
              legend: {
                display: false,
              },
              datalabels: {
                color: '#fff',
                formatter: (value: number) => `${value}`,
                font: {
                  weight: 'bold',
                  size: 14,
                },
              },
              tooltip: {
                callbacks: {
                  label: function(tooltipItem: any) {
                    const label = chartData.labels[tooltipItem.dataIndex];
                    const value = chartData.datasets[0].data[tooltipItem.dataIndex];
                    return `${label}: ${value}`;
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default DoughnutChart;