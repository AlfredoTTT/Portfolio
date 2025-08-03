export const validateToken = (token: string): boolean => {
  return token.length > 3;
};
