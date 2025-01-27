import { Link } from 'react-router-dom';
import ewxSocialsIcon from '@ewf/assets/icons/energywebx-socials.svg';

export const EnergywebXSocialButton = (): JSX.Element => {
  return (
    <Link to="https://twitter.com/energywebx" target="_blank">
      <button className="mr-1 h-[36px] w-[36px] place-items-center rounded-full !p-[6px] shadow-sunken">
        <img src={ewxSocialsIcon} width={100} height={100} alt="energywebx-social" />
      </button>
    </Link>
  );
};
