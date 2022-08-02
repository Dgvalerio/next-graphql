import type { NextApiRequest, NextApiResponse } from 'next';

import User from '@/user/user.entity';
import UserRepository from '@/user/user.repository';

type Handler = (req: NextApiRequest, res: NextApiResponse<User>) => void;

const handler: Handler = async (req, res) => {
  const repo = new UserRepository();

  const user = await repo.create({
    name: 'an_name',
    email: 'an_email',
  });

  res.status(200).json(user);
};

export default handler;
