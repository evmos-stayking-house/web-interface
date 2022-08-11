import { FC, ReactNode } from 'react';
import useInputNumber from './InputNumber.service';
import InputWrapper from '../InputWrapper';

interface InputNumberProps {
  max: string;
  placeholder?: string;
  decimal?: number;
  inputValue?: string;
  setInputValue: Function;
  button?: ReactNode
}

const InputNumber: FC<InputNumberProps> = ({ max, placeholder: defaultPlaceholder, decimal, setInputValue, button, inputValue }) => {
  const { value, placeholder, handleChange, handleBlur } = useInputNumber({
    defaultPlaceholder,
    decimal,
    setInputValue,
    max,
    inputValue
  });

  return (
    <InputWrapper>
      <input
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        placeholder={placeholder}
      />

      {button}
    </InputWrapper>
  );
};

export default InputNumber;
