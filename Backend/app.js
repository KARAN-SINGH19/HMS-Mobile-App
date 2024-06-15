const express = require("express");
const cors = require('cors');
const testRoute = require("./Routes/testRoute")
const app = express();

const allowedOrigins = [
    'http://localhost:3000', // For your React web app
    'http://192.168.0.147:8081', // Your Expo development server
    'http://192.168.0.147:19000', // Expo Go app on your local network
    'http://192.168.0.147:19001', // Expo Go app on your local network
];

app.use(cors({
    credentials: true,
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl, etc.)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.use(express.json());

app.use('/api/v1', testRoute)

module.exports = app;


