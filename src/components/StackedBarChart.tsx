'use client';

import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimeStepper from '@/components/time-stepper';

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const StackedBarChart = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedType, setSelectedType] = useState<'entries' | 'exits'>('entries');

  const pseudoData = Array.from({ length: 12 }, (_, hour) => ({
    hour,
    knownPeople: Math.floor(Math.random() * 10),
    unknownPeople: Math.floor(Math.random() * 10),
    visitors: Math.floor(Math.random() * 10),
    knownVehicles: Math.floor(Math.random() * 10),
    unknownVehicles: Math.floor(Math.random() * 10),
  }));

  const categoryColors = {
    knownPeople: 'rgba(0, 230, 118, 0.9)', // Brighter Green
    unknownPeople: 'rgba(255, 82, 82, 0.9)', // Brighter Red
    visitors: 'rgba(255, 193, 7, 0.9)', // Bright Yellow
    knownVehicles: 'rgba(41, 121, 255, 0.9)', // Bright Blue
    unknownVehicles: 'rgba(156, 39, 176, 0.9)', // Bright Purple
  };

  const getData = () => ({
    labels: pseudoData.map((item) => `${item.hour}:00`),
    datasets: [
      { label: 'Known People', data: pseudoData.map((item) => item.knownPeople), backgroundColor: categoryColors.knownPeople, borderRadius: 8 },
      { label: 'Unknown People', data: pseudoData.map((item) => item.unknownPeople), backgroundColor: categoryColors.unknownPeople, borderRadius: 8 },
      { label: 'Visitors', data: pseudoData.map((item) => item.visitors), backgroundColor: categoryColors.visitors, borderRadius: 8 },
      { label: 'Known Vehicles', data: pseudoData.map((item) => item.knownVehicles), backgroundColor: categoryColors.knownVehicles, borderRadius: 8 },
      { label: 'Unknown Vehicles', data: pseudoData.map((item) => item.unknownVehicles), backgroundColor: categoryColors.unknownVehicles, borderRadius: 8 },
    ],
  });

  const chartConfig = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        ticks: { color: '#E0E0E0' }, // Lighter gray for visibility
        grid: { display: false },
        title: { display: true, text: 'Hour of the Day', color: '#E0E0E0' },
        barPercentage: 0.2, // Adjust this (Lower value = thinner bars) 
        categoryPercentage: 0.5, // Adjust spacing between bars

      },
      y: {
        stacked: true,
        ticks: { color: '#E0E0E0' },
        grid: { display: false },
        title: { display: true, text: 'Count', color: '#E0E0E0' },
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#E0E0E0', // Light Gray for better readability
          font: {
            size: 13, // Slightly larger for visibility
          },
        },
      },
    },
    maxBarThickness: 14, // Sets max width in pixels
  };

  return (
    <div className="w-full h-full bg-[#1B1B2E] rounded-lg p-2 ">
      <div className="flex justify-between items-center mb-1">
        <div>
          <label className='font-medium text-sm'>Select Date: </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => date && setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            className="font-medium text-sm rounded-md bg-[#1D369B] py-1 px-2 text-white"
          />
        </div>
        <div>
          <label className='font-medium text-sm'>Entries/Exits: </label>
          <select
            onChange={(e) => setSelectedType(e.target.value as 'entries' | 'exits')}
            value={selectedType}
            className="font-medium text-sm rounded-md bg-[#1D369B] py-1 px-2 text-white"
          >
            <option value="entries">Entries</option>
            <option value="exits">Exits</option>
          </select>
        </div>
      </div>
      <TimeStepper />
      <div className="h-52">
        <Bar data={getData()} options={chartConfig} />
      </div>
    </div>
  );
};

export default StackedBarChart;