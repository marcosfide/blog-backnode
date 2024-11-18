import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({
  user: process.env.DB_USER, // Usuario de la DB
  host: process.env.DB_HOST, // Host de la DB
  database: process.env.DB_NAME,     // Nombre de la base de datos
  password: process.env.DB_PASSWORD, // Contraseña de la DB
  port: process.env.DB_PORT || 5432, // Puerto (opcional, por defecto es 5432)
  ssl: {
    require: true,
    rejectUnauthorized: false // Cambiar a true en producción
  }
});

// Prueba de conexión
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.stack);
  } else {
    console.log('Conexión exitosa a la base de datos');
    release(); // Libera el cliente
  }
});

export default pool;
