import React from 'react';
import s from './Adjust.module.scss';
import { cn } from '../../../../../utils/style';
import Form from '../../../../common/Form';
import { InputNumber } from '../../../../common/Input';
import { Dropdown, Input } from '@nextui-org/react';

const Adjust = () => {
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
        <Input type="number" max={2.5} min={1.0} initialValue={'1.0'} />
      </div>
      <div className={s.colSpace}></div>
    </div>
  );
};

export default Adjust;
