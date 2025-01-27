import { Link } from 'react-router-dom';
import githubLogo from '@ewf/assets/icons/github-socials.svg';

export const GithubSocialButton = (): JSX.Element => {
  return (
    <Link to="https://github.com/energywebfoundation/ewx-marketplace" target="_blank">
      <button className="mr-1 h-[36px] w-[36px] place-items-center rounded-full !p-[6px] shadow-sunken">
        <img src={githubLogo} width={100} height={100} alt="github-social" />
      </button>
    </Link>
  );
};
