require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const WebSocket = require('ws');
const authRoutes = require('./Routes/auth');
const registerRoutes = require('./Routes/register');
const documentRoutes = require('./Routes/document');
const productRoutes = require('./Routes/Product');

const app = express();
connectDB();

app.use(bodyParser.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/products', productRoutes);

// // WebSocket Client
// const ws = new WebSocket('ws://localhost:8080'); // Connect to Backend A WebSocket server

// ws.on('open', () => {
//     console.log('Connected to Backend A WebSocket server');

//     // Send a message to Backend A
//     ws.send('Hello from Backend B,This side Mukesh');
// });

// ws.on('message', (message) => {
//     // Convert Buffer to String
//     const readableMessage = message.toString();
//     console.log('Message from Backend A:', readableMessage);
// });


// ws.on('close', () => {
//     console.log('Disconnected from Backend A');
// });

// Start HTTP server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend B running on port ${PORT}`));
