import pg from "pg";

const { Pool } = pg;

// Obtener URL de conexión desde variables de entorno
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.warn(
    "DATABASE_URL no está configurada. La base de datos no funcionará."
  );
  console.warn(
    "Configura DATABASE_URL en tu archivo .env con la URL de conexión de Neon o PostgreSQL"
  );
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Necesario para Neon
  },
});

pool.on("error", (err) => {
  console.error("Error inesperado en el pool de conexión:", err);
});

export default pool;
