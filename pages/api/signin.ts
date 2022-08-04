import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

import { prismaClient } from '../../lib/prisma';

const customCookie = process.env.ACCESS_TOKEN_COOKIE;
const jwtSecret = process.env.JWT_SECRET;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password } = req.body;

  let user: User;

  try {
    user = await prismaClient.user.findUniqueOrThrow({
      where: {
        email,
      },
    });
  } catch (err) {
    return res.status(400).json({ error: 'User not found.' });
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(400).json({ error: 'Signin error.' });
  }

  const token = jwt.sign(
    {
      email: user.email,
      id: user.id,
      time: Date.now(),
    },
    jwtSecret,
    {
      expiresIn: '8h',
    }
  );

  res.setHeader(
    'Set-Cookie',
    cookie.serialize(customCookie, token, {
      httpOnly: true,
      maxAge: 60 * 60 * 8, // 8h
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
  );

  const { id, name } = user;

  return res.json({ id, name, email });
};
