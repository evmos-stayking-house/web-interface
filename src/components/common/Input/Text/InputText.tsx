import { ChangeEvent, FC } from 'react';
import Image from 'next/image';
import InputWrapper from '../InputWrapper';
import s from '../Input.module.scss';

interface InputTextProps {
  placeholder?: string;
  value: string;
  handleChange: Function;
}

const InputText: FC<InputTextProps> = ({ placeholder, value, handleChange }) => {
  function setValue(e: ChangeEvent<HTMLInputElement>) {
    handleChange(e.target.value);
  }

  return (
    <InputWrapper>
      <input type="text" onChange={setValue} value={value} placeholder={placeholder} />

      <div className={s.deleteBtn} onClick={() => handleChange('')}>
        <Image src="/img/common/x-circle-white.svg" alt="aa" layout="fill" />
      </div>
    </InputWrapper>
  );
};

export default InputText;
