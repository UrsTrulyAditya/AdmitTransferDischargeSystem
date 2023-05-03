import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";

const CovidVaccineStatusGraph = () => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    // Fetch the data for the chart from an API
    const fetchData = async () => {
      const response = await fetch(
        "https://disease.sh/v3/covid-19/vaccine/coverage?lastdays=10"
      );
      const data = await response.json();
      
      // Format the data for the chart
      const formattedData = {
        labels: [],
        datasets: [
          {
            label: "Total Vaccinations",
            data: [],
            backgroundColor: "rgba(75,192,192,0.4)",
          },
          {
            label: "People Vaccinated",
            data: [],
            backgroundColor: "rgba(153,102,255,0.4)",
          },
          {
            label: "People Fully Vaccinated",
            data: [],
            backgroundColor: "rgba(255,159,64,0.4)",
          },
        ],
      };

      Object.keys(data).forEach((date) => {
        formattedData.labels.push(date);
        formattedData.datasets[0].data.push(data[date].total);
        formattedData.datasets[1].data.push(data[date].people_vaccinated);
        formattedData.datasets[2].data.push(data[date].people_fully_vaccinated);
      });

      // Create the chart
      const ctx = document.getElementById("covid-vaccine-chart");
      const newChart = new Chart(ctx, {
        type: "line",
        data: formattedData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
      setChart(newChart);
    };

    fetchData();
  }, []);

  return <canvas id="covid-vaccine-chart" />;
};

export default CovidVaccineStatusGraph;
