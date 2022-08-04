import { User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { validateRoute } from '../../middleware/authValidate';

export default validateRoute(
  (req: NextApiRequest, res: NextApiResponse, user: User) => {
    return res.json(user);
  }
);
