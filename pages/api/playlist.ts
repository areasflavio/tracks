import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { prismaClient } from '../../lib/prisma';
import { validateRoute } from '../../middleware/authValidate';

export default validateRoute(
  async (req: NextApiRequest, res: NextApiResponse, user: User) => {
    const playlists = await prismaClient.playlist.findMany({
      where: { userId: user.id },
      orderBy: { name: 'asc' },
    });

    return res.json(playlists);
  }
);
