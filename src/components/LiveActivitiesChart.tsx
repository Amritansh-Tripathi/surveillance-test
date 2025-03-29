'use client'
import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Plugin,
  ChartData,
  ChartOptions,
  ChartArea
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface LiveActivitiesChartProps {
  knownVehicles: number | string;
  personnel: number | string;
  visitors: number | string;
  unknownPersons: number | string;
  unknownVehicles: number | string;
}

const LiveActivitiesChart: React.FC<LiveActivitiesChartProps> = ({
  knownVehicles,
  personnel,
  visitors,
  unknownPersons,
  unknownVehicles
}) => {
  // Convert all prop values to numbers (in case they're strings)
  const parsedValues = [
    Number(knownVehicles),
    Number(personnel),
    Number(visitors),
    Number(unknownPersons),
    Number(unknownVehicles)
  ];

  // Calculate total capacity
  const totalCapacity = parsedValues.reduce(
    (acc, val) => acc + (isNaN(val) ? 0 : val),
    0
  );

  // Chart data
  const data: ChartData<'doughnut'> = {
    labels: [
      'Known Vehicles',
      'Personnel',
      'Visitors',
      'Unknown Persons',
      'Unknown Vehicles'
    ],
    datasets: [
      {
        data: parsedValues.map((val) => (isNaN(val) ? 0 : val)),
        backgroundColor: [
          '#3B82F6', // Blue
          '#10B981', // Green
          '#EF4444', // Red
          '#F97316', // Orange
          '#F59E0B'  // Light Orange
        ],
        hoverOffset: 8,
        borderWidth: 2,
        borderColor: '#111827'
      }
    ]
  };

  // Custom plugin to display total capacity in the center
  const centerTextPlugin: Plugin<'doughnut'> = {
    id: 'centerTextPlugin',
    afterDraw: (chart) => {
      if (!chart.ctx || !chart.chartArea) return;
      const { ctx, chartArea } = chart;
      const { top, bottom, left, right } = chartArea;

      const xCenter = (left + right) / 2;
      const yCenter = (top + bottom) / 2;

      ctx.save();
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 24px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(totalCapacity), xCenter, yCenter);
    }
  };

  // Hide the default Chart.js legend
  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        titleColor: '#FFFFFF',
        bodyColor: '#FFFFFF',
        backgroundColor: '#1F2937',
        borderColor: '#374151',
        borderWidth: 1
      }
    },
    layout: {
      padding: 5
    }
  };

  return (
    <div className="w-full h-full grid grid-cols-7 justify-start items-center overflow-hidden">
      {/* Donut chart (make it bigger) */}
      <div className="col-span-5 flex-1 relative h-full min-w-0">
        <Doughnut data={data} options={options} plugins={[centerTextPlugin]} />
      </div>

      {/* Smaller legend on the right */}
      <div className="col-span-2 w-full flex-shrink-0 flex flex-col justify-center items-start space-y-3 text-white">
        {data.labels?.map((label, i) => {
          const bgColor = data.datasets[0].backgroundColor[i] as string;
          const value = data.datasets[0].data[i] as number;

          return (
            <div key={label} className="flex items-center space-x-2 group text-sm">
              {/* Smaller color square (16×16 px) */}
              <div
                className="w-4 h-4 rounded-sm"
                style={{ backgroundColor: bgColor }}
              />
              {/* Show numeric count */}
              <span className="font-medium">
                {isNaN(value) ? 0 : value}
              </span>
              {/* Label is hidden by default, appears on hover */}
              <span className="ml-1 hidden group-hover:inline text-xs">
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LiveActivitiesChart;
