import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    // Conectar a MongoDB usando Mongoose
    const conn = await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error al conectar a MongoDB: ${error.message}`);
    process.exit(1); // Detener el servidor si falla la conexión
  }
};

export default connectDB;
