import { Link } from 'react-router-dom';
import globeIcon from '@ewf/assets/icons/globe-socials.svg';
import ewFullLogo from '@ewf/assets/logos/ew-full.svg';
import ewxSocialsIcon from '@ewf/assets/icons/energywebx-socials.svg';

export const EWCard = (): JSX.Element => {
  return (
    <div className="group mr-2 h-[120px] w-full max-w-[120px] rounded-lg bg-gray-80 px-4 py-5 shadow-sunken">
      <img
        className="mx-auto mb-5 mt-1"
        src={ewFullLogo}
        width={100}
        height={100}
        alt="Energywebcard"
      />
      <div className="flex justify-center">
        <Link to="https://twitter.com/energywebx" target="_blank">
          <button className="mr-1 h-[36px] w-[36px] place-items-center rounded-full !p-[6px] shadow-sunken">
            <img src={ewxSocialsIcon} width={100} height={100} alt="energywebx-social" />
          </button>
        </Link>
        <Link to="https://www.energyweb.org/" target="_blank">
          <button className="h-[36px] w-[36px] place-items-center rounded-full !p-[6px] shadow-sunken">
            <img src={globeIcon} width={100} height={100} alt="globe-social" />
          </button>
        </Link>
      </div>
    </div>
  );
};
