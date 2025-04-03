'use client';

import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import TimeStepper from '@/components/time-stepper';

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const StackedBarChart = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedType, setSelectedType] = useState<'entries' | 'exits'>('entries');

  // Generate pseudo data for 12 hours
  const pseudoData = Array.from({ length: 12 }, (_, hour) => ({
    hour,
    knownPeople: Math.floor(Math.random() * 10),
    unknownPeople: Math.floor(Math.random() * 10),
    visitors: Math.floor(Math.random() * 10),
    knownVehicles: Math.floor(Math.random() * 10),
    unknownVehicles: Math.floor(Math.random() * 10),
  }));

  // getData is provided with the canvas reference from Chart.js.
  // We use it to create gradients. If canvas or its context is not available,
  // we return a fallback dataset with solid colors.
  const getData = (canvas?: HTMLCanvasElement) => {
    if (!canvas) {
      return {
        labels: pseudoData.map((item) => `${item.hour}:00`),
        datasets: [
          {
            label: 'Known People',
            data: pseudoData.map((item) => item.knownPeople),
            backgroundColor: 'rgba(0,230,118,0.9)',
            borderRadius: 8,
          },
          {
            label: 'Unknown People',
            data: pseudoData.map((item) => item.unknownPeople),
            backgroundColor: 'rgba(255,82,82,0.9)',
            borderRadius: 8,
          },
          {
            label: 'Visitors',
            data: pseudoData.map((item) => item.visitors),
            backgroundColor: 'rgba(255,193,7,0.9)',
            borderRadius: 8,
          },
          {
            label: 'Known Vehicles',
            data: pseudoData.map((item) => item.knownVehicles),
            backgroundColor: 'rgba(41,121,255,0.9)',
            borderRadius: 8,
          },
          {
            label: 'Unknown Vehicles',
            data: pseudoData.map((item) => item.unknownVehicles),
            backgroundColor: 'rgba(156,39,176,0.9)',
            borderRadius: 8,
          },
        ],
      };
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      // Fallback if context is unavailable.
      return {
        labels: pseudoData.map((item) => `${item.hour}:00`),
        datasets: [
          {
            label: 'Known People',
            data: pseudoData.map((item) => item.knownPeople),
            backgroundColor: 'rgba(0,230,118,0.9)',
            borderRadius: 8,
          },
          {
            label: 'Unknown People',
            data: pseudoData.map((item) => item.unknownPeople),
            backgroundColor: 'rgba(255,82,82,0.9)',
            borderRadius: 8,
          },
          {
            label: 'Visitors',
            data: pseudoData.map((item) => item.visitors),
            backgroundColor: 'rgba(255,193,7,0.9)',
            borderRadius: 8,
          },
          {
            label: 'Known Vehicles',
            data: pseudoData.map((item) => item.knownVehicles),
            backgroundColor: 'rgba(41,121,255,0.9)',
            borderRadius: 8,
          },
          {
            label: 'Unknown Vehicles',
            data: pseudoData.map((item) => item.unknownVehicles),
            backgroundColor: 'rgba(156,39,176,0.9)',
            borderRadius: 8,
          },
        ],
      };
    }

    // Use a fixed height for gradients matching the container height (152px)
    const chartHeight = 152;

    // Create linear gradients for each dataset
    const gradientKnownPeople = ctx.createLinearGradient(0, 0, 0, chartHeight);
    gradientKnownPeople.addColorStop(0, 'rgba(0,230,118,0.4)');
    gradientKnownPeople.addColorStop(1, 'rgba(0,230,118,0.9)');

    const gradientUnknownPeople = ctx.createLinearGradient(0, 0, 0, chartHeight);
    gradientUnknownPeople.addColorStop(0, 'rgba(255,82,82,0.4)');
    gradientUnknownPeople.addColorStop(1, 'rgba(255,82,82,0.9)');

    const gradientVisitors = ctx.createLinearGradient(0, 0, 0, chartHeight);
    gradientVisitors.addColorStop(0, 'rgba(255,193,7,0.4)');
    gradientVisitors.addColorStop(1, 'rgba(255,193,7,0.9)');

    const gradientKnownVehicles = ctx.createLinearGradient(0, 0, 0, chartHeight);
    gradientKnownVehicles.addColorStop(0, 'rgba(41,121,255,0.4)');
    gradientKnownVehicles.addColorStop(1, 'rgba(41,121,255,0.9)');

    const gradientUnknownVehicles = ctx.createLinearGradient(0, 0, 0, chartHeight);
    gradientUnknownVehicles.addColorStop(0, 'rgba(156,39,176,0.4)');
    gradientUnknownVehicles.addColorStop(1, 'rgba(156,39,176,0.9)');

    return {
      labels: pseudoData.map((item) => `${item.hour}:00`),
      datasets: [
        {
          label: 'Known People',
          data: pseudoData.map((item) => item.knownPeople),
          backgroundColor: gradientKnownPeople,
          borderRadius: 8,
        },
        {
          label: 'Unknown People',
          data: pseudoData.map((item) => item.unknownPeople),
          backgroundColor: gradientUnknownPeople,
          borderRadius: 8,
        },
        {
          label: 'Visitors',
          data: pseudoData.map((item) => item.visitors),
          backgroundColor: gradientVisitors,
          borderRadius: 8,
        },
        {
          label: 'Known Vehicles',
          data: pseudoData.map((item) => item.knownVehicles),
          backgroundColor: gradientKnownVehicles,
          borderRadius: 8,
        },
        {
          label: 'Unknown Vehicles',
          data: pseudoData.map((item) => item.unknownVehicles),
          backgroundColor: gradientUnknownVehicles,
          borderRadius: 8,
        },
      ],
    };
  };

  const chartConfig = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        ticks: { color: '#E0E0E0' },
        grid: { display: false },
        title: { display: true, text: 'Hour of the Day', color: '#E0E0E0' },
        barPercentage: 0.2,
        categoryPercentage: 0.5,
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
          color: '#E0E0E0',
          font: { size: 13 },
        },
      },
    },
    maxBarThickness: 14,
  };

  return (
    <div className="w-full h-full bg-[#1B1B2E] rounded-lg p-2">
      <div className="flex justify-between items-center mb-1">
        <div>
          <label className="font-medium text-sm">Select Date: </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => date && setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            className="font-medium text-sm rounded-md bg-[#1D369B] py-1 px-2 text-white"
          />
        </div>
        <div>
          <label className="font-medium text-sm">Entries/Exits: </label>
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
      {/* Constrain chart to 370x152 pixels */}
      <div style={{ width: '370px', height: '152px' }}>
        <Bar data={(canvas) => getData(canvas)} options={chartConfig} />
      </div>
    </div>
  );
};

export default StackedBarChart;
