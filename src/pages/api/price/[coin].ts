import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  data: object;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { coin } = req.query;

  const response = await fetch(`https://price-api.crypto.com/price/v1/exchange/${coin}`);
  res.status(200).json({ data: (await response.json()) });
}
