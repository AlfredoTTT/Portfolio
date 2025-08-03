import { Router } from 'express';
import { validarToken } from '../controllers/token.controller';

const router = Router();
/**
 * @swagger
 * /api/token/validar:
 *   post:
 *     summary: Valida un token enviado en el header Authorization
 *     tags: [Token]
 *     responses:
 *       200:
 *         description: Token válido
 *       400:
 *         description: Token no proporcionado
 *       401:
 *         description: Token inválido
 */
router.post('/validar', validarToken);

export default router;
