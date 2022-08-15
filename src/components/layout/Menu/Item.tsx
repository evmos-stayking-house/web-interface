import type { FC } from 'react';
import { cn } from 'utils/style';
import s from './Menu.module.scss';
import useMenu from './Menu.service';
import { useRouter } from 'next/router';

interface ItemProps {
  url: string;
  label: string;
}

const Item: FC<ItemProps> = ({ label, url}) => {
  const { movePage } = useMenu();
  const { pathname } = useRouter();

  return (
    <div className={s.menuItem}>
      <span onClick={() => movePage(url)} className={cn(s.label, { [s.active]: url === pathname })}>{label}</span>
    </div>
  );
};

export default Item;
