export const getValueFromSet = (e: Set<string>) => {
  return Array.from(e).join(', ').replaceAll('_', ' ');
};

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// apr 이 500% 라면 5
export const calculateAPYFromAPR = (apr: string) => {
  return (Math.pow(1 + Number(apr) / 365, 365) - 1) * 100;
};
