import { useEffect, useState } from 'react';

interface CoinPrice {
  slug: string;
  symbol: string;
  fiat: {
    "usd": number;
    "krw": number;
  };
  update_time: number;
}

const useCoinPrice = (slug: string): { coinPrice: number } => {
  const [coinPrice, setCoinPrice] = useState<number>(0);

  function fetchCoinInfo(slug: string): Promise<{ data: CoinPrice }> {
    return fetch(`/api/price/${slug}`).then(res => res.json());
  }

  useEffect(() => {
    (async () => {
      const res = await fetchCoinInfo(slug);
      setCoinPrice(res.data?.fiat?.usd || 0);
    })();
  }, []);

  return {
    coinPrice
  }
};

export default useCoinPrice;
