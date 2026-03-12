import { Router } from 'express';
import { authenticateToken, authorizeRoles } from '../middleware/auth.js';
import { pool } from '../db/db.js';
import upload from '../middleware/upload.js';

const router = Router();

router.post("/:jobId", authenticateToken, authorizeRoles("jobseeker"), upload.single("resume"), async (req, res) => {
    const { jobId } = req.params;
    const { name,
            email,
            phone,
            location, 
            linkedin,
            github,
            
            coverLetter,
            yearsOfExperience,
            availability,
            agreeTerms
           }
      = req.body;
    const userId = req.user.id;
    const resumePath = req.file ? `/uploads/resumes/${req.file.filename}` : null;
    


    const [existing] = await pool.query(
        "SELECT * FROM applications WHERE job_id = ? AND user_id = ?", [jobId, userId]
    );
    if (existing.length > 0) {
        return res.status(400).json({ error: 'You have already applied for this job' });
    }

    await pool.query(
        'INSERT INTO applications (job_id, user_id, name, email, phone, location, linkedin, github, resume, coverLetter, yearsOfExperience, availability, agreeTerms) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [jobId, userId,  name,email, phone, location, linkedin, github, resumePath, coverLetter, yearsOfExperience, availability, agreeTerms ]
    );
    res.status(201).json({ message: 'Application submitted successfully' });
});

router.get('/jobseeker/my_applies', authenticateToken, authorizeRoles('jobseeker'), async (req, res) => {
  const userId = req.user.id;

  const [applications] = await pool.query(`
    SELECT j.id, j.title, j.description, a.created_at
    FROM applications a
    JOIN jobs j ON a.job_id = j.id
    WHERE a.user_id = ?
  `, [userId]);

  res.json(applications);
});

router.get('/employer/my_post/:jobId', authenticateToken, authorizeRoles('employer'), async (req, res) => {
  const { jobId } = req.params;
  const userId = req.user.id;

  // Check if the job belongs to this employer
  const [jobs] = await pool.query('SELECT * FROM jobs WHERE id = ? AND employer_id = ?', [jobId, userId]);
  if (jobs.length === 0) return res.status(403).json({ message: 'Job dont exist or Unauthorized' });
  // Fetch the job details
  const [applications] = await pool.query(`
    SELECT a.id, u.name AS applicant_name, a.cover_letter, a.created_at
    FROM applications a
    JOIN users u ON a.user_id = u.id
    WHERE a.job_id = ?
  `, [jobId]);

  res.json(applications);
});

export default router;


