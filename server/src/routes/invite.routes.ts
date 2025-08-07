import { Router } from 'express';
import { sendEmail,validarToken } from '../controllers/invite.controller';

const router = Router();
router.post('/validate', validarToken);
router.post('/', sendEmail);

export default router;
