import type { FC, ChangeEvent } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
// import { darkModeState, toggleDarkMode } from 'recoil/darkMode';

import s from './Toggle.module.scss';

// Todo: toggle 기능만 하도록 수정. darkmode 기능 빼기
const Toggle: FC = () => {
  // const [mode] = useRecoilState(darkModeState);
  // const setDarkMode = useSetRecoilState(toggleDarkMode);

  const [mode] = [false];
  const setDarkMode = (isMode: boolean) => {console.log(isMode)};

  function handleClick(e: ChangeEvent<HTMLInputElement>) {
    setDarkMode(!mode);
  }

  return (
    <label className={s.switch}>
      <input type="checkbox" onChange={handleClick} checked={mode} />
      <span className={s.slider}></span>
    </label>
  );
};

export default Toggle;
