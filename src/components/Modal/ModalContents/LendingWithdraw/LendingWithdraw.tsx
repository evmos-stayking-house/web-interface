import type { FC } from 'react';
import Image from 'next/image';

import s from './LendingWithdraw.module.scss';
import { InputNumber } from '../../../common/Input';
import Form from '../../../common/Form';
import { cn } from '../../../../utils/style';
import useLendingWithdraw from './LendingWithdraw.service';
import { Button } from '@mui/material';
import { numberFormat } from '../../../../utils/numberFormats';

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
        <Image width={32} height={32} src={'/img/logo/usdc.png'} alt={'usdc token logo'} />
      </div>
      <div className={s.divider}></div>
      <span className={cn(s.desc, s.desc__lg)}>
        Available ib{title} Balance: {numberFormat(ibTokenBalance)} ib{title}
      </span>
      <Form>
        <section className={s.depositTokenContainer} onBlur={() => shareToAmount()}>
          <Form.Item label="" className={s.input}>
            <InputNumber max={'1000'} setInputValue={setIbTokenWithdraw} inputValue={ibTokenWithdraw} />
          </Form.Item>
          <div className={s.assetName}>ib{title}</div>
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
          <div className={s.assetName} style={{ width: '11%' }}>
            {title}
          </div>
        </section>
        <div className={s.confirmBtnWrapper}>
          <Button className={s.confirmBtnWrapper__btn} onClick={() => withdraw()}>
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LendingWithdraw;
