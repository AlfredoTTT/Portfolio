// Datos requeridos para generar un token de invitación
export interface CreateInviteDto {
  recruiterEmail: string;
}

// Datos que se espera recibir para validar un token
export interface ValidateInviteDto {
  inviteToken: string;
}
