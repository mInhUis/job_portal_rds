import { registerUser, loginUser } from '../controller/authController.js';
import express from 'express';
import { authenticateToken } from "../middleware/auth.js";
import {pool} from "../db/db.js";

const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);

router.get("/profile", authenticateToken, async (req, res) => {
  const [users] = await pool.query('SELECT id, name, email, role, resume, company_name, company_info FROM users WHERE id = ?', [req.user.id]);
  res.json(users[0]);
});


router.put("/profile", authenticateToken, async (req, res) =>{
  const userId =req.user.id;
  const { name, resume, company_name, company_profile } = req.body;

  const update = [];
  const values = [];

  if (name) {
    update.push("name = ?");
    values.push(name);
  }

  if (req.user.role === 'employer') {
    if (company_name !== undefined) {
      updates.push('company_name = ?');
      values.push(company_name);
    }
    if (company_info !== undefined) {
      updates.push('company_info = ?');
      values.push(company_info);
    }
  }

  if (updates.length === 0) {
    return res.status(400).json({ message: 'No fields to update' });
  }

  values.push(userId);
  const sql = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;

  await db.query(sql, values);
  res.json({ message: 'Profile updated' });
})
export default router;