import type { FC, ReactNode } from 'react';
import s from './LogoBg.module.scss';

interface LogoBgProps {
  children: ReactNode;
}

const LogoBg: FC<LogoBgProps> = ({ children }) => {
  return <div className={s.logoBgContainer}>{children}</div>;
};

export default LogoBg;
