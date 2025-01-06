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

app.get('/', (req, res) => {
    res.send('Hola Mundo');
});

app.listen(8000, () => {
    console.log('Server UP running in http://localhost:8000/');
});
