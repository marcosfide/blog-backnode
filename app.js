import express from 'express';
import cors from 'cors';
import pool from './database/db.js';
import blogRoutes from './routes/routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/blogs', blogRoutes);

// Prueba la conexión usando una consulta simple
try {
    const result = await pool.query('SELECT NOW()'); // Consulta simple
    console.log('Conexión exitosa a db. Hora:', result.rows[0].now);
} catch (error) {
    console.log(`El error de conexión es: ${error.message}`);
}

app.get('/', (req, res) => {
    res.send('Hola Mundo');
});

app.listen(8000, () => {
    console.log('Server UP running in http://localhost:8000/');
});
