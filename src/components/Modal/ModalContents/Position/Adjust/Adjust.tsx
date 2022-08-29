import React, { FC } from 'react';
import s from './Adjust.module.scss';
import { cn } from '../../../../../utils/style';
import Form from '../../../../common/Form';
import { InputNumber } from '../../../../common/Input';
import { Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import useAdjust, { PositionType, RepayType } from './Adjust.service';
import { numberFormat } from '../../../../../utils/numberFormats';

interface Props {
  closeModal: VoidFunction;
}

const Adjust: FC<Props> = ({ closeModal }) => {
  const {
    evmosBalance,
    max,
    amount,
    setAmount,
    position,
    onChangeDebtInToken,
    updatedPosition,
    onChangeAmount,
    adjust,
    borrowingAssetBalance,
    debtInToken,
    equityPositionType,
    handleChangeEquityType,
    debtPositionType,
    handleChangeDebtType,
    repayType,
    handleChangeRepayType
  } = useAdjust(closeModal);

  return (
    <div className={s.container}>
      <div className={s.logoContainer}>
        <div className={s.logoContainer__title}>Adjust Position</div>
      </div>
      <div className={s.divider}></div>
      <span className={cn(s.desc, s.desc__lg)}>
        <span style={{ color: '#e20808', marginRight: 5, fontWeight: 800 }}>{equityPositionType}</span> Collateral
      </span>
      <span className={cn(s.desc)}>Available Balance: {numberFormat(evmosBalance)} EVMOS</span>
      <div className={s.adjustPositionWrapper}>
        <ToggleButtonGroup
          color="primary"
          style={{
            height: 46,
            justifyItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            marginTop: 16,
            marginRight: 10,
            borderRadius: 8
          }}
          value={equityPositionType}
          exclusive
          onChange={handleChangeEquityType}
          aria-label="Platform">
          <ToggleButton
            style={{
              borderBottomLeftRadius: 8,
              borderTopLeftRadius: 8,
              ...{ backgroundColor: equityPositionType === PositionType.ADD ? '#e20808' : '#f1f1f1' },
              ...{ color: equityPositionType === PositionType.ADD ? '#f1f1f1' : '#232323' }
            }}
            value={PositionType.ADD}>
            ADD
          </ToggleButton>
          <ToggleButton
            style={{
              borderBottomRightRadius: 8,
              borderTopRightRadius: 8,
              ...{ backgroundColor: equityPositionType === PositionType.REMOVE ? '#e20808' : '#f1f1f1' },
              ...{ color: equityPositionType === PositionType.REMOVE ? '#f1f1f1' : '#232323' }
            }}
            value={PositionType.REMOVE}>
            REMOVE
          </ToggleButton>
        </ToggleButtonGroup>
        <section className={s.adjustPositionContainer}>
          <img className={s.btnIcon} src={`/img/logo/evmos.png`} alt={'evmos icon'} />
          <Form.Item label="" className={s.input}>
            <InputNumber max={max} setInputValue={onChangeAmount} inputValue={amount} />
          </Form.Item>
          <div className={s.assetName} style={{ marginRight: -10 }}>
            EVMOS
          </div>
          <button
            className={s.maxBtn}
            onClick={(e) => {
              e.preventDefault();
              setAmount(evmosBalance);
            }}>
            Max
          </button>
        </section>
      </div>
      <span className={cn(s.desc, s.desc__lg)}>
        <span style={{ color: '#e20808', marginRight: 5, fontWeight: 800 }}>{debtPositionType}</span> Debt Value
      </span>
      <span className={cn(s.desc)}>Available Balance: {borrowingAssetBalance} USDC</span>
      <div className={s.adjustPositionWrapper}>
        <ToggleButtonGroup
          color="primary"
          style={{
            height: 46,
            justifyItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            marginTop: 16,
            marginRight: 10,
            borderRadius: 8
          }}
          value={debtPositionType}
          exclusive
          onChange={handleChangeDebtType}
          aria-label="Platform">
          <ToggleButton
            style={{
              borderBottomLeftRadius: 8,
              borderTopLeftRadius: 8,
              ...{ backgroundColor: debtPositionType === PositionType.ADD ? '#e20808' : '#f1f1f1' },
              ...{ color: debtPositionType === PositionType.ADD ? '#f1f1f1' : '#232323' }
            }}
            value={PositionType.ADD}>
            ADD
          </ToggleButton>
          <ToggleButton
            style={{
              borderBottomRightRadius: 8,
              borderTopRightRadius: 8,
              ...{ backgroundColor: debtPositionType === PositionType.REMOVE ? '#e20808' : '#f1f1f1' },
              ...{ color: debtPositionType === PositionType.REMOVE ? '#f1f1f1' : '#232323' }
            }}
            value={PositionType.REMOVE}>
            REMOVE
          </ToggleButton>
        </ToggleButtonGroup>
        <section className={s.adjustPositionContainer}>
          <img className={s.btnIcon} src={`/img/logo/usdc.png`} alt={'usdc icon'} />
          <Form.Item label="" className={s.input}>
            <InputNumber max={borrowingAssetBalance} setInputValue={onChangeDebtInToken} inputValue={debtInToken} />
          </Form.Item>
          <div className={s.assetName} style={{ marginRight: -15 }}>
            USDC
          </div>
        </section>
      </div>
      <span className={cn(s.desc, s.desc__lg)}>
        Repay <span style={{ color: '#1b69fb', marginLeft: 5, fontWeight: 800 }}>{repayType}</span>{' '}
        <span style={{ fontSize: 10, marginTop: 5, marginLeft: 5 }}>(* Your position value will not be changed )</span>
      </span>
      <div className={s.adjustPositionWrapper}>
        <ToggleButtonGroup
          color="primary"
          style={{
            height: 46,
            justifyItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            marginTop: 16,
            marginRight: 10,
            borderRadius: 8
          }}
          value={repayType}
          exclusive
          onChange={handleChangeRepayType}
          aria-label="Platform">
          <ToggleButton
            style={{
              borderBottomLeftRadius: 8,
              borderTopLeftRadius: 8,
              ...{ backgroundColor: repayType === RepayType.EQUITY ? '#1b69fb' : '#f1f1f1' },
              ...{ color: repayType === RepayType.EQUITY ? '#f1f1f1' : '#232323' }
            }}
            value={RepayType.EQUITY}>
            EQUITY
          </ToggleButton>
          <ToggleButton
            style={{
              borderBottomRightRadius: 8,
              borderTopRightRadius: 8,
              ...{ backgroundColor: repayType === RepayType.DEBT ? '#1b69fb' : '#f1f1f1' },
              ...{ color: repayType === RepayType.DEBT ? '#f1f1f1' : '#232323' }
            }}
            value={RepayType.DEBT}>
            DEBT
          </ToggleButton>
        </ToggleButtonGroup>
        <section className={s.adjustPositionContainer}>
          <img
            className={s.btnIcon}
            src={`/img/logo/${repayType === RepayType.EQUITY ? 'evmos' : 'usdc'}.png`}
            alt={'repay icon'}
          />
          <Form.Item label="" className={s.input}>
            <InputNumber max={borrowingAssetBalance} setInputValue={onChangeDebtInToken} inputValue={debtInToken} />
          </Form.Item>
          <div className={s.assetName} style={{ marginRight: -15 }}>
            {repayType === RepayType.EQUITY ? 'EVMOS' : 'USDC'}
          </div>
        </section>
      </div>

      <div className={s.colSpace}></div>
      <div className={s.adjustSummaryContainer}>
        <div className={s.adjustSummaryContainer__item}>
          <div className={s.adjustSummaryContainer__item__left}>
            <span className={s.label}>Equity Value</span>
            <span className={s.value}>{position?.equityValue} EVMOS</span>
          </div>
          <div className={s.adjustSummaryContainer__item__center}>►</div>
          <div className={s.adjustSummaryContainer__item__right}>
            <span className={s.label}>Updated Equity Value</span>
            <span className={s.value}>{updatedPosition?.equityValue} EVMOS</span>
          </div>
        </div>
        <div className={s.adjustSummaryContainer__item}>
          <div className={s.adjustSummaryContainer__item__left}>
            <span className={s.label}>Debt Value</span>
            <span className={s.value}>{position?.debtInBase} EVMOS</span>
          </div>
          <div className={s.adjustSummaryContainer__item__center}>►</div>
          <div className={s.adjustSummaryContainer__item__right}>
            <span className={s.label}>{debtPositionType} Debt Value</span>
            <span className={s.value}>
              {debtInToken} USDC
              <span style={{ fontSize: 10, marginLeft: 3 }}>
                (≈ {Number(updatedPosition?.debtInBase) - Number(position?.debtInBase)} EVMOS )
              </span>
            </span>
          </div>
        </div>
        <div className={s.adjustSummaryContainer__item}>
          <div className={s.adjustSummaryContainer__item__left}>
            <span className={s.label}>Debt Ratio</span>
            <span className={s.value}>{position?.deptRatio} %</span>
          </div>
          <div className={s.adjustSummaryContainer__item__center}>►</div>
          <div className={s.adjustSummaryContainer__item__right}>
            <span className={s.label}>Updated Debt Ratio</span>
            <span className={s.value}>{updatedPosition?.deptRatio} %</span>
          </div>
        </div>
        <div className={s.adjustSummaryContainer__item}>
          <div className={s.adjustSummaryContainer__item__left}>
            <span className={s.label}>Safety Buffer</span>
            <span className={s.value}>{position?.safetyBuffer} %</span>
          </div>
          <div className={s.adjustSummaryContainer__item__center}>►</div>
          <div className={s.adjustSummaryContainer__item__right}>
            <span className={s.label}>Updated Safety Buffer</span>
            <span className={s.value}>{updatedPosition?.safetyBuffer} %</span>
          </div>
        </div>
      </div>

      <div className={s.summaryWrapper}>
        <div className={s.total}>
          <div className={s.totalRow}>
            <span className={s.totalRow__title}>Total APY/APR</span>
          </div>
          <div className={s.totalRow}>
            <span className={s.totalRow__label}>Yield Staking</span>
            <span className={s.totalRow__value}>TBD</span>
          </div>
          <div className={s.totalRow}>
            <span className={s.totalRow__label}>Borrowing Interest</span>
            <span className={s.totalRow__value}>TBD</span>
          </div>
          <div className={s.totalRow}>
            <span className={s.totalRow__label}>Total APR</span>
            <span className={s.totalRow__value}>TBD</span>
          </div>
          <div className={s.totalRow}>
            <span className={s.totalRow__label}>Total APY</span>
            <span className={s.totalRow__value}>TBD</span>
          </div>
        </div>
        <div className={s.summary}>
          <div className={s.summaryRow}>
            <span className={s.summaryRow__title}>Summary</span>
          </div>
          <div className={s.summaryRow}>
            <span className={s.summaryRow__label}>Asset Supplied</span>
            <span className={s.summaryRow__value}>{updatedPosition?.equityValue} EVMOS</span>
          </div>
          <div className={s.summaryRow}>
            <span className={s.summaryRow__label}>Asset Borrowed</span>
            <span className={s.summaryRow__value}>{updatedPosition?.debtInBase} EVMOS</span>
          </div>
          <div className={s.summaryRow}>
            <span className={s.summaryRow__label}>Total Position Value</span>
            <span className={s.summaryRow__value}>{updatedPosition?.positionValueInBase} EVMOS</span>
          </div>
        </div>
      </div>
      <div className={s.btnWrapper}>
        <Button className={s.adjustBtn} autoCapitalize={'false'} onClick={() => adjust()}>
          Adjust Position
        </Button>
      </div>
    </div>
  );
};
export default Adjust;
