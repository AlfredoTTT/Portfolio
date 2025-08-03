import { app } from './app';
import { AppDataSource } from './config/orm.config';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('🟢 Conexión a PostgreSQL OK');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor backend en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar con PostgreSQL:', error);
  });
