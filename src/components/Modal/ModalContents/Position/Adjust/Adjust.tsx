import React, { FC } from 'react';
import s from './Adjust.module.scss';
import { cn } from '../../../../../utils/style';
import Form from '../../../../common/Form';
import { InputNumber } from '../../../../common/Input';
import { Button, TextField } from '@mui/material';
import useAdjust from './Adjust.service';
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
    onChangeDebtInBase,
    setDebtInToken,
    updatedPosition,
    onChangeAmount,
    adjust,
    borrowingAssetBalance,
    deptInToken
  } = useAdjust(closeModal);

  return (
    <div className={s.container}>
      <div className={s.logoContainer}>
        <div className={s.logoContainer__title}>Adjust Position</div>
      </div>
      <div className={s.divider}></div>
      <span className={cn(s.desc, s.desc__lg)}>Add Collateral</span>
      <span className={cn(s.desc)}>Available Balance: {numberFormat(evmosBalance)} EVMOS</span>
      <Form>
        <section className={s.adjustPositionContainer}>
          <img className={s.btnIcon} src={`/img/logo/evmos.png`} alt={'evmos icon'} />
          <Form.Item label="" className={s.input}>
            <InputNumber max={max} setInputValue={onChangeAmount} inputValue={amount} />
          </Form.Item>
          <div className={s.assetName} style={{ marginRight: -26 }}>
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
      </Form>
      <span className={cn(s.desc, s.desc__lg)}>Add Debt Value or Adjust Target Leverage</span>
      <span className={cn(s.desc)}>Available Balance: {borrowingAssetBalance} USDC</span>
      <Form>
        <section className={s.adjustPositionContainer}>
          <img className={s.btnIcon} src={`/img/logo/cosmos.png`} alt={'atom icon'} />
          <Form.Item label="" className={s.input}>
            <InputNumber max={borrowingAssetBalance} setInputValue={setDebtInToken} inputValue={deptInToken} />
          </Form.Item>
          <div className={s.assetName} style={{ marginRight: -30 }}>
            USDC
          </div>
          <button
            className={s.swapBtn}
            onClick={(e) => {
              e.preventDefault();
              setAmount('0');
              onChangeDebtInBase();
            }}>
            Swap
          </button>
        </section>
      </Form>
      {/*<div className={s.leverageContainer}>*/}
      {/*  <span className={cn(s.desc, s.desc__lg)}></span>*/}
      {/*  <Autocomplete*/}
      {/*    value={leverage}*/}
      {/*    onChange={(event: any, newValue: string | null) => {*/}
      {/*      event.preventDefault();*/}
      {/*      onChangeLeverage(newValue);*/}
      {/*    }}*/}
      {/*    id="leverage-adjust-modal"*/}
      {/*    options={['1.0', '1.5', '2.0', '2.5']}*/}
      {/*    style={{ width: 150, background: '#D9D9D9', color: '#4D4545', borderRadius: 8 }}*/}
      {/*    renderInput={(params) => <TextField {...params} variant="outlined" />}*/}
      {/*  />*/}
      {/*</div>*/}
      <div className={s.colSpace}></div>
      <div className={s.adjustSummaryContainer}>
        <div className={s.adjustSummaryContainer__item}>
          <div className={s.adjustSummaryContainer__item__label}>Updated Equity Value</div>
          <div className={s.adjustSummaryContainer__item__value}>
            {position?.equityValue} EVMOS → {updatedPosition?.equityValue} EVMOS
          </div>
        </div>
        <div className={s.adjustSummaryContainer__item}>
          <div className={s.adjustSummaryContainer__item__label}>Updated Debt Value</div>
          <div className={s.adjustSummaryContainer__item__value}>
            {position?.debtInBase} EVMOS → {updatedPosition?.debtInBase} EVMOS
          </div>
        </div>
        <div className={s.adjustSummaryContainer__item}>
          <div className={s.adjustSummaryContainer__item__label}>Updated Debt Ratio</div>
          <div className={s.adjustSummaryContainer__item__value}>
            {position?.deptRatio}% → {updatedPosition?.deptRatio}%
          </div>
        </div>
        <div className={s.adjustSummaryContainer__item}>
          <div className={s.adjustSummaryContainer__item__label}>Updated Safety Buffer</div>
          <div className={s.adjustSummaryContainer__item__value}>
            {position?.safetyBuffer}% → {updatedPosition?.safetyBuffer}%
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
