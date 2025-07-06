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

var x = 40;

export default function RecipientProfile() {
  const handleEmotionClick = (emotion) => {
    trackEngagement("emotion", "user@example.com", {
      emotion,
      context: "RecipientProfile",
    });

    alert(`🧠 Emotion "${emotion}" recorded`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Recipient Profile</h1>
      <div className="bg-white rounded-2xl shadow-xl p-4">
        <h2 className="text-lg font-semibold mb-2">Emotional Response Breakdown</h2>
        <ul className="space-y-2 mb-4">
          <li className="flex justify-between">
            <span>😊 Joy</span><span className="text-green-600 font-bold">{x+1}%</span>
          </li>
          <li className="flex justify-between">
            <span>😐 Neutral</span><span className="text-yellow-500 font-bold">{x-1}%</span>
          </li>
          <li className="flex justify-between">
            <span>😢 Sadness</span><span className="text-blue-500 font-bold">20%</span>
          </li>
          <li className="flex justify-between">
            <span>😠 Anger</span><span className="text-red-500 font-bold">10%</span>
          </li>
        </ul>

        {/* Emotion Reaction CTA Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleEmotionClick("joy")}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          >
            😊 Joy
          </button>
          <button
            onClick={() => handleEmotionClick("neutral")}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
          >
            😐 Neutral
          </button>
          <button
            onClick={() => handleEmotionClick("sadness")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            😢 Sadness
          </button>
          <button
            onClick={() => handleEmotionClick("anger")}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            😠 Anger
          </button>
        </div>
      </div>
    </div>
  );
}
