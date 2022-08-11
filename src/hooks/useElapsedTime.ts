import { useEffect, useState } from 'react';

export default function useElapsedTime() {
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [hr, setHr] = useState(0);
  const [timeString, setTimeString] = useState('00:00:00');
  let intervalId: number;

  useEffect(() => {
    setTimeString(`${hr}:${min}:${sec}`);
  }, [sec, min, hr]);

  useEffect(() => {
    console.log('useeffect');
    intervalId = window.setInterval(() => {
      if (sec === 59) {
        setSec(0);

        if (min === 59) {
          setMin(0);
          setHr((prevHr) => prevHr + 1);
        } else {
          setMin((prevMin) => prevMin + 1);
        }
      } else {
        setSec((prevSec) => {
          return prevSec + 1;
        });
      }
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  function stopTicker() {
    window.clearInterval(intervalId);
  }

  return {
    time: timeString,
    stopTicker
  };
}
