import React from "react";

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


export default function Dashboard() {
  const handleInsightsClick = () => {
    trackEngagement("click", "user@example.com", {
      action: "View Campaign Insights",
      page: "Dashboard",
    });
    alert("📊 Campaign insights opened (simulated)");
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-2xl shadow-xl">
          <h2 className="text-lg font-semibold">Engagement Rate</h2>
          <p className="text-4xl text-green-500 font-bold">56%</p>
        </div>
        <div className="p-4 bg-white rounded-2xl shadow-xl">
          <h2 className="text-lg font-semibold">Conversion Rate</h2>
          <p className="text-4xl text-indigo-500 font-bold">67%</p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-4">
        <button
          onClick={handleInsightsClick}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
        >
          View Campaign Insights
        </button>
      </div>
    </div>
  );
}
