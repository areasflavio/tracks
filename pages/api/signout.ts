import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

const customCookie = process.env.ACCESS_TOKEN_COOKIE;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize(customCookie, '', {
      httpOnly: true,
      maxAge: 60 * 60 * 8, // 8h
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })
  );

  return res.json({});
};
