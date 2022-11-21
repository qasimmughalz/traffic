import React from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

const LineChart = ({ valuesArray, datesArray }) => {
  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Total Visitors',
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  let chatData = valuesArray.map((data) => data);

  const data = {
    labels: datesArray,
    datasets: [
      {
        label: 'Total Visitors',
        data: chatData,
        type: 'line',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 2,
        fill: false,
        tension: 0.1,
        precision: 0,
      },
      {
        type: 'bar',
        label: 'Visitors',
        backgroundColor: 'rgb(75, 192, 192)',
        borderWidth: 2,
        fill: false,
        data: chatData,
      },
    ],
  };

  return <Chart type='bar' data={data} options={options} />;
};

export default LineChart;
