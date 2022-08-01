// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

interface Data {
  name: string;
}

type Handler = (req: NextApiRequest, res: NextApiResponse<Data>) => void;

const handler: Handler = (req, res) => {
  res.status(200).json({ name: 'John Doe' });
};

export default handler;
