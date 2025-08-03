import express from 'express';
import cors from 'cors';
import tokenRoutes from './routes/token.routes';
import { setupSwagger } from './config/swagger';
import path from 'path';

export const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/token', tokenRoutes);
setupSwagger(app); // 👈 Aquí cargamos Swagger
app.use(express.static(path.join(__dirname, '../../client/dist')));

// ⛔️ Excluir rutas como /api/* y /api-docs para no redirigirlas al frontend
app.get(/^\/(?!api|api-docs).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});