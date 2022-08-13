import React, { FC, ReactNode } from 'react';
import s from './Menu.module.scss';
import Item from './Item';

export declare type MenuType<T> = FC<T> & { Item: typeof Item };

interface MenuProps {
  children: ReactNode;
}

const Menu: MenuType<MenuProps> = ({ children }) => {
  return <div className={s.SidebarContainer}>{children}</div>;
};

Menu.Item = Item;

export default Menu;
