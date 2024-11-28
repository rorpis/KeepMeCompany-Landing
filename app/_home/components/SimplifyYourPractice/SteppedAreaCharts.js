"use client";

import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styles from './SteppedAreaCharts.module.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

export const CHART_THEMES = {
  stress: {
    backgroundColor: 'rgba(228, 111, 111, 0.2)',
    borderColor: 'rgba(228, 111, 111, 0.7)',
    borderWidth: 2
  },
  calm: {
    backgroundColor: 'rgba(111, 175, 228, 0.1)',
    borderColor: 'rgba(111, 175, 228, 0.7)',
    borderWidth: 2
  }
};

export const dataBefore = [
  { time: '8:00', calls: 130 },
  { time: '', calls: 140 },
  { time: '', calls: 132 },
  { time: '', calls: 136 },
  { time: '', calls: 130 },
  { time: '', calls: 140 },
  { time: '', calls: 132 },
  { time: '', calls: 126 },
  { time: '', calls: 130 },
  { time: '', calls: 125 },
  { time: '', calls: 115 },
  { time: '', calls: 115 },
  { time: '', calls: 105 },
  { time: '', calls: 100 },
  { time: '', calls: 85 },
  { time: '', calls: 70 },
  { time: '', calls: 45 },
  { time: '', calls: 35 },
  { time: '        11:00', calls: 23 },
  { time: '', calls: 0 },
];

export const dataAfter = [
  { time: '8:00', calls: 5 },
  { time: '', calls: 9 },
  { time: '', calls: 7 },
  { time: '', calls: 6 },
  { time: '', calls: 1 },
  { time: '', calls: 6 },
  { time: '', calls: 7 },
  { time: '', calls: 4 },
  { time: '', calls: 0 },
  { time: '', calls: 4 },
  { time: '', calls: 8 },
  { time: '', calls: 7 },
  { time: '', calls: 1 },
  { time: '', calls: 1 },
  { time: '', calls: 1 },
  { time: '', calls: 6 },
  { time: '', calls: 7 },
  { time: '', calls: 4 },
  { time: '11:00', calls: 0 },
];

export const SteppedAreaChart = ({
  data,
  theme,
  showYAxisTitle = true,
}) => {
  const chartData = useMemo(() => ({
    labels: data.map(point => point.time),
    datasets: [{
      label: '',
      data: data.map(point => point.calls),
      fill: true,
      backgroundColor: CHART_THEMES[theme].backgroundColor,
      borderColor: CHART_THEMES[theme].borderColor,
      borderWidth: CHART_THEMES[theme].borderWidth,
      pointRadius: 0,
      stepped: true,
    }],
  }), [data, theme]);

  const chartOptions = useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          font: { 
            size: 14,
            weight: 'bold',
           },
          color: 'rgba(255, 255, 255, 0.7)',
          maxRotation: 0,  
          minRotation: 0,  
        },
      },
      
      y: {
        min: 0,
        max: 150,
        grid: { color: 'rgba(0, 0, 0, 0.1)' },
        title: {
          display: showYAxisTitle,
          text: 'Patient Calls',
          color: '#FFFFFF',
          font: {
            size: 18,
            weight: 'bold',
          },
        },
        ticks: {
          display: false,
        },
      },
    },
    elements: {
      line: { stepped: true, tension: 0 },
      point: { radius: 0 },
    },
  }), [showYAxisTitle]);

  return (
    <div className={styles.chartWrapper}>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};