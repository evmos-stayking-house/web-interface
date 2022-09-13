import React from 'react';
import s from './LiquidatedPosition.module.scss';
import useActivePosition from './LiquidatedPosition.service';

const LiquidatedPosition = () => {
  const { liquidatedTxs } = useActivePosition();
  return (
    <div className={s.liquidatedPositionContainer}>
      <div className={s.positionContainerHeader}>
        <div>Pool</div>
        <div className={s.alignToCenter}>Position Size of Liquidation</div>
        <div className={s.alignToCenter}>Returned Amount</div>
      </div>
      <div className={s.positionContainerContents}>
        {liquidatedTxs.length > 0 &&
          liquidatedTxs.map(
            (
              {
                killer,
                user,
                vault,
                share,
                equity,
                debtInBase,
                returnAmount,
                debt,
                positionValue,
                debtRatio,
                safetyBuffer
              },
              index
            ) => (
              <React.Fragment key={index}>
                <div className={s.positionContainerContents__item}>
                  <div className={s.assetInfo}>
                    <img className={s.assetInfo__icon} src={'/img/logo/evmos.png'} alt={'evmos symbol'} />
                    <div className={s.AssetInfo__info}>
                      <p className={s.assetInfo__info__title}>EVMOS</p>
                      <p className={s.assetInfo__info__priceInfo}>Evmos</p>
                    </div>
                  </div>
                </div>
                <div className={s.positionContainerContents__item}>
                  <div className={s.assetInfo}>
                    <div className={s.assetInfo__labelAndValue}>
                      <span className={s.assetInfo__labelAndValue__value}>{positionValue}</span>
                      <span className={s.assetInfo__labelAndValue__label}>{'EVMOS'}</span>
                    </div>
                  </div>
                </div>
                <div className={s.positionContainerContents__item}>
                  <div className={s.assetInfo}>
                    <div className={s.assetInfo__labelAndValue}>
                      <span className={s.assetInfo__labelAndValue__value}>{returnAmount.toFixed(2)}</span>
                      <span className={s.assetInfo__labelAndValue__label}>{'EVMOS'}</span>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            )
          )}
      </div>
      {liquidatedTxs.length === 0 && (
        <>
          <div className={s.positionEmptyContainer}>
            <p>No Liquidated Positions</p>
          </div>
          <p style={{ fontSize: 16, textAlign: 'center' }}>
            ( Only the most recent (latest block height - 10,000) liquidated data is visible )
          </p>
        </>
      )}
    </div>
  );
};

export default LiquidatedPosition;
