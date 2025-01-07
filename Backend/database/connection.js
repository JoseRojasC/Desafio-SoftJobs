import pkg from "pg";
import "dotenv/config";

const { Pool } = pkg;

export const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  allowExitOnIdle: true,
});

// Prueba la conexión a la base de datos
try {
  await pool.query("SELECT NOW()");
  console.log("Database connected");
} catch (error) {
  console.error("Database connection error:", error);
}
