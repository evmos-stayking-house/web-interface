import type { ReactNode, FC } from 'react';
import { cn } from 'utils/style';
import s from './Item.module.scss';

interface ItemProps {
  label: string;
  extra?: string | ReactNode;
  className?: string;
  children: ReactNode;
}

const Item: FC<ItemProps> = ({ label, extra, className = '', children }) => {
  return (
    <div className={cn(s.itemWrapper, { [className]: !!className })}>
      <p className={s.label}>{label}</p>
      {children}
      <p className={s.extra}>{extra}</p>
    </div>
  );
};

export default Item;
