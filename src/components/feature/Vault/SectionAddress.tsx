import { FC, useState } from 'react';
import Image from 'next/image';
import { Input } from 'components/common/Input';
import s from './Vault.module.scss';

interface SectionAddressProps {
  address: string;
  setAddress: Function;
}

const SectionAddress: FC<SectionAddressProps> = ({ address, setAddress }) => {
  const [expand, setExpand] = useState(false);

  function toggleExpand() {
    setExpand(!expand);
  }

  return (
    <section className={s.contentAddress}>
      <div className={s.addressToggle} onClick={toggleExpand}>
        <span>Change Receiver Address</span>
        <div className={s.arrowDown}>
          <Image src="/img/common/arrow-down.svg" layout="fill" />
        </div>
      </div>

      {expand && (
        <div className={s.addressInput}>
          <Input value={address} handleChange={setAddress} />
        </div>
      )}
    </section>
  );
};

export default SectionAddress;
