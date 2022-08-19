import type { FC } from 'react';
import { useEffect } from 'react';

import s from './LendingDeposit.module.scss';
import Image from 'next/image';
import { InputNumber } from '../../../common/Input';
import Dropdown from '../../../common/Dropdown';
import Form from '../../../common/Form';
import { cn } from '../../../../utils/style';
import Button from '../../../common/Button';

interface Props {
  closeModal?: VoidFunction;
  title: string;
}

const ratioList = [
  {key: '0', item: <><span>0%</span></>},
  {key: '25', item: <><span>25%</span></>},
  {key: '50', item: <><span>50%</span></>},
  {key: '75', item: <><span>75%</span></>},
  {key: '100', item: <><span>100%</span></>}
]

const LendingDeposit: FC<Props> = ({ closeModal, title= 'ATOM' }) => {



  function onClose() {
    closeModal!();
  }

  return (
    <div className={s.container}>
      <div className={s.logoContainer}>
        <div className={s.logoContainer__title}>
          Deposit {title}
        </div>
        <img className={s.logoContainer__logo} src={'/img/logo/cosmos.png'} alt={'cosmos coin logo'}/>
      </div>
      <div className={s.divider}></div>
      <span className={cn(s.desc, s.desc__lg)}>
        Available ATOM Balance: 0.00 ATOM
      </span>
      <Form>
        <section className={s.depositTokenContainer}>
          <Form.Item label="" className={s.input}>
            <InputNumber max={'1000'} setInputValue={() => {}} />
          </Form.Item>
          <div className={s.assetName}>ATOM</div>
          <button className={s.maxBtn}>max</button>
        </section>
      </Form>
      <span className={s.desc}>
        Please note that ibToken exchange rate is not 1:1.
      </span>
      <span className={s.desc}>
        The amount of ibTokens you'll receive is worth the same as the amount of tokens you deposited.
      </span>
      <div className={s.colSpace}></div>
      <span className={cn(s.desc, s.desc__lg)}>
        You will receive
      </span>
      <div className={s.ibTokenContainerWrapper}>
        <section className={s.ibTokenContainer}>
          <Form.Item label="" className={s.input}>
            <InputNumber max={'0'} setInputValue={() => {}} />
          </Form.Item>
          <div className={s.assetName}>ibATOM</div>
        </section>
        <div className={s.confirmBtn}>
          <Button>Confirm</Button>
        </div>
      </div>
    </div>
  );
};

export default LendingDeposit;
