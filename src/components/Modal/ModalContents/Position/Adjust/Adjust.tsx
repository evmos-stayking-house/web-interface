import React, { FC } from 'react';
import s from './Adjust.module.scss';
import { cn } from '../../../../../utils/style';
import Form from '../../../../common/Form';
import { InputNumber } from '../../../../common/Input';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  OutlinedInput
} from '@mui/material';
import useAdjust, { RepayType } from './Adjust.service';
import { numberFormat } from '../../../../../utils/numberFormats';

interface Props {
  closeModal: VoidFunction;
}

const Adjust: FC<Props> = ({ closeModal }) => {
  const {
    evmosBalance,
    amount,
    setAmount,
    onEventChangeAmount,
    position,
    onEventChangeDebtInToken,
    updatedPosition,
    adjust,
    borrowingAssetBalance,
    debtInToken,
    yieldStaking,
    noticePopupOpen,
    handleNoticePopup,
    approve
  } = useAdjust(closeModal);

  return (
    <div className={s.container}>
      <Dialog
        open={noticePopupOpen}
        onClose={() => handleNoticePopup(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">{'[Notice] Would you like to proceed this way?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            In order to repay debts in token, You need to approve first.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => approve()} autoFocus>
            Approve
          </Button>
        </DialogActions>
      </Dialog>
      <div className={s.logoContainer}>
        <div className={s.logoContainer__title}>Adjust Position</div>
      </div>
      <div className={s.divider}></div>
      <span className={cn(s.desc, s.desc__lg)}>Add Collateral</span>
      <span className={cn(s.desc)}>Available Balance: {numberFormat(evmosBalance, 2)} EVMOS</span>
      <div className={cn(s.adjustPositionWrapper)}>
        <section className={s.adjustPositionContainer}>
          <img className={s.btnIcon} src={`/img/logo/evmos.png`} alt={'evmos icon'} />
          <Form.Item label="" className={s.input}>
            <OutlinedInput
              value={amount}
              type="number"
              inputProps={{ pattern: '[0-9]*' }}
              onChange={onEventChangeAmount}
              aria-describedby="outlined-weight-helper-text"
              sx={{
                color: '#f1f1f1',
                width: '100%',
                marginTop: -1.5,
                marginLeft: -0.5
              }}
            />
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
      <span className={cn(s.desc, s.desc__lg)}>Add Debt Value</span>
      <span className={cn(s.desc)}>Available Balance: {numberFormat(borrowingAssetBalance, 2)} USDC</span>
      <div className={s.adjustPositionWrapper}>
        <section className={s.adjustPositionContainer}>
          <img className={s.btnIcon} src={`/img/logo/usdc.png`} alt={'usdc icon'} />
          <Form.Item label="" className={s.input}>
            <OutlinedInput
              value={debtInToken}
              type="number"
              inputProps={{ pattern: '[0-9]*' }}
              onChange={onEventChangeDebtInToken}
              aria-describedby="outlined-weight-helper-text"
              sx={{
                color: '#f1f1f1',
                width: '100%',
                marginTop: -1.5,
                marginLeft: -0.5
              }}
            />
          </Form.Item>
          <div className={s.assetName} style={{ marginRight: -15 }}>
            USDC
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
            <span className={s.label}>Add Debt Value</span>
            <span className={s.value}>
              {debtInToken} USDC
              <span style={{ fontSize: 10, marginLeft: 3 }}>
                (≈{' '}
                {Number(updatedPosition?.debtInBase) - Number(position?.debtInBase) < 0
                  ? 0
                  : (Number(updatedPosition?.debtInBase) - Number(position?.debtInBase)).toFixed(4)}{' '}
                EVMOS )
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
        <Button
          className={s.adjustBtn}
          disabled={Number(updatedPosition?.deptRatio) > Number(updatedPosition?.killFactor)}
          style={{
            backgroundColor:
              Number(updatedPosition?.deptRatio) > Number(updatedPosition?.killFactor) ? 'gray' : '#111827'
          }}
          autoCapitalize={'false'}
          onClick={() => adjust()}>
          Adjust Position
        </Button>
      </div>
    </div>
  );
};

export default Adjust;
