export const getValueFromSet = (e: Set<string>) => {
  return Array.from(e).join(', ').replaceAll('_', ' ');
};
