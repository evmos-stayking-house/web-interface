import React from 'react';
import s from './LiquidatedPosition.module.scss';

const LiquidatedPosition = () => {
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
      <div className={s.positionEmptyContainer}>Coming Soon</div>
    </div>
  );
};

export default LiquidatedPosition;
