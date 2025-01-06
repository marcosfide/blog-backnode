import express from 'express';
import cors from 'cors';
import connectDB from './database/db.js';
import blogRoutes from './routes/routes.js';

const app = express();

// Conectar a MongoDB
connectDB();

app.use(cors());
app.use(express.json());
app.use('/blogs', blogRoutes);

// Ruta base
app.get('/', (req, res) => {
    res.send('Hola Mundo');
});

// Usar el puerto definido por Railway o un valor por defecto para desarrollo local
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server UP running on port ${PORT}`);
});
