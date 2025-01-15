require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./Routes/auth');
const registerRoutes = require('./Routes/register');
const documentRoutes = require('./Routes/document');
const productRoutes = require('./Routes/Product');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/products', productRoutes);




// const http = require("http");
// const { Server } = require("socket.io");
// const mongoose = require("mongoose");

// const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:5000", // Allow all origins or specify your delivery backend URL
//     },
// });

// // Sample Schema and Model
// const ActivitySchema = new mongoose.Schema({
//     type: String,
//     details: String,
//     timestamp: Date,
// });
// const Activity = mongoose.model("Activity", ActivitySchema);

// // Socket.IO Logic
// io.on("connection", (socket) => {
//     console.log("Vendor client connected:", socket.id);

//     // Emit activity to delivery backend
//     socket.on("activity", (data) => {
//         console.log("New Activity:", data);
//         io.emit("new-activity", data);
//     });
// });

// // Endpoint to Create Activity
// app.post("/activity", async (req, res) => {
//     const { type, details } = req.body;

//     const newActivity = new Activity({
//         type,
//         details,
//         timestamp: new Date(),
//     });

//     await newActivity.save();

//     // Emit new activity to connected clients
//     io.emit("new-activity", newActivity);
//     console.log(newActivity)

//     res.status(201).json(newActivity);
// });




const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
