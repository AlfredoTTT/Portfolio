import { Request, Response } from 'express';
import { generateInvite, validateToken } from '../services/invite.service';

export const sendEmail = async (req: Request, res: Response) => {
  const { recruiterEmail } = req.body;

  if (!recruiterEmail || !recruiterEmail.includes('@')) {
    return res.status(400).json({ message: 'Email inválido.' });
  }

  try {
    const invitacion = await generateInvite(recruiterEmail);
    res.status(201).json({
      message: 'Invitation send.',
      token: invitacion.inviteToken,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error: '+ (error instanceof Error ? error.message : 'Internal server error') });
  }
}

export const validarToken = async (req: Request, res: Response) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(400).json({ message: 'Token not provided' });
  }

  try {
    await validateToken(token); 
    return res.status(200).json({ message: 'Valid token' });
  } catch (error) {
    return res.status(401).json({ message: error instanceof Error ? error.message : 'Invalid token' });
  }
};
