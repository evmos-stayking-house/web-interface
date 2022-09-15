import { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  data: object;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const now = new Date().getTime().toString();
  return fetch(`https://monitor.bronbro.io/api/ds/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      queries: [
        {
          datasource: {
            uid: 'GptFyxa7k',
            type: 'prometheus'
          },
          expr: 'Evmos_APR*100',
          utcOffsetSec: 32400
        }
      ],
      from: 'now-2m',
      to: 'now'
    })
  })
    .then(async (data) => {
      const result = await data.json();
      res.status(200).json({
        data: {
          time: now,
          apr: result?.results?.A.frames[0].data.values[1][0] || 266
        }
      });
    })
    .catch((err) => {
      console.log(err.toString());
      res.status(200).json({
        data: {
          time: now,
          apr: 266
        }
      });
    });
}
