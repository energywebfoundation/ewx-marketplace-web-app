import ewLogo from '@ewf/assets/logos/ew.svg';
import ewWhiteLogo from '@ewf/assets/logos/ew-white.svg';

export const PoweredByEW = ({ variant = 'primary' }: Props) => {
  const imageSrc = variant === 'primary' ? ewLogo : ewWhiteLogo;

  return (
    <p className="flex items-start font-rajdhani">
      Powered by{' '}
      <img className="mx-2 -mt-1 inline" src={imageSrc} alt="Energy Web" width={27} height={27} />{' '}
      energy web
    </p>
  );
};

interface Props {
  variant?: 'primary' | 'white';
}
