import type { NextApiRequest, NextApiResponse } from 'next';
import melterData from 'config/data/melter.json';

type Data = {
  data: object;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ data: melterData });
}
