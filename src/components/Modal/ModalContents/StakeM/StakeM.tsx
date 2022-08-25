import type { FC } from 'react';

import s from './StakeM.module.scss';
import { InputNumber } from '../../../common/Input';
import Form from '../../../common/Form';
import { cn } from '../../../../utils/style';
import useStakeM from './StakeM.service';
import React from 'react';
import { Autocomplete, Box, Button, TextField } from '@mui/material';
import { numberFormat } from '../../../../utils/numberFormats';
import { LEVERAGE_OPTIONS } from '../../../../config/constants';

interface Props {
  closeModal: VoidFunction;
  parentLeverage: string | null;
}

const StakeM: FC<Props> = ({ closeModal, parentLeverage }) => {
  const {
    evmosBalance,
    deptInBase,
    positionValue,
    leverage,
    borrowingAsset,
    onChangeLeverage,
    amount,
    setAmount,
    deptInToken,
    stake,
    borrowingAssetBalance,
    onChangeBorrowingAsset,
    renderStakeConfirmModal,
    setMaxAmount,
    onChangeSuppliedAmount
  } = useStakeM(closeModal, parentLeverage);

  return (
    <div className={s.container}>
      <div className={s.logoContainer}>
        <div className={s.logoContainer__title}>EVMOS Leveraged Staking</div>
      </div>
      <div className={s.divider}></div>
      <span className={cn(s.desc, s.desc__lg)}>Staking Asset</span>
      <span className={cn(s.desc)}>Available Balance: {numberFormat(evmosBalance)} EVMOS</span>
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
      <span className={cn(s.desc)}>Available Balance: {numberFormat(borrowingAssetBalance)} USDC</span>
      <Form>
        <section className={s.borrowingTokenContainer}>
          <img className={s.btnIcon} src={`/img/common/token/${borrowingAsset || 'USDC'}.png`} alt={'cosmos icon'} />
          <span className={s.input}>{deptInToken}</span>
          <div className={s.assetName}>{borrowingAsset}</div>
        </section>
      </Form>
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
          renderInput={(params) => <TextField {...params} variant="outlined" />}
        />
      </div>
      <div className={s.divider}></div>
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
            <span className={s.summaryRow__value}>{Number(amount).toFixed(1)} EVMOS</span>
          </div>
          <div className={s.summaryRow}>
            <span className={s.summaryRow__label}>Asset Borrowed</span>
            <span className={s.summaryRow__value}>
              {deptInToken} USDC <span style={{ fontSize: 10 }}>(≈ {deptInBase} EVMOS )</span>
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

const tokens: readonly string[] = ['USDC', 'ATOM', 'OSMO'];

export default StakeM;
