import { useCallback, useState, useEffect, useRef, cloneElement, ReactElement } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { ModalLayout } from './Modal';

interface Props {
  content: ReactNode;
}

export const useModal = ({ content }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const portalRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    portalRef.current = document.getElementById('modal');
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    renderModal();
  }, [isOpen]);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const renderModal = () => {
    if (!isOpen) return;

    const contentEl = content as ReactElement;

    return createPortal(
      <ModalLayout isOpen={isOpen} closeModal={closeModal}>
        {cloneElement(contentEl, { closeModal })}
      </ModalLayout>,
      portalRef.current!
    );
  };

  return {
    openModal,
    closeModal,
    renderModal
  };
};
