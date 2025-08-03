import { Router } from 'express';
import { validarToken } from '../controllers/token.controller';

const router = Router();

router.post('/validar', validarToken);

export default router;
