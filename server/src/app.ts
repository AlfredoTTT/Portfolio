import express from 'express';
import cors from 'cors';
import inviteRoutes from './routes/invite.routes';
import { swaggerSpec } from './swagger.config';
import swaggerUi from 'swagger-ui-express';

export const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/invite', inviteRoutes);
app.get('/', (req, res) => {
  res.redirect('/api/docs');
});
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));