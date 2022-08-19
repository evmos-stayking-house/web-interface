import type { FC } from 'react';

import s from './LendingDeposit.module.scss';
import { InputNumber } from '../../../common/Input';
import Form from '../../../common/Form';
import { cn } from '../../../../utils/style';
import Button from '../../../common/Button';
import useLendingDeposit from './LendingDeposit.Service';

interface Props {
  title: string;
  closeModal: VoidFunction;
}

const LendingDeposit: FC<Props> = ({ title, closeModal }) => {

  const { deposit, amount, share, setAmount, tokenBalance, setMaxAmount, amountToShare } = useLendingDeposit(closeModal);

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
        Available ATOM Balance: {tokenBalance} ATOM
      </span>
      <Form>
        <section className={s.depositTokenContainer} onBlur={() => amountToShare()}>
          <Form.Item label="" className={s.input}>
            <InputNumber max={tokenBalance} setInputValue={setAmount} inputValue={amount} />
          </Form.Item>
          <div className={s.assetName}>ATOM</div>
          <button className={s.maxBtn} onClick={(e)=> {
            e.preventDefault();
            setMaxAmount();
          }}>max</button>
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
            <InputNumber max={share} setInputValue={() => {}} inputValue={share} />
          </Form.Item>
          <div className={s.assetName}>ibATOM</div>
        </section>
        <div className={s.confirmBtn}>
          <Button onClick={() => deposit()}>Confirm</Button>
        </div>
      </div>
    </div>
  );
};

export default LendingDeposit;
