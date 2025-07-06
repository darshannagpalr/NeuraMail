// src/components/Analytics.jsx
import React, { useEffect, useState } from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";
import io from "socket.io-client";

ChartJS.register(
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const socket = io("http://localhost:5000");

// 📌 Tracking function
const trackEngagement = async (type, emailId, meta = {}) => {
  try {
    await fetch(`${process.env.REACT_APP_API_BASE_URL}/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, emailId, meta }),
    });
    console.log("Tracked:", type);
  } catch (err) {
    console.error("Tracking failed", err);
  }
};


export default function Analytics() {
  const [data, setData] = useState({ opens: [], clicks: [], emotions: [] });

  useEffect(() => {
    socket.on("update", updatedData => setData(updatedData));
    return () => socket.disconnect();
  }, []);

  const lineChart = {
    labels: data.opens.map((_, i) => i + 1),
    datasets: [
      {
        label: "Email Opens",
        data: data.opens.map((t, i) => i + 1),
        borderColor: "#3b82f6",
        fill: false
      },
      {
        label: "Clicks",
        data: data.clicks.map((t, i) => i + 1),
        borderColor: "#10b981",
        fill: false
      }
    ]
  };

  const emotionCounts = data.emotions.reduce((acc, e) => {
    acc[e.emotion] = (acc[e.emotion] || 0) + 1;
    return acc;
  }, {});

  const pieChart = {
    labels: Object.keys(emotionCounts),
    datasets: [
      {
        data: Object.values(emotionCounts),
        backgroundColor: ["#f87171", "#60a5fa", "#34d399", "#facc15"]
      }
    ]
  };

  const handleReportDownload = () => {
    trackEngagement("click", "user@example.com", {
      action: "Download Report",
      page: "Analytics"
    });
    alert("🔍 Analytics report download simulated.");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Real-Time Performance Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-2">Open & Click Trends</h2>
          <Line data={lineChart} />
        </div>
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-2">Emotional Responses</h2>
          <Pie data={pieChart} />
        </div>
      </div>

      {/* CTA for engagement tracking */}
      <div className="mt-6">
        <button
          onClick={handleReportDownload}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded"
        >
          Download Report
        </button>
      </div>
    </div>
  );
}
