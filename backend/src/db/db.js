import { createPool } from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const pool = createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    
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