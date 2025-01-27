import xGradientIcon from '@ewf/assets/icons/x-gradient.svg';
import discordGradientIcon from '@ewf/assets/icons/discord-gradient.svg';
import githubGradientIcon from '@ewf/assets/icons/github-gradient.svg';
import webGradientIcon from '@ewf/assets/icons/web-gradient.svg';
import linkedinGradientIcon from '@ewf/assets/icons/linkedin-gradient.svg';

export const SocialNetworkLink = (): React.ReactNode => {
  return (
    <div className="flex justify-center gap-4">
      {socialNetworkLink.map(({ icon, link, alt }) => (
        <a
          href={link}
          key={icon}
          target="_blank"
          rel="noreferrer"
          className="flex h-[40px] w-[40px] place-items-center items-center justify-center rounded-full bg-gray-80 shadow-[0_0_3px_0_rgba(0,0,0,0.6)] hover:bg-gray-70"
        >
          <img src={icon} alt={alt} width={26} height={26} />
        </a>
      ))}
    </div>
  );
};

const socialNetworkLink = [
  {
    icon: xGradientIcon,
    link: 'https://twitter.com/XEnergyWeb',
    alt: 'Twitter',
  },
  {
    icon: discordGradientIcon,
    link: 'https://discord.gg/psraNwqGqp',
    alt: 'Discord',
  },
  {
    icon: githubGradientIcon,
    link: 'https://github.com/energywebfoundation/ewx-marketplace',
    alt: 'Github',
  },
  {
    icon: webGradientIcon,
    link: 'https://www.energywebx.com/',
    alt: 'Website',
  },
  {
    icon: linkedinGradientIcon,
    link: 'https://www.linkedin.com/company/energy-web-foundation',
    alt: 'Linkedin',
  },
];
