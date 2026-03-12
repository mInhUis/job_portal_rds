import { pool } from '../db/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function registerUser(req, res) {
  let { email, password, name, role} = req.body;
   // Only allow 'employer' or 'jobseeker', never 'admin'
  if (role !== 'employer') {
    role = 'jobseeker'; // fallback
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query(
    'INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)',
    [email, hashedPassword, name, role]
  );

  res.status(201).json({ message: 'User registered' });
}

export async function loginUser(req, res) {
  const { email, password } = req.body;

  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  const user = rows[0];

  if (!user) return res.status(404).json({ error: 'User not found' });

  // Always compare the raw password with the hashed password stored in the database
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

  const token = jwt.sign({ id: user.id ,email: user.email, name: user.name, role:user.role}, process.env.JWT_SECRET, { expiresIn: '30d' });
  res.json({
    token
  });
}
