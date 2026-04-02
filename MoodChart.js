import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function MoodChart({ moods }) {
  const moodCount = {};
  moods.forEach(item => {
    if (moodCount[item.mood]) moodCount[item.mood] += 1;
    else moodCount[item.mood] = 1;
  });

  const data = {
    labels: Object.keys(moodCount),
    datasets: [
      {
        label: "Mood Count",
        data: Object.values(moodCount),
        backgroundColor: "rgba(75, 192, 192, 0.6)"
      }
    ]
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Mood Analytics</h2>
      <Bar data={data} />
    </div>
  );
}

export default MoodChart;