import { Link } from 'react-router-dom';
import globeIcon from '@ewf/assets/icons/globe-socials.svg';

export const GlobeSocialButton = (): JSX.Element => {
  return (
    <Link to="https://www.energyweb.org/" target="_blank">
      <button className="h-[36px] w-[36px] place-items-center rounded-full !p-[6px] shadow-sunken">
        <img src={globeIcon} width={100} height={100} alt="globe-social" />
      </button>
    </Link>
  );
};
