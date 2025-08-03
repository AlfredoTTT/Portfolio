import express from 'express';
import cors from 'cors';
import { AppDataSource } from './orm.config';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/validar-token', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(400).json({ message: 'Token no proporcionado' });
  }

  if (token.length > 3) {
    return res.status(200).json({ message: 'Token válido' });
  } else {
    return res.status(401).json({ message: 'Token inválido (muy corto)' });
  }
});

const PORT = 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('📦 Conexión a PostgreSQL OK');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor backend en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error al conectar DB:', err);
  });
