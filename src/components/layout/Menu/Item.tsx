import type { FC } from 'react';
import { cn } from 'utils/style';
import s from './Menu.module.scss';
import useMenu from './Menu.service';

interface ItemProps {
  url: string;
  label: string;
  className?: string;
}

const Item: FC<ItemProps> = ({ label, url, className = '' }) => {
  const { movePage } = useMenu();
  return (
    <div className={s.menuItem} onClick={() => movePage(url)}>
      <span className={cn(s.label, { [className]: !!className })}>{label}</span>
    </div>
  );
};

export default Item;
