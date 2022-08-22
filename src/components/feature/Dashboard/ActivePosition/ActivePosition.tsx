import React, { FC, useEffect } from 'react';
import s from './ActivePosition.module.scss';
import useActivePosition from './ActivePosition.service';
import { cn } from '../../../../utils/style';

interface Props {
  address: string;
}

const ActivePosition: FC<Props> = ({ address }) => {
  const { position } = useActivePosition(address);

  return (
    <div className={s.activePositionContainer}>
      <div className={s.positionContainerHeader}>
        <div>Pool</div>
        <div className={s.alignToCenter}>
          Position
          <br />
          Value
        </div>
        <div className={s.alignToCenter}>
          Dept
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
          Dept
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
      <div className={s.positionContainerContents}>
        {position.length > 0 &&
          position.map(
            ({ debtInBase, positionValueInBase, equityValue, deptRatio, killFactor, safetyBuffer }, index) => (
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
                      <span className={s.assetInfo__labelAndValue__value}>{positionValueInBase}</span>
                      <span className={s.assetInfo__labelAndValue__label}>{'EVMOS'}</span>
                    </div>
                  </div>
                </div>
                <div className={s.positionContainerContents__item}>
                  <div className={s.assetInfo}>
                    <div className={s.assetInfo__labelAndValue}>
                      <span className={s.assetInfo__labelAndValue__value}>{debtInBase}</span>
                      <span className={s.assetInfo__labelAndValue__label}>{'EVMOS'}</span>
                    </div>
                  </div>
                </div>
                <div className={s.positionContainerContents__item}>
                  <div className={s.assetInfo}>
                    <div className={s.assetInfo__labelAndValue}>
                      <span className={s.assetInfo__labelAndValue__value}>{equityValue}</span>
                      <span className={s.assetInfo__labelAndValue__label}>{'EVMOS'}</span>
                    </div>
                  </div>
                </div>
                <div className={s.positionContainerContents__item}>
                  <div className={s.assetInfo}>
                    <div className={s.assetInfo__labelAndValue}>
                      <span className={s.assetInfo__labelAndValue__value}>{'TBD'}</span>
                    </div>
                  </div>
                </div>
                <div className={s.positionContainerContents__item}>
                  <div className={s.assetInfo}>
                    <div className={s.assetInfo__labelAndValue}>
                      <span className={s.assetInfo__labelAndValue__value}>{deptRatio}</span>
                      <span className={s.assetInfo__labelAndValue__label}>{'%'}</span>
                    </div>
                  </div>
                </div>
                <div className={s.positionContainerContents__item}>
                  <div className={s.assetInfo}>
                    <div className={s.assetInfo__labelAndValue}>
                      <span className={s.assetInfo__labelAndValue__value}>{killFactor}</span>
                      <span className={s.assetInfo__labelAndValue__label}>{'%'}</span>
                    </div>
                  </div>
                </div>
                <div className={s.positionContainerContents__item}>
                  <div className={s.assetInfo}>
                    <div className={s.assetInfo__labelAndValue}>
                      <span className={s.assetInfo__labelAndValue__value}>{safetyBuffer}</span>
                      <span className={s.assetInfo__labelAndValue__label}>{'%'}</span>
                    </div>
                  </div>
                </div>
                <div className={s.positionContainerContents__item}>
                  <div className={s.buttonGroup}>
                    <div
                      className={cn(s.buttonGroup__adjustPositionBtn, { [s.buttonGroup__enabled]: true })}
                      onClick={() => {}}>
                      Adjust Position
                    </div>
                    <div
                      className={cn(s.buttonGroup__closePositionBtn, { [s.buttonGroup__enabled]: true })}
                      onClick={() => {}}>
                      Close Position
                    </div>
                  </div>
                </div>
              </React.Fragment>
            )
          )}
      </div>
      {position.length === 0 && <div className={s.positionEmptyContainer}>No Active Positions</div>}
    </div>
  );
};

export default ActivePosition;
