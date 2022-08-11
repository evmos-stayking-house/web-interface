import { FC, ReactNode } from 'react';
import s from './Input.module.scss';

interface InputProps {
  children: ReactNode;
}

const InputWrapper: FC<InputProps> = ({ children }) => {
  return <div className={s.inputWrapper}>{children}</div>;
};

export default InputWrapper;
