import React from 'react';
import s from './Close.module.scss';
import { cn } from '../../../../../utils/style';
import Form from '../../../../common/Form';
import { InputNumber } from '../../../../common/Input';
import Button from '../../../../common/Button';

const Close = () => {
  return (
    <div className={s.container}>
      <div className={s.logoContainer}>
        <div className={s.logoContainer__title}>Close Position</div>
      </div>
      <div className={s.divider}></div>
      <span className={cn(s.desc, s.desc__lg)}>Available uEVMOS Balance: {''} uEVMOS</span>
      <Form>
        <section className={s.withdrawTokenContainer} onBlur={() => {}}>
          <Form.Item label="" className={s.input}>
            <InputNumber max={''} setInputValue={() => {}} inputValue={''} />
          </Form.Item>
          <div className={s.assetName}>uEVMOS</div>
          <button
            className={s.maxBtn}
            onClick={(e) => {
              e.preventDefault();
              // setMaxAmount();
            }}>
            max
          </button>
        </section>
      </Form>
      <div className={s.colSpace}></div>
      <span className={cn(s.desc, s.desc__lg)}>You will receive</span>
      <div className={s.uEVMOSContainerWrapper}>
        <section className={s.uEVMOSContainer}>
          <Form.Item label="" className={s.input}>
            <InputNumber max={''} setInputValue={() => {}} inputValue={''} />
          </Form.Item>
          <div className={s.assetName} style={{ marginRight: -20 }}>
            EVMOS
          </div>
        </section>
        <div className={s.confirmBtn}>
          <Button onClick={() => {}}>Confirm</Button>
        </div>
      </div>
    </div>
  );
};

export default Close;
