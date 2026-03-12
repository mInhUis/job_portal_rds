import express from 'express';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import applyRoutes from './routes/applyRoutes.js';
import testRoutes from './routes/testRoutes.js';
import cors from 'cors';
dotenv.config();
const corsOptions = {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    };

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applyRoutes);
app.get('/api/ping', (req, res) => {
    res.json({ message: 'pong' });
});

app.use('/login', testRoutes);


export default app;
