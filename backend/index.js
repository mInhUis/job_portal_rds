import app from './src/app.js';
import { connectToDatabase } from './src/db/db.js';

const PORT = process.env.PORT || 5000;

connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
