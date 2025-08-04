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
      message: 'Invitación generada y enviada.',
      token: invitacion.token,
    });
  } catch (error) {
    console.error('Error al enviar invitación:', error);
    res.status(500).json({ message: 'Error al enviar invitación.' });
  }
}

export const validarToken = (req: Request, res: Response) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(400).json({ message: 'Token no proporcionado' });
  }

  const isValid = validateToken(token);

  if (isValid) {
    return res.status(200).json({ message: 'Token válido' });
  } else {
    return res.status(401).json({ message: 'Token inválido (muy corto)' });
  }
};
;
