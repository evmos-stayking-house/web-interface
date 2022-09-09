import type { FC } from 'react';

import s from './StakeM.module.scss';
import { InputNumber } from '../../../common/Input';
import Form from '../../../common/Form';
import { cn } from '../../../../utils/style';
import useStakeM, { YieldStaking } from './StakeM.service';
import React from 'react';
import { Autocomplete, Box, Button, Slider, styled, TextField } from '@mui/material';
import { numberFormat } from '../../../../utils/numberFormats';
import { LEVERAGE_OPTIONS } from '../../../../config/constants';

interface Props {
  closeModal: VoidFunction;
  parentLeverage: string | null;
  yieldStaking: YieldStaking;
}

const StakeM: FC<Props> = ({ yieldStaking: _yieldStaking, closeModal, parentLeverage }) => {
  const {
    evmosBalance,
    deptInBase,
    positionValue,
    leverage,
    borrowingAsset,
    onChangeLeverage,
    amount,
    setAmount,
    debtInToken,
    stake,
    borrowingAssetBalance,
    onChangeBorrowingAsset,
    renderStakeConfirmModal,
    setMaxAmount,
    yieldStaking,
    onChangeSuppliedAmount
  } = useStakeM(closeModal, parentLeverage, _yieldStaking);

  return (
    <div className={s.container}>
      <div className={s.logoContainer}>
        <div className={s.logoContainer__title}>EVMOS Leveraged Staking</div>
      </div>
      <div className={s.divider}></div>
      <span className={cn(s.desc, s.desc__lg)}>Staking Asset</span>
      <span className={cn(s.desc)}>Available Balance: {numberFormat(evmosBalance, 2)} EVMOS</span>
      <Form>
        <section className={s.depositTokenContainer} onBlur={() => onChangeSuppliedAmount()}>
          <img className={s.btnIcon} src={`/img/logo/evmos.png`} alt={'evmos icon'} />
          <Form.Item label="" className={s.input}>
            <InputNumber max={evmosBalance} setInputValue={setAmount} inputValue={amount} />
          </Form.Item>
          <div className={s.assetName} style={{ marginRight: -20 }}>
            EVMOS
          </div>
          <button
            className={s.maxBtn}
            onClick={(e) => {
              e.preventDefault();
              setMaxAmount();
            }}>
            max
          </button>
        </section>
      </Form>
      <div className={s.colSpace}></div>
      <span className={cn(s.desc, s.desc__lg)}>Borrowing Asset</span>
      <div className={s.ibTokenContainerWrapper}>
        <Autocomplete
          sx={{
            width: '100%',
            border: 0,
            borderColor: 'transparent',
            background: '#D9D9D9',
            color: '#4D4545',
            borderRadius: 3
          }}
          style={{ border: 0 }}
          options={tokens}
          disableClearable={true}
          value={borrowingAsset}
          getOptionLabel={(option) => option}
          getOptionDisabled={(option) => option === 'ATOM' || option === 'OSMO'}
          onChange={onChangeBorrowingAsset}
          autoHighlight
          renderOption={(props, option) => (
            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
              <img loading="lazy" width="20" src={`/img/common/token/${option}.png`} alt="" />
              {option}
            </Box>
          )}
          renderInput={(params) => {
            return (
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', justifyItems: 'center' }}>
                <img
                  loading="lazy"
                  style={{ marginLeft: 8, marginTop: 11 }}
                  width={34}
                  height={34}
                  src={`/img/common/token/${borrowingAsset}.png`}
                  alt=""
                />
                {
                  <TextField
                    sx={{ border: 0, marginLeft: 0 }}
                    {...params}
                    inputProps={{
                      ...params.inputProps
                    }}
                  />
                }
              </Box>
            );
          }}
        />
      </div>
      <span className={cn(s.desc)}>Available Balance: {numberFormat(borrowingAssetBalance, 2)} USDC</span>
      <Form>
        <section className={s.borrowingTokenContainer}>
          <img className={s.btnIcon} src={`/img/common/token/${borrowingAsset || 'USDC'}.png`} alt={'cosmos icon'} />
          <span className={s.input}>{debtInToken}</span>
          <div className={s.assetName}>{borrowingAsset}</div>
        </section>
      </Form>

      <div className={s.sliderContainer}>
        <PrettoSlider
          aria-label="Always visible"
          defaultValue={1.0}
          value={Number(leverage)}
          onChange={async (event: any, newValue: number | number[]) => {
            event.preventDefault();
            await onChangeLeverage((newValue as number)?.toFixed(1));
          }}
          getAriaValueText={(val: number) => `x${val.toFixed(1)}`}
          getAriaLabel={(val: number) => `x${val.toFixed(1)}`}
          step={0.5}
          max={3.0}
          min={1.0}
          marks={LEVERAGE_OPTIONS.map((_leverage) => ({ label: ``, value: Number(_leverage) }))}
          valueLabelDisplay="on"
        />
      </div>
      <div className={s.leverageContainer}>
        <span className={cn(s.desc, s.desc__lg)}>Leverage</span>
        <Autocomplete
          value={leverage || '1.0'}
          disableClearable={true}
          onChange={async (event: any, newValue: string | null) => {
            event.preventDefault();
            await onChangeLeverage(newValue);
          }}
          id="leverage-adjust-modal"
          options={LEVERAGE_OPTIONS}
          style={{ width: 150, background: '#D9D9D9', color: '#4D4545', borderRadius: 8 }}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
      <div className={s.divider}></div>
      <div className={s.summaryWrapper}>
        <div className={s.total}>
          <div className={s.totalRow}>
            <span className={s.totalRow__title}>Expected Total APY/APR</span>
          </div>
          <div className={s.totalRow}>
            <span className={s.totalRow__label}>Expected Staking APR</span>
            <span className={s.totalRow__value}>{yieldStaking.apr}%</span>
          </div>
          <div className={s.totalRow}>
            <span className={s.totalRow__label}>Borrowing Interest</span>
            <span className={s.totalRow__value}>{yieldStaking.borrowingInterest}%</span>
          </div>
          <div className={s.totalRow}>
            <span className={s.totalRow__label}>Expected Total APR</span>
            <span className={s.totalRow__value}>{yieldStaking.totalApr}%</span>
          </div>
          <div className={s.totalRow}>
            <span className={s.totalRow__label}>Expected Total APY</span>
            <span className={s.totalRow__value}>{yieldStaking.apy}%</span>
          </div>
        </div>
        <div className={s.summary}>
          <div className={s.summaryRow}>
            <span className={s.summaryRow__title}>Summary</span>
          </div>
          <div className={s.summaryRow}>
            <span className={s.summaryRow__label}>Asset Supplied</span>
            <span className={s.summaryRow__value}>{Number(amount).toFixed(1)} EVMOS</span>
          </div>
          <div className={s.summaryRow}>
            <span className={s.summaryRow__label}>Asset Borrowed</span>
            <span className={s.summaryRow__value}>
              {debtInToken} USDC <span style={{ fontSize: 10 }}>(≈ {deptInBase} EVMOS )</span>
            </span>
          </div>
          <div className={s.summaryRow}>
            <span className={s.summaryRow__label}>Total Position Value</span>
            <span className={s.summaryRow__value}>{positionValue} EVMOS</span>
          </div>
        </div>
      </div>
      <div className={s.btnWrapper}>
        <Button className={s.stakeBtn} onClick={() => stake()}>
          STAKE
        </Button>
      </div>
      {renderStakeConfirmModal()}
    </div>
  );
};

const PrettoSlider = styled(Slider)({
  color: '#52af77',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none'
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit'
    },
    '&:before': {
      display: 'none'
    }
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)'
    },
    '& > *': {
      transform: 'rotate(45deg)'
    }
  }
});

const tokens: readonly string[] = ['USDC', 'ATOM', 'OSMO'];

export default StakeM;
