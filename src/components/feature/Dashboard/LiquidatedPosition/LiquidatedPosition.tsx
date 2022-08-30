import React from 'react';
import s from './LiquidatedPosition.module.scss';
import useActivePosition from './LiquidatedPosition.service';

const LiquidatedPosition = () => {
  const { liquidatedTxs } = useActivePosition();
  return (
    <div className={s.liquidatedPositionContainer}>
      <div className={s.positionContainerHeader}>
        <div>Pool</div>
        <div className={s.alignToCenter}>
          Position
          <br />
          Value
        </div>
        <div className={s.alignToCenter}>
          Debt
          <br />
          Value
        </div>
        <div className={s.alignToCenter}>
          Equity
          <br />
          Value
        </div>
        <div className={s.alignToCenter}>
          Current
          <br />
          APY
        </div>
        <div className={s.alignToCenter}>
          Debt
          <br />
          Ratio
        </div>
        <div className={s.alignToCenter}>
          Liquidation
          <br />
          Threshold
        </div>
        <div className={s.alignToCenter}>
          Safety
          <br />
          Buffer
        </div>
        <div>&nbsp;</div>
      </div>
      {liquidatedTxs.length > 0 && <div className={s.positionEmptyContainer}>The data will be showed up...</div>}
      {liquidatedTxs.length === 0 && <div className={s.positionEmptyContainer}>No data</div>}
    </div>
  );
};

export default LiquidatedPosition;
