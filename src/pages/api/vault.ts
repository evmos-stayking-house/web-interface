import type { NextApiRequest, NextApiResponse } from 'next';
import vaultData from 'config/data/vault.json';

type Data = {
  data: object;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ data: vaultData });
}
