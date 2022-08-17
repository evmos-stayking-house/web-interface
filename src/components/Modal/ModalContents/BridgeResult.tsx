import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { cn } from 'utils/style';
import useElapsedTime from 'hooks/useElapsedTime';
import Button from 'components/common/Button';
import { BridgeStatus } from 'type/bridge';

import s from '../Modal.module.scss';

interface Props {
  getStatus: () => BridgeStatus;
  closeModal?: VoidFunction;
  result: {
    sourceChain: string;
    targetChain: string;
    symbol: string;
    amount: string;
    fee: string;
  };
}

const BridgeResult: FC<Props> = ({ getStatus, closeModal, result }) => {
  const [status, setStatus] = useState<BridgeStatus>(getStatus());
  const handleSubmit = () => {
    closeModal!();
  };
  const { time, stopTicker } = useElapsedTime();

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const currentStatus = getStatus();
      setStatus(currentStatus);

      if (currentStatus === BridgeStatus.complete) {
        clearInterval(intervalId);
        stopTicker();
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={s.bridgeResultModal}>
      <h3 className={s.title}>Bridge Result</h3>

      <div className={s.selectedChain}>
        <div className={s.selectedChainItem}>
          <p className={s.label}>From</p>
          <div className={s.chain}>
            <span className={s.chainName}>123</span>
          </div>
        </div>

        <div className={s.selectedChainItem}>
          <p className={s.label}>To</p>
          <div className={s.chain}>
            <span className={s.chainName}>123</span>
          </div>
        </div>
      </div>

      <div className={s.resultData}>
        <div className={s.resultDataItem}>
          <p className={s.label}>Token</p>
          <p className={s.value}>{result.symbol}</p>
        </div>
        <div className={s.resultDataItem}>
          <p className={s.label}>Sent Amount</p>
          <p className={s.value}>
            {result.amount} {result.symbol}
          </p>
        </div>
        <div className={s.resultDataItem}>
          <p className={s.label}>Fee</p>
          <p className={s.value}>
            {result.fee} {result.symbol}
          </p>
        </div>
        <div className={cn(s.resultDataItem, s.resultLastLine)}>
          <p className={s.label}>Received Amount</p>
          <p className={s.value}>
            {Number(result.amount) - Number(result.fee)} {result.symbol}
          </p>
        </div>
      </div>

      <div className={s.timeLine}>
        <span
          className={cn(s.timeStatus, { [s.yet]: BridgeStatus.yet === status, [s.complete]: BridgeStatus.complete === status })}
        >
          {status}
        </span>
        <span className={s.elapsedTime}>Elapsed Time: {time}</span>
      </div>

      <Button onClick={handleSubmit} full>
        CLOSE
      </Button>
    </div>
  );
};

export default BridgeResult;
