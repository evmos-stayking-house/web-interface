import type { ReactNode, FC, MouseEvent } from 'react';
import { cn } from 'utils/style';
import s from './Button.module.scss';

interface ButtonProps {
  full?: boolean;
  disabled?: boolean;
  onClick?: Function;
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({ full = false, disabled = false, onClick, children }) => {
  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (disabled) return;

    onClick && onClick(e);
  }

  return (
    <button type="button" className={cn(s.btn, { [s.full]: full, [s.disabled]: disabled })} onClick={handleClick}>
      <span>{children}</span>
    </button>
  );
};

export default Button;
