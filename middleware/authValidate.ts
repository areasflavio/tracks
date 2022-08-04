import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { prismaClient } from '../lib/prisma';

const customCookie = process.env.ACCESS_TOKEN_COOKIE;
const jwtSecret = process.env.JWT_SECRET;

interface TokenDto {
  id: string;
}

export const validateRoute = handler => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies[customCookie];

    if (!token) {
      return res.status(401).json({ error: 'Token not found.' });
    }

    let user: User;

    try {
      const { id } = jwt.verify(token, jwtSecret) as TokenDto;

      user = await prismaClient.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new Error('Not real user.');
      }
    } catch (err) {
      return res.status(401).json({ error: 'Not authorized.' });
    }

    return handler(req, res, user);
  };
};
