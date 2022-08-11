import { ReactNode, useState } from 'react';
import type { itemType } from './types';

declare type selectedType = null | itemType<string | ReactNode>;

const useDropdown = (onChange?: Function) => {
  const [display, setDisplay] = useState(false);
  const [selected, setSelected] = useState<selectedType>(null);

  function toggleDisplay(mode: boolean) {
    setDisplay(mode);
  }

  function handleSelect(item: itemType<string | ReactNode>) {
    setSelected(item);
    onChange && onChange(item);
  }

  return {
    display,
    toggleDisplay,
    selected,
    handleSelect
  };
};

export default useDropdown;
