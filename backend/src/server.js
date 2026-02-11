import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import cors from 'cors';

import authRoutes from './routes/authRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import { connectDB } from './config/db.js';


dotenv.config();
const app = express();

app.use(express.json()); 
app.use(cors({
    origin: process.env.CLIENT_URL, credentials: true
}));
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);


const PORT = process.env.PORT; 

const startServer = async() => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting the server', error);
        process.exit(1);
    }
};

startServer();

