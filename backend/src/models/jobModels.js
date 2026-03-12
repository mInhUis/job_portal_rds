import { pool} from '../db/db.js';

export async function createJob(job) {
  const {
    title,
    description,
    location,
    salary,
    department,
    requirements,
    benefits,
    skills,
    applicationDeadline,
    contactEmail,
  } = job;

  const employer_id = job.employer_id;

  const [result] = await pool.query(
    `INSERT INTO jobs 
      (title, description, location, salary, employer_id, department, requirements, benefits, skills, applicationDeadline, contactEmail)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      title,
      description,
      location,
      salary,
      employer_id,
      department,
        Array.isArray(requirements) ? requirements.join(', ') : requirements,
      Array.isArray(benefits) ? benefits.join(', ') : benefits,
      Array.isArray(skills) ? skills.join(', ') : skills,
      applicationDeadline,
      contactEmail,
    ]
  );

  return result.insertId;
}


export async function getAllJobs() {
    const [rows] = await pool.query('SELECT * FROM jobs');
    return rows;
}

export async function getJobById(id) {
    const [rows] = await pool.query(`
        SELECT 
            j.id,
            j.title,
            j.department,
            j.location,
            j.status,
            j.salary,
            j.description
        FROM jobs j
        LEFT JOIN applications a ON j.id = a.job_id
        WHERE j.employer_id = ?
        GROUP BY j.id;
    `, [id]);
    return rows;
}

export async function getJobById_specific(id) {
    const [rows] = await pool.query(`
        SELECT 
            j.id,
            j.title,
            j.department,
            j.location,
            j.status,
            j.salary,
            j.description
        FROM jobs j
        LEFT JOIN applications a ON j.id = a.job_id
        WHERE j.employer_id = ?
        GROUP BY j.id;
    `, [id]);
    return [rows[0]];
}

export async function updateJob(id, job ) {
    const {
    title,
    description,
    location,
    salary,
    department,
    requirements,
    benefits,
    skills,
    applicationDeadline,
    contactEmail
  } = job;
    const [result] = await pool.query(
        'UPDATE jobs SET title = ?, description = ?, location = ?, salary = ?, department = ?, requirements = ?, benefits = ?, skills = ?, applicationDeadline = ?, contactEmail = ? WHERE id = ?',
        [
      title,
      description,
      location,
      salary,
      department,
      Array.isArray(requirements) ? requirements.join(', ') : requirements,
      Array.isArray(benefits) ? benefits.join(', ') : benefits,
      Array.isArray(skills) ? skills.join(', ') : skills,
      applicationDeadline,
      contactEmail,
      id
    ]
    );
}

export async function deleteJob(id) {
  await pool.query('DELETE FROM jobs WHERE id = ?', [id]);
}