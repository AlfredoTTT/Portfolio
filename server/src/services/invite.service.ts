import { AppDataSource } from '../config/orm.config';
import { InviteToken } from '../entity/InviteToken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const repo = AppDataSource.getRepository(InviteToken);

export const generateInvite = async (recruiterEmail: string): Promise<InviteToken> => {
  const token = crypto.randomBytes(16).toString('hex');

  const nuevaInvitacion = repo.create({
    token,
    recruiterEmail,
  });

  await repo.save(nuevaInvitacion);

  const url = `http://localhost:4200/login?token=${token}`;
  await sendMail(recruiterEmail, url);

  return nuevaInvitacion;
};

export const validateToken = (token: string): boolean => {
  return token.length > 3;
};


const sendMail = async (destinatario: string, url: string) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT || '587'),
    secure: false, // false para STARTTLS
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
  await transporter.sendMail({
    from: `"Portfolio" <${process.env.MAIL_USER}>`,
    to: destinatario,
    subject: 'Invitación al portafolio',
    html: `
      <p>Hola,</p>
      <p>Has sido invitado a revisar un portafolio profesional.</p>
      <p>Haz clic aquí para acceder:</p>
      <a href="${url}">${url}</a>
      <p>Este enlace es personal y no debe compartirse.</p>
    `
  });
};
