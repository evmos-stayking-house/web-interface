import type { ReactNode, FC } from 'react';
import s from './Modal.module.scss';

interface Props {
  isOpen: boolean;
  closeModal: VoidFunction;
  children: ReactNode;
}

export const ModalLayout: FC<Props> = ({ closeModal, children }) => {
  return (
    <div className={s.container}>
      <div className={s.dimmer} onClick={closeModal} />
      <div className={s.content}>{children}</div>
    </div>
  );
};
