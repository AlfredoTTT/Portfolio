import { InviteToken } from './../entity/InviteToken';
import { AppDataSource } from '../config/orm.config';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const repo = AppDataSource.getRepository(InviteToken);

export const generateInvite = async (recruiterEmail: string): Promise<InviteToken> => {
  const inviteToken = crypto.randomBytes(16).toString('hex');

  const nuevaInvitacion = repo.create({
    inviteToken,
    recruiterEmail,
  });

  await repo.save(nuevaInvitacion);

  const url = `http://localhost:4200/login`;
  await sendMail(recruiterEmail, url, inviteToken);

  return nuevaInvitacion;
};

export const validateToken = async (inviteToken: string): Promise<InviteToken> => {
  const foundToken = await repo.findOne({
    where: { inviteToken, used: false },
  });

  if (!foundToken) {
    throw new Error('Invalid or already used token');
  }

  foundToken.used = true;
  foundToken.usedAt = new Date();
  await repo.save(foundToken);

  return foundToken;
};


const sendMail = async (destinatario: string, url: string, token: string) => {
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
      <p>Tu token de acceso es: <strong>${token}</strong></p>
      <p>Este enlace es personal y no debe compartirse.</p>
    `
  });
};
