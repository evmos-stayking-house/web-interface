import type { FC, ReactNode } from 'react';

import s from './Confirm.module.scss';
import Button from '../../../common/Button';

interface Props {
  success: boolean;
  title: string;
  children: ReactNode;
  closeModal: VoidFunction;
}

const Confirm: FC<Props> = ({ success= true, closeModal, title, children }) => {

  return (
    <div className={s.container}>
      <div className={s.titleContainer}>
        <img className={s.titleContainer__logo} src={`/img/common/${success ? 'success' : 'fail'}.png`} alt={'success/fail logo'} />
        <span className={s.titleContainer__title}>
          {title}
        </span>
      </div>
      <div className={s.contentContainer}>
        {children}
      </div>
      <div className={s.confirmBtn}>
        <Button onClick={() => closeModal()}>Confirm</Button>
      </div>
    </div>
  );
};

export default Confirm;
