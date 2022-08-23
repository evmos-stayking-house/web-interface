import { useState } from 'react';

const useAdjust = () => {
  const [leverage, setLeverage] = useState<string | null>('1.0');

  return {
    leverage,
    setLeverage
  };
};

export default useAdjust;
