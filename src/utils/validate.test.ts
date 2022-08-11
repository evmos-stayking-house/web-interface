import { validateNumber, validateNumberInProgress } from './validate';

test('validate on change number with decimal', () => {
  expect(validateNumberInProgress('3', 0)).toBe(true);
  expect(validateNumberInProgress('3.', 1)).toBe(true);
  expect(validateNumberInProgress('3.0', 1)).toBe(true);

  expect(validateNumberInProgress('2.3', 3)).toBe(true);
  expect(validateNumberInProgress('2.31', 3)).toBe(true);
  expect(validateNumberInProgress('2.322', 3)).toBe(true);
  expect(validateNumberInProgress('2.320', 3)).toBe(true);
  expect(validateNumberInProgress('2.3225', 3)).toBe(false);

  expect(validateNumberInProgress('', 0)).toBe(true);
  expect(validateNumberInProgress('', 3)).toBe(true);

  expect(validateNumberInProgress('.', 0)).toBe(false);
  expect(validateNumberInProgress('.', 3)).toBe(false);
  expect(validateNumberInProgress('-', 0)).toBe(false);
  expect(validateNumberInProgress('-2', 0)).toBe(false);
  expect(validateNumberInProgress('-2.0', 1)).toBe(false);
});

test('validate number with decimal', () => {
  expect(validateNumber('3', 0)).toBe(true);
  expect(validateNumber('3.', 1)).toBe(false);
  expect(validateNumber('3.0', 1)).toBe(true);

  expect(validateNumber('2.3', 3)).toBe(false);
  expect(validateNumber('2.31', 3)).toBe(false);
  expect(validateNumber('2.322', 3)).toBe(true);
  expect(validateNumber('2.000', 3)).toBe(true);
  expect(validateNumber('2.3225', 3)).toBe(false);

  expect(validateNumber('', 0)).toBe(false);
  expect(validateNumber('', 3)).toBe(false);
  expect(validateNumber('-', 0)).toBe(false);
  expect(validateNumber('-2', 0)).toBe(false);
});
