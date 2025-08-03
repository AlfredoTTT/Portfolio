import { Request, Response } from 'express';
import { validateToken } from '../services/token.service';

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
