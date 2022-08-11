import { useRef } from 'react';
import type { ReactNode, FC } from 'react';
import Image from 'next/image';
import useClickOutside from 'hooks/useClickOutside';
import useDropdown from './Dropdown.service';
import type { itemType } from './types';

import s from './Dropdown.module.scss';

interface DropdownProps {
  placeholder?: string;
  selectedId?: string;
  list: itemType<string | ReactNode>[];
  onChange?: Function;
}

const Dropdown: FC<DropdownProps> = ({ placeholder, list, onChange, selectedId }) => {
  const { display, toggleDisplay, selected, handleSelect } = useDropdown(onChange);
  const ref = useRef(null);

  useClickOutside(ref, () => toggleDisplay(false));

  return (
    <div className={s.listContainer} onClick={(e) => toggleDisplay(!display)}>
      <div className={s.trigger}>
        {selected ? (
          <div className={s.listItem}>{selected.item}</div>
        ) : (
          <span className={s.triggerText}>{placeholder}</span>
        )}
        <div className={s.arrowDown}>
          <Image src="/img/common/arrow-down.svg" layout="fill" />
        </div>
      </div>

      {display && (
        <ul ref={ref} className={s.listWrap}>
          <li>
            <div className={s.listItem}><span>choose</span></div>
          </li>
          {list.map((el) => (
            <li key={el.key} onClick={() => handleSelect(el)}>
              <div className={s.listItem}>{el.item}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
