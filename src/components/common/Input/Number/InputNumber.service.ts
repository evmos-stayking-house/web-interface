import { ChangeEvent, useEffect, useState } from 'react';
import { setValidationNumber, validateNumber, validateNumberInProgress } from 'utils/validate';

interface inputOption {
  defaultPlaceholder?: string;
  decimal?: number;
  inputValue?: string;
  setInputValue?: Function;
  max: string;
}

const useInputNumber = ({ max, defaultPlaceholder = '', decimal = 0, inputValue, setInputValue }: inputOption) => {
  const [value, setValue] = useState(inputValue);
  const [placeholder, setPlaceholder] = useState(defaultPlaceholder);

  useEffect(() => {
    if (!placeholder && decimal) {
      let numberPlaceholder = '0.';

      for (let i = 0; i < decimal; i++) {
        numberPlaceholder += '0';
      }

      setPlaceholder(numberPlaceholder);
    }
  }, []);

  useEffect(() => {
    setValue(inputValue)
  }, [inputValue])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (validateNumberInProgress(value, decimal)) {
      setValue(e.target.value);
      setInputValue!(e.target.value);
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (Number(max) < Number(value)) {
      setValue(max);
    } else {
      if (validateNumber(value, decimal)) {
        setValue(setValidationNumber(e.target.value, decimal));
      }
    }
  };

  return {
    value,
    placeholder,
    handleChange,
    handleBlur
  };
};

export default useInputNumber;
