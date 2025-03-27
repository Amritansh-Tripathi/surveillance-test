'use client';

import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const StackedBarChart = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedType, setSelectedType] = useState<'entries' | 'exits'>('entries');

  const pseudoData = Array.from({ length: 24 }, (_, hour) => ({
    hour,
    knownPeople: Math.floor(Math.random() * 10),
    unknownPeople: Math.floor(Math.random() * 10),
    visitors: Math.floor(Math.random() * 10),
    knownVehicles: Math.floor(Math.random() * 10),
    unknownVehicles: Math.floor(Math.random() * 10),
  }));

  const categoryColors = {
    knownPeople: 'rgba(0, 255, 127, 0.8)',
    unknownPeople: 'rgba(255, 69, 0, 0.8)',
    visitors: 'rgba(255, 215, 0, 0.8)',
    knownVehicles: 'rgba(30, 144, 255, 0.8)',
    unknownVehicles: 'rgba(147, 112, 219, 0.8)',
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
        ticks: { color: '#ffffff' },
        grid: { display: false },
        title: { display: true, text: 'Hour of the Day', color: '#ffffff' },
      },
      y: {
        stacked: true,
        ticks: { color: '#ffffff' },
        grid: { display: false },
        title: { display: true, text: 'Count', color: '#ffffff' },
      },
    },
    plugins: {
      legend: { position: 'top', labels: { color: '#ffffff' } },
    },
  };

  return (
    <div className="bg-gray-900 text-white p-5 rounded-lg shadow-md h-fit">
      <div className="flex justify-between items-center mb-2">
        <div>
          <label>Select Date: </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => date && setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            className="bg-gray-700 text-white px-2 py-1 rounded"
          />
        </div>
        <div>
          <label>Entries/Exits: </label>
          <select
            onChange={(e) => setSelectedType(e.target.value as 'entries' | 'exits')}
            value={selectedType}
            className="bg-gray-700 text-white px-2 py-1 rounded"
          >
            <option value="entries">Entries</option>
            <option value="exits">Exits</option>
          </select>
        </div>
      </div>
      <div className="h-96">
        <Bar data={getData()} options={chartConfig} />
      </div>
    </div>
  );
};

export default StackedBarChart;
