import warningTriangleIcon from '@ewf/assets/icons/warning-triangle.svg';

export const UnsubscriptionDelayChip = (): JSX.Element => (
  <div className="item-center flex w-fit rounded-full bg-pink-light/20 px-3 py-2 text-center text-sm text-pink-light">
    <div className="flex h-[16px] w-[16px] justify-center mr-1">
      <img src={warningTriangleIcon} width={15} height={15} alt="more info"/>
    </div>
    Unsubscription Delay
  </div>
);
