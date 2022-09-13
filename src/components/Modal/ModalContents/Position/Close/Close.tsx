import React, { FC, SyntheticEvent } from 'react';
import s from './Close.module.scss';
import useClosePosition, { CloseType } from './Close.service';
import { Autocomplete, Box, Button, TextField } from '@mui/material';

interface Props {
  closeModal: VoidFunction;
}

const Close: FC<Props> = ({ closeModal }) => {
  const { result, removePosition, closeType, setCloseType, closePositions } = useClosePosition(closeModal);
  return (
    <div className={s.container}>
      <div className={s.logoContainer}>
        <div className={s.logoContainer__title}>Unstake Position</div>
      </div>
      <div className={s.divider}></div>
      <div className={s.positionDropdownWrapper}>
        <Autocomplete
          sx={{
            width: '100%',
            border: 0,
            background: '#d9d9d9',
            borderRadius: 10
          }}
          options={closePositions}
          disableClearable={true}
          value={closeType}
          getOptionDisabled={(option: string) => option === CloseType.Partial}
          onChange={(e: SyntheticEvent<any>) => setCloseType(e.currentTarget.innerText!)}
          renderInput={(params) => (
            <TextField
              sx={{ borderRadius: 10, borderColor: 'transparent', color: '#d9d9d9' }}
              className={s.dropdown}
              {...params}
            />
          )}
        />
      </div>
      <div className={s.closePositionWrapper}>
        <div className={s.row}>
          <span className={s.row__label}>Converted Position Value Asset</span>
          <span className={s.row__value}>{result?.positionValueInBase} EVMOS</span>
        </div>
        <div className={s.row}>
          <span className={s.row__label}>Debt Value</span>
          <span className={s.row__value}>
            {result?.debtInToken} USDC <span style={{ fontSize: 10 }}>(≈ {result?.debtInBase} EVMOS )</span>
          </span>
        </div>
        <div className={s.row}>
          <span className={s.row__label}>EVMOS Reward you will approximately recieve after 7 days : </span>
          <span className={s.row__value}>≈ {result?.estimated} EVMOS</span>
        </div>
      </div>
      <div className={s.btnWrapper}>
        <Button className={s.unstakeBtn} onClick={() => removePosition()}>
          UNSTAKE
        </Button>
      </div>
    </div>
  );
};

export default Close;
