import express from "express";

const router = express.Router();
// Simple in-memory User model for demonstration
const users = [
    { id: 1, email: 'test@example.com', password: 'password123' }
];

const User = {
    findOne: async ({ email }) => {
        return users.find(user => user.email === email) || null;
    }
};
router.post('/test', async (req, res) => {
  console.log('Login request received');
  console.log('Body:', req.body); // Check what the frontend sends

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Missing credentials' });
  }

  // Example login logic
  const user = await User.findOne({ email });
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

// Send token and userId to frontend
return res.json({ token: 'example-jwt-token', userId: user.id });
});

export default router;