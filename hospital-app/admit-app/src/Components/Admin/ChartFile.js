import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { getAllAdmissions } from '../../Api/getApi';

const StackedChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllAdmissions()
      const data = await response.json();

      // Process data and create chart data
      const chartData = {
        labels: data.labels,
        datasets: [
          {
            label: 'Dataset 1',
            data: data.dataset1,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            type: 'bar',
          },
          {
            label: 'Dataset 2',
            data: data.dataset2,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            type: 'bar',
          },
          {
            label: 'Dataset 3',
            data: data.dataset3,
            fill: false,
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            type: 'line',
          },
        ],
      };
      setChartData(chartData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Stacked Chart Example</h2>
      <Bar data={chartData} options={{ indexAxis: 'y', stacked: true }} />
      <Line data={chartData} options={{ indexAxis: 'y' }} />
    </div>
  );
};

export default StackedChart;
