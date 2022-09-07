import React from 'react';
import s from './LiquidatedPosition.module.scss';
import useActivePosition from './LiquidatedPosition.service';
import { cn } from '../../../../utils/style';
import { numberFormat } from '../../../../utils/numberFormats';

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
          Over
          <br />
          Ratio
        </div>
        <div>&nbsp;</div>
      </div>
      <div className={s.positionContainerContents}>
        {liquidatedTxs.length > 0 &&
          liquidatedTxs.map(
            (
              { killer, user, vault, share, equity, debtInBase, debt, positionValue, debtRatio, safetyBuffer },
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
                      <span className={s.assetInfo__labelAndValue__value}>{numberFormat(String(debtInBase), 1)}</span>
                      <span className={s.assetInfo__labelAndValue__label}>{'EVMOS'}</span>
                    </div>
                  </div>
                </div>
                <div className={s.positionContainerContents__item}>
                  <div className={s.assetInfo}>
                    <div className={s.assetInfo__labelAndValue}>
                      <span className={s.assetInfo__labelAndValue__value}>{numberFormat(String(equity), 1)}</span>
                      <span className={s.assetInfo__labelAndValue__label}>{'EVMOS'}</span>
                    </div>
                  </div>
                </div>
                <div className={s.positionContainerContents__item}>
                  <div className={s.assetInfo}>
                    <div className={s.assetInfo__labelAndValue}>
                      <span className={s.assetInfo__labelAndValue__value}>{debtRatio?.toFixed(1)}</span>
                      <span className={s.assetInfo__labelAndValue__label}>{'%'}</span>
                    </div>
                  </div>
                </div>
                <div className={s.positionContainerContents__item}>
                  <div className={s.assetInfo}>
                    <div className={s.assetInfo__labelAndValue}>
                      <span className={s.assetInfo__labelAndValue__value}>{75}</span>
                      <span className={s.assetInfo__labelAndValue__label}>{'%'}</span>
                    </div>
                  </div>
                </div>
                <div className={s.positionContainerContents__item}>
                  <div className={s.assetInfo}>
                    <div className={s.assetInfo__labelAndValue}>
                      <span className={s.assetInfo__labelAndValue__value}>{(Number(debtRatio) - 75).toFixed(1)}</span>
                      <span className={s.assetInfo__labelAndValue__label}>{'%'}</span>
                    </div>
                  </div>
                </div>
                <div className={s.positionContainerContents__item}>Killed</div>
              </React.Fragment>
            )
          )}
      </div>
      {liquidatedTxs.length === 0 && (
        <>
          <div className={s.positionEmptyContainer}>
            <p>No data</p>
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
