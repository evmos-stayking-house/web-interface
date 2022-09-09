import React, { FC } from 'react';
import s from './Adjust.module.scss';
import { cn } from '../../../../../utils/style';
import Form from '../../../../common/Form';
import { InputNumber } from '../../../../common/Input';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import useAdjust, { RepayType } from './Adjust.service';
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
    debtPositionType,
    repayType,
    repayAmount,
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
      <span className={cn(s.desc, s.desc__lg)}>
        Add Collateral
        {/*<span style={{ color: '#e20808', marginRight: 5, fontWeight: 800 }}>{equityPositionType}</span> Collateral*/}
      </span>
      <span className={cn(s.desc)}>Available Balance: {numberFormat(evmosBalance, 2)} EVMOS</span>
      <div className={cn(s.adjustPositionWrapper)}>
        {/*<ToggleButtonGroup*/}
        {/*  color="primary"*/}
        {/*  style={{*/}
        {/*    height: 46,*/}
        {/*    justifyItems: 'center',*/}
        {/*    justifyContent: 'center',*/}
        {/*    alignContent: 'center',*/}
        {/*    marginTop: 16,*/}
        {/*    marginRight: 10,*/}
        {/*    borderRadius: 8*/}
        {/*  }}*/}
        {/*  value={equityPositionType}*/}
        {/*  exclusive*/}
        {/*  onChange={handleChangeEquityType}*/}
        {/*  aria-label="Platform">*/}
        {/*  <ToggleButton*/}
        {/*    style={{*/}
        {/*      borderBottomLeftRadius: 8,*/}
        {/*      borderTopLeftRadius: 8,*/}
        {/*      ...{*/}
        {/*        backgroundColor: equityPositionType === PositionType.ADD ? '#e20808' : '#f1f1f1'*/}
        {/*      },*/}
        {/*      ...{ color: equityPositionType === PositionType.ADD ? '#f1f1f1' : '#232323' }*/}
        {/*    }}*/}
        {/*    value={PositionType.ADD}>*/}
        {/*    ADD*/}
        {/*  </ToggleButton>*/}
        {/*  <ToggleButton*/}
        {/*    style={{*/}
        {/*      borderBottomRightRadius: 8,*/}
        {/*      borderTopRightRadius: 8,*/}
        {/*      ...{*/}
        {/*        backgroundColor: equityPositionType === PositionType.REMOVE ? '#e20808' : '#f1f1f1'*/}
        {/*      },*/}
        {/*      ...{ color: equityPositionType === PositionType.REMOVE ? '#f1f1f1' : '#232323' }*/}
        {/*    }}*/}
        {/*    value={PositionType.REMOVE}>*/}
        {/*    REMOVE*/}
        {/*  </ToggleButton>*/}
        {/*</ToggleButtonGroup>*/}
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
        {/*<span style={{ color: '#e20808', marginRight: 5, fontWeight: 800 }}>{debtPositionType}</span> Debt Value*/}
        Add Debt Value
      </span>
      <span className={cn(s.desc)}>Available Balance: {numberFormat(borrowingAssetBalance, 2)} USDC</span>
      <div className={s.adjustPositionWrapper}>
        {/*<ToggleButtonGroup*/}
        {/*  color="primary"*/}
        {/*  disabled={!!repayType}*/}
        {/*  style={{*/}
        {/*    height: 46,*/}
        {/*    justifyItems: 'center',*/}
        {/*    justifyContent: 'center',*/}
        {/*    alignContent: 'center',*/}
        {/*    marginTop: 16,*/}
        {/*    marginRight: 10,*/}
        {/*    borderRadius: 8*/}
        {/*  }}*/}
        {/*  value={debtPositionType}*/}
        {/*  exclusive*/}
        {/*  onChange={handleChangeDebtType}*/}
        {/*  aria-label="Platform">*/}
        {/*  <ToggleButton*/}
        {/*    disabled={!!repayType}*/}
        {/*    style={{*/}
        {/*      borderBottomLeftRadius: 8,*/}
        {/*      borderTopLeftRadius: 8,*/}
        {/*      ...{*/}
        {/*        backgroundColor: !!repayType ? '#666666' : debtPositionType === PositionType.ADD ? '#e20808' : '#f1f1f1'*/}
        {/*      },*/}
        {/*      ...{ color: debtPositionType === PositionType.ADD ? '#f1f1f1' : '#232323' }*/}
        {/*    }}*/}
        {/*    value={PositionType.ADD}>*/}
        {/*    ADD*/}
        {/*  </ToggleButton>*/}
        {/*  <ToggleButton*/}
        {/*    disabled={!!repayType}*/}
        {/*    style={{*/}
        {/*      borderBottomRightRadius: 8,*/}
        {/*      borderTopRightRadius: 8,*/}
        {/*      ...{*/}
        {/*        backgroundColor: !!repayType*/}
        {/*          ? '#666666'*/}
        {/*          : debtPositionType === PositionType.REMOVE*/}
        {/*          ? '#e20808'*/}
        {/*          : '#f1f1f1'*/}
        {/*      },*/}
        {/*      ...{ color: debtPositionType === PositionType.REMOVE ? '#f1f1f1' : '#232323' }*/}
        {/*    }}*/}
        {/*    value={PositionType.REMOVE}>*/}
        {/*    REMOVE*/}
        {/*  </ToggleButton>*/}
        {/*</ToggleButtonGroup>*/}
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

      {/*<span className={cn(s.desc, s.desc__lg)}>*/}
      {/*  Repay{' '}*/}
      {/*  <span style={{ color: '#1b69fb', marginLeft: 5, fontWeight: 800 }}>*/}
      {/*    {repayType === RepayType.EVMOS ? 'EVMOS' : 'USDC'}*/}
      {/*  </span>{' '}*/}
      {/*  <span style={{ fontSize: 10, marginTop: 5, marginLeft: 5 }}>(* Your position value will not be changed )</span>*/}
      {/*</span>*/}
      {/*<div className={s.adjustPositionWrapper}>*/}
      {/*  <ToggleButtonGroup*/}
      {/*    color="primary"*/}
      {/*    style={{*/}
      {/*      height: 46,*/}
      {/*      justifyItems: 'center',*/}
      {/*      justifyContent: 'center',*/}
      {/*      alignContent: 'center',*/}
      {/*      marginTop: 16,*/}
      {/*      marginRight: 10,*/}
      {/*      borderRadius: 8*/}
      {/*    }}*/}
      {/*    value={repayType}*/}
      {/*    exclusive*/}
      {/*    onChange={handleChangeRepayType}*/}
      {/*    aria-label="Platform">*/}
      {/*    <ToggleButton*/}
      {/*      style={{*/}
      {/*        borderBottomLeftRadius: 8,*/}
      {/*        borderTopLeftRadius: 8,*/}
      {/*        ...{ backgroundColor: repayType === RepayType.EVMOS ? '#1b69fb' : '#f1f1f1' },*/}
      {/*        ...{ color: repayType === RepayType.EVMOS ? '#f1f1f1' : '#232323' }*/}
      {/*      }}*/}
      {/*      value={RepayType.EVMOS}>*/}
      {/*      EVMOS*/}
      {/*    </ToggleButton>*/}
      {/*    <ToggleButton*/}
      {/*      style={{*/}
      {/*        borderBottomRightRadius: 8,*/}
      {/*        borderTopRightRadius: 8,*/}
      {/*        ...{ backgroundColor: repayType === RepayType.USDC ? '#1b69fb' : '#f1f1f1' },*/}
      {/*        ...{ color: repayType === RepayType.USDC ? '#f1f1f1' : '#232323' }*/}
      {/*      }}*/}
      {/*      value={RepayType.USDC}>*/}
      {/*      USDC*/}
      {/*    </ToggleButton>*/}
      {/*  </ToggleButtonGroup>*/}
      {/*  <section className={s.adjustPositionContainer}>*/}
      {/*    <img*/}
      {/*      className={s.btnIcon}*/}
      {/*      src={`/img/logo/${repayType ? (repayType === RepayType.EVMOS ? 'evmos' : 'usdc') : 'logo'}.png`}*/}
      {/*      alt={'repay icon'}*/}
      {/*    />*/}
      {/*    <Form.Item label="" className={s.input}>*/}
      {/*      <InputNumber*/}
      {/*        max={(!repayType ? 0 : repayType === RepayType.EVMOS ? position?.debtInBase : '1000000000000000000') + ''}*/}
      {/*        setInputValue={onChangeRepayAmount}*/}
      {/*        inputValue={(repayType === RepayType.EVMOS ? repayAmount.amountInBase : repayAmount.amountInToken) + ''}*/}
      {/*      />*/}
      {/*    </Form.Item>*/}
      {/*    <div className={s.assetName} style={{ marginRight: -15 }}>*/}
      {/*      {repayType ? (repayType === RepayType.EVMOS ? 'EVMOS' : 'USDC') : ''}*/}
      {/*    </div>*/}
      {/*  </section>*/}
      {/*</div>*/}

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
            {/*<span className={s.label}>{!!repayType ? 'Repay' : debtPositionType} Debt Value</span>*/}
            <span className={s.label}>Add Debt Value</span>
            <span className={s.value}>
              {/*{!!repayType && repayType === RepayType.EVMOS && <> {updatedPosition?.debtInBase} EVMOS</>}*/}
              {/*{!!repayType && repayType === RepayType.USDC && (*/}
              {/*  <>*/}
              {/*    {repayAmount.amountInToken} USDC*/}
              {/*    <span style={{ fontSize: 10, marginLeft: 3 }}>(≈ {updatedPosition?.swappedInBase} EVMOS )</span>*/}
              {/*  </>*/}
              {/*)}*/}
              {/*{!repayType && (*/}
              {/*  <>*/}
              {debtInToken} USDC
              <span style={{ fontSize: 10, marginLeft: 3 }}>
                (≈ {Number(updatedPosition?.debtInBase) - Number(position?.debtInBase)} EVMOS )
              </span>
              {/*</>*/}
              {/*)}*/}
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
        <Button className={s.adjustBtn} disabled={false} autoCapitalize={'false'} onClick={() => adjust()}>
          Adjust Position
        </Button>
      </div>
      {/*<Modal*/}
      {/*  open={recommendAdjustModal}*/}
      {/*  onClose={() => setRecommendAdjustModal(!recommendAdjustModal)}*/}
      {/*  aria-labelledby="modal-modal-title"*/}
      {/*  aria-describedby="modal-modal-description"*/}
      {/*  closeAfterTransition*/}
      {/*  BackdropComponent={Backdrop}*/}
      {/*  BackdropProps={{*/}
      {/*    timeout: 500*/}
      {/*  }}>*/}
      {/*  <Box sx={style}>*/}
      {/*    <Typography id="modal-modal-title" variant="h6" component="h2">*/}
      {/*      [Notice]*/}
      {/*    </Typography>*/}
      {/*    <Typography id="modal-modal-description" sx={{ mt: 2 }}>*/}
      {/*      In this case, it is better to follow the recommendation below*/}
      {/*      <br /> <br />*/}
      {/*      [e.g]*/}
      {/*      <br />*/}
      {/*      If Add/Remove Collateral = 100 EVMOS <br />*/}
      {/*      and Remove/Add Debt = -100 USDC(≈50 EVMOS)*/}
      {/*      <br /> Then 50 EVMOS is Locked at uEVMOS.*/}
      {/*      <br />*/}
      {/*      <br />*/}
      {/*      [Recommendation]*/}
      {/*      <br /> You just Add/Remove Collateral = 50 EVMOS*/}
      {/*      <br /> and Repay USDC/EVMOS = 100 USDC(≈50 EVMOS)*/}
      {/*    </Typography>*/}
      {/*  </Box>*/}
      {/*</Modal>*/}
    </div>
  );
};

// const style = {
//   position: 'absolute' as 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 500,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   color: '#232323',
//   boxShadow: 24,
//   p: 4
// };

export default Adjust;
