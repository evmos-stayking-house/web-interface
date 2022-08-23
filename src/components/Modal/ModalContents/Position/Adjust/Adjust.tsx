import React from 'react';
import s from './Adjust.module.scss';
import { cn } from '../../../../../utils/style';
import Form from '../../../../common/Form';
import { InputNumber } from '../../../../common/Input';
import { Autocomplete, Button, TextField } from '@mui/material';
import useAdjust from './Adjust.service';

const Adjust = () => {
  const { leverage, setLeverage } = useAdjust();

  return (
    <div className={s.container}>
      <div className={s.logoContainer}>
        <div className={s.logoContainer__title}>Adjust Position</div>
      </div>
      <div className={s.divider}></div>
      <span className={cn(s.desc, s.desc__lg)}>Add Collateral</span>
      <span className={cn(s.desc)}>Available Balance: {0} EVMOS</span>
      <Form>
        <section className={s.adjustPositionContainer} onBlur={() => {}}>
          <img className={s.btnIcon} src={`/img/logo/evmos.png`} alt={'evmos icon'} />
          <Form.Item label="" className={s.input}>
            <InputNumber max={'0'} setInputValue={() => {}} inputValue={'0'} />
          </Form.Item>
          <div className={s.assetName}>EVMOS</div>
          <button
            className={s.maxBtn}
            onClick={(e) => {
              e.preventDefault();
            }}>
            max
          </button>
        </section>
      </Form>
      <span className={cn(s.desc, s.desc__lg)}>Add Debt Value or Adjust Target Leverage</span>
      <span className={cn(s.desc)}>Available Balance: {0} ATOM</span>
      <Form>
        <section className={s.adjustPositionContainer} onBlur={() => {}}>
          <img className={s.btnIcon} src={`/img/logo/cosmos.png`} alt={'atom icon'} />
          <Form.Item label="" className={s.input}>
            <InputNumber max={'0'} setInputValue={() => {}} inputValue={'0'} />
          </Form.Item>
          <div className={s.assetName} style={{ marginRight: -30 }}>
            ATOM
          </div>
        </section>
      </Form>
      <div className={s.leverageContainer}>
        <span className={cn(s.desc, s.desc__lg)}></span>
        <Autocomplete
          value={leverage}
          onChange={(event: any, newValue: string | null) => {
            event.preventDefault();
            setLeverage(newValue);
          }}
          id="leverage-adjust-modal"
          options={['1.0', '1.5', '2.0', '2.5']}
          style={{ width: 150, background: '#D9D9D9', color: '#4D4545', borderRadius: 8 }}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
        />
      </div>
      <div className={s.colSpace}></div>
      <div className={s.adjustSummaryContainer}>
        <div className={s.adjustSummaryContainer__item}>
          <div className={s.adjustSummaryContainer__item__label}>Updated Equity Value</div>
          <div className={s.adjustSummaryContainer__item__value}>0.00 EVMOS → 0.00 EVMOS</div>
        </div>
        <div className={s.adjustSummaryContainer__item}>
          <div className={s.adjustSummaryContainer__item__label}>Updated Debt Value</div>
          <div className={s.adjustSummaryContainer__item__value}>0.00 ATOM → 0.00 ATOM</div>
        </div>
        <div className={s.adjustSummaryContainer__item}>
          <div className={s.adjustSummaryContainer__item__label}>Updated Debt Ratio</div>
          <div className={s.adjustSummaryContainer__item__value}>0.00% → 0.00%</div>
        </div>
        <div className={s.adjustSummaryContainer__item}>
          <div className={s.adjustSummaryContainer__item__label}>Updated Safety Buffer</div>
          <div className={s.adjustSummaryContainer__item__value}>0.00% → 0.00%</div>
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
            <span className={s.summaryRow__value}>{''} EVMOS</span>
          </div>
          <div className={s.summaryRow}>
            <span className={s.summaryRow__label}>Asset Borrowed</span>
            <span className={s.summaryRow__value}>{''} EVMOS</span>
          </div>
          <div className={s.summaryRow}>
            <span className={s.summaryRow__label}>Total Position Value</span>
            <span className={s.summaryRow__value}>{''} EVMOS</span>
          </div>
        </div>
      </div>
      <div className={s.btnWrapper}>
        <Button className={s.adjustBtn} autoCapitalize={'false'} onClick={() => {}}>
          Adjust Position
        </Button>
      </div>
    </div>
  );
};

export default Adjust;
