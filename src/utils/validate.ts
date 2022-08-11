export function validateNumberInProgress(value: string, decimal = 0) {
  let numRegex: RegExp = /^\d+$/;
  const valueArr = value.split('.');

  if (value === '') return true; // 초기값 ''
  if (decimal === 0 && valueArr.length !== 1) return false; // decimal 0일 때, 3.1
  if (valueArr.length > 2) return false; // 3.3.3
  if (!numRegex.test(valueArr[0])) return false; // 숫자아님

  if (valueArr.length === 2) {
    if (valueArr[1] === '') return true; // 소수점 입력 안 했을 때 '3.'
    if (!numRegex.test(valueArr[1])) return false; // 숫자아님

    return valueArr[1].length <= decimal;
  }

  return true;
}

export function validateNumber(value: string, decimal = 0) {
  let regex: RegExp;

  if (decimal) {
    let regStr = '^\\d+(\\.\\d{' + decimal + '})?$';
    regex = new RegExp(regStr);
  } else {
    regex = /^\d+$/;
  }

  return regex.test(value);
}

export function setValidationNumber(value: string, decimal = 0) {
  if (validateNumber(value, decimal)) return value;

  return '';
}
