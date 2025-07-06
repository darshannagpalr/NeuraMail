require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// Load values from .env
// const PORT = process.env.PORT || 5000;
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/neuramail";
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:3000";

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: FRONTEND_ORIGIN,
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors({
  origin: FRONTEND_ORIGIN,
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());

// MongoDB Connection
// mongoose
//   .connect(MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("MongoDB Connection Error:", err));

// // Schema
// const engagementSchema = new mongoose.Schema({
//   type: String, // click, open, emotion
//   emailId: String,
//   timestamp: { type: Date, default: Date.now },
//   meta: mongoose.Schema.Types.Mixed
// });

// const Engagement = mongoose.model("Engagement", engagementSchema);

// Track Engagement
app.post("/track", async (req, res) => {
  try {
    const { type, emailId, meta } = req.body;
    console.log(`📩 ${type.toUpperCase()} from ${emailId}`, meta);

    // const engagement = new Engagement({ type, emailId, meta });
    // await engagement.save();

    // Emit update to frontend
    // io.emit("update", await getAnalyticsData());

    res.status(200).json({ success: true, message: "Engagement saved" });
  } catch (err) {
    console.error("Track error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Analytics Helper
// async function getAnalyticsData() {
//   const all = await Engagement.find();
//   return {
//     opens: all.filter((e) => e.type === "open"),
//     clicks: all.filter((e) => e.type === "click"),
//     emotions: all
//       .filter((e) => e.type === "emotion")
//       .map((e) => ({ emotion: e.meta?.emotion || "unknown" }))
//   };
// }

// Health Check
app.get("/", (req, res) => {
  res.send("NeuraMail 2030 Backend is running.");
});

// Socket.IO
io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);
  // getAnalyticsData().then((data) => {
  //   socket.emit("update", data);
  // });
  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

// Start Server
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
