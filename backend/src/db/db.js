import { createPool } from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const pool = createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    
    waitForConnections: true,
    connectionLimit: 10
});

const connectToDatabase = async () => {
try {
    await pool.getConnection();
    console.log("MySQL Connection Successful");
} catch (error) {
    console.log("Database Connection Error");
    console.log(error);
    throw error
}
};

export {connectToDatabase, pool};