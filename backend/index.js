import app from './src/app.js';
import { connectToDatabase } from './src/db/db.js';

const PORT = process.env.PORT || 5000;

// Track DB status globally
export const dbStatus = { connected: false };

// 1. Start the HTTP server immediately — don't wait for DB
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// 2. Try connecting to DB in the background, with retries
const connectWithRetry = async () => {
  while (!dbStatus.connected) {
    try {
      await connectToDatabase();
      dbStatus.connected = true;
      console.log('✅ Database connected');
    } catch (err) {
      console.error('❌ DB connection failed, retrying in 5s:', err.message);
      await new Promise(res => setTimeout(res, 5000));
    }
  }
};

connectWithRetry();

// 3. Catch any stray promise rejections so the process doesn't die
process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
});