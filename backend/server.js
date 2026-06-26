const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');   // ✅ ADDED

dotenv.config();

const app = express();

/* ==============================
   Middleware
============================== */

app.use(cors({
  origin: [
    "http://localhost:5177",
    "http://127.0.0.1:5177"
  ],
  credentials: true
}));

app.use(express.json());

/* ==============================
   MongoDB Connection
============================== */

console.log("MONGO_URI:", process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
  })
  .catch((err) => {
    console.log('❌ MongoDB connection error:', err);
  });

/* ==============================
   Test Route
============================== */

app.get('/api/test', (req, res) => {
  res.json({
    message: "Ideabridge Backend Working Successfully 🚀"
  });
});

/* ==============================
   Routes
============================== */

const authRoutes = require('./routes/authRoutes');

app.use('/api/auth', authRoutes);

/* ==============================
   Entrepreneur Dashboard Route
============================== */

app.get("/entrepreneur-dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "entrepreneur-dashboard.html"));
});

/* ==============================
   Server
============================== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Ideabridge backend running on port ${PORT}`);
});