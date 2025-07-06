import React from "react";

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


export default function FlowBuilder() {
  const handleLaunch = () => {
    trackEngagement("click", "user@example.com", {
      action: "Launch Campaign",
      page: "FlowBuilder",
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Campaign Flow Builder</h1>
      <p className="text-gray-600 mb-2">
        Design your email campaign flow with emotion-aware branching.
      </p>
      <div className="border rounded-2xl p-4 bg-white shadow-xl min-h-[300px] flex items-center justify-center text-gray-400">
        Drag-and-drop flow UI coming soon
      </div>
      <div className="mt-4">
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded w-full"
          onClick={handleLaunch}
        >
          Launch Campaign
        </button>
      </div>
    </div>
  );
}
