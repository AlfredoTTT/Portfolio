import { Router } from 'express';
import { sendEmail,validarToken } from '../controllers/invite.controller';

const router = Router();

/**
 * @swagger
 * /api/Invite/Validate:
 *   post:
 *     summary: Validate a token sent in the Authorization header
 *     description: Validates a token to check if it is valid or not.
 *     tags: [Invite]
 *     responses:
 *       200:
 *         description: Token is valid
 *       400:
 *         description: Token not provided
 *       401:
 *         description: Token is invalid
*/
router.post('/validate', validarToken);
/**
 * @swagger
 * /api/Invite:
 *   post:
 *     summary: Generate and send an invitation email
 *     description: Generates a unique invite token and sends it to the provided recruiter email.
 *     tags: [Invite]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recruiterEmail:
 *                 type: string
 *                 format: email
 *                 example: recruiter@example.com
 *     responses:
 *       201:
 *         description: Invitation generated and sent successfully
 *       400:
 *         description: Invalid email format
 *       500:
 *         description: Internal server error while sending the invitation
 */
router.post('/', sendEmail);

export default router;
