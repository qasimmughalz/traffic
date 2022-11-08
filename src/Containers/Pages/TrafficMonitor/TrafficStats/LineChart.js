import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ valuesArray, datesArray }) => {
  const options = {
    scales: {
      y: {
        ticks: {
          precision: 0,
        },
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
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        precision: 0,
      },
    ],
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
