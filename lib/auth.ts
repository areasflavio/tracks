import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET;

interface TokenDto {
  id: string;
}

export const validateToken = (token: string) => {
  const { id } = jwt.verify(token, jwtSecret) as TokenDto;

  return id;
};
