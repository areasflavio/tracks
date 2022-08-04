import { NextApiRequest, NextApiResponse } from 'next';
import { validateRoute } from '../../middleware/authValidate';

export default validateRoute(
  (req: NextApiRequest, res: NextApiResponse, user) => {
    return res.json(user);
  }
);
