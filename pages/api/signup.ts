import bcrypt from 'bcrypt';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

import { prismaClient } from '../../lib/prisma';

const customCookie = process.env.ACCESS_TOKEN_COOKIE;
const jwtSecret = process.env.JWT_SECRET;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const salt = bcrypt.genSaltSync();
  const { name, email, password } = req.body;

  let user;

  try {
    user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: bcrypt.hashSync(password, salt),
      },
    });
  } catch (err) {
    return res.status(401).json({ error: 'User already exists.' });
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

  return res.status(201).json(user);
};
