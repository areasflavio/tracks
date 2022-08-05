import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { prismaClient } from '../../lib/prisma';
import { validateRoute } from '../../middleware/authValidate';

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, user: User) => {
    const playlistCount = await prismaClient.playlist.count({
      where: { userId: user.id },
    });

    return res.json({ ...user, playlistCount });
  }
);
