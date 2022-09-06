import { calculateAPYFromAPR } from './utils';

test('apr to apy test', () => {
  const apy = calculateAPYFromAPR('2.37');
  console.log(apy);
});
