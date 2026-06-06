import express from 'express';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import applyRoutes from './routes/applyRoutes.js';
import testRoutes from './routes/testRoutes.js';
import cors from 'cors';

import promBundle from 'express-prom-bundle';

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
    res.json({ message: 'ping ccccc cc cccc cc ccccccccc c cccc ccc' });
});
/* git add .
git commit -m "test backned cicd pipeline"
git push*/
app.use('/login', testRoutes);


export default app;

const metricsMiddleware = promBundle({
    includeMethod: true,
    includePath: true,
    includeStatusCode: true,
    promClient: { collectDefaultMetrics: {} },  // Node.js runtime metrics
}); 

app.use(metricsMiddleware);

// TEST: Triggering GitHub Actions Backend CI/CD pipeline