export const getValueFromSet = (e: Set<string>) => {
  return Array.from(e).join(', ').replaceAll('_', ' ');
};

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
