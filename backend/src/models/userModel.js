import {pool} from '../db/db.js';
import bcrypt from 'bcrypt';

export async function createUser(user) {
    const {
        name, email, password, role
    } = user;
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
        `INSERT INTO users (name, email, password) VALUES (? ,? , ?)`,
        [name, email, hashedPassword] 
    );

    return result.insertId;
}

export async function getAllUsers() {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows;
}

export async function getUserById(id) {
    const [rows] = await pool.query("SELECT * FROM users WhERE id = ?", [id]);
    return rows[0];
}

export async function updateUser(id, user){
    const {
        name, email, password
    } = user;
    const [result] = await pool.query(
        `UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?`,
        [name, email, password, id]
    );
    return result.affectedRows > 0;
}

export async function deleteUser(id) {
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
    return result.affectedRows > 0;
}