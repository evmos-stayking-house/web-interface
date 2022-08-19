import type { FC } from 'react';

import s from './LendingWithdraw.module.scss';
import { InputNumber } from '../../../common/Input';
import Form from '../../../common/Form';
import { cn } from '../../../../utils/style';
import Button from '../../../common/Button';
import useLendingWithdraw from './LendingWithdraw.Service';

interface Props {
  title: string;
  closeModal: VoidFunction;
}

const LendingWithdraw: FC<Props> = ({ title, closeModal }) => {
  const { withdraw, amount, ibTokenBalance, ibTokenWithdraw, setMaxAmount, shareToAmount, setIbTokenWithdraw } =
    useLendingWithdraw(closeModal);

  return (
    <div className={s.container}>
      <div className={s.logoContainer}>
        <div className={s.logoContainer__title}>Withdraw {title}</div>
        <img className={s.logoContainer__logo} src={'/img/logo/cosmos.png'} alt={'cosmos coin logo'} />
      </div>
      <div className={s.divider}></div>
      <span className={cn(s.desc, s.desc__lg)}>Available ibATOM Balance: {ibTokenBalance} ibATOM</span>
      <Form>
        <section className={s.depositTokenContainer} onBlur={() => shareToAmount()}>
          <Form.Item label="" className={s.input}>
            <InputNumber max={ibTokenBalance} setInputValue={setIbTokenWithdraw} inputValue={ibTokenWithdraw} />
          </Form.Item>
          <div className={s.assetName}>ibATOM</div>
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
      <span className={cn(s.desc, s.desc__lg)}>You will receive</span>
      <div className={s.ibTokenContainerWrapper}>
        <section className={s.ibTokenContainer}>
          <Form.Item label="" className={s.input}>
            <InputNumber max={amount} setInputValue={() => {}} inputValue={amount} />
          </Form.Item>
          <div className={s.assetName}>ATOM</div>
        </section>
        <div className={s.confirmBtn}>
          <Button onClick={() => withdraw()}>Confirm</Button>
        </div>
      </div>
    </div>
  );
};

export default LendingWithdraw;
