import type { FC, ChangeEvent } from 'react';

import s from './Toggle.module.scss';
import { useThemeState } from '../../../contexts/ThemeContext';
import { useState } from 'react';

// Todo: toggle 기능만 하도록 수정. dark mode 기능 빼기
const Toggle: FC = () => {
  const { isDarkMode, toggleDarkMode } = useThemeState();
  const [toggle, setToggle] = useState(isDarkMode);
  function handleClick(e: ChangeEvent<HTMLInputElement>) {
    setToggle(!toggle);
    toggleDarkMode();
  }

  return (
    <label className={s.switch}>
      <input type="checkbox" onChange={handleClick} checked={toggle} />
      <span className={s.slider}></span>
    </label>
  );
};

export default Toggle;
