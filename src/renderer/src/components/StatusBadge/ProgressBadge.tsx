import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';
import ewxGlowLogo from '@ewf/assets/logos/ewx-glow.svg';
import ethereumGradientIcon from '@ewf/assets/icons/ethereum-gradient.svg';
import verifyGradientIcon from '@ewf/assets/icons/verify-gradient.svg';
import usbGradientIcon from '@ewf/assets/icons/usb-gradient.svg';

const ProgressBadgeBase = ({ image = 'ewx', size = 'md' }: Props): JSX.Element => {
  const imageSize = size === 'md' ? 24 : 48;
  const imageClassname = clsx({
    'max-h-[24px] max-w-[24px]': size === 'md',
    'max-h-[64px] max-w-[64px]': size === 'lg',
  });
  const images: Record<Image, React.ReactNode> = {
    ewx: <img src={ewxGlowLogo} width={imageSize} className={imageClassname} alt="EWX" />,
    ethereum: (
      <img src={ethereumGradientIcon} width={imageSize} className={imageClassname} alt="EWX" />
    ),
    verify: <img src={verifyGradientIcon} width={imageSize} className={imageClassname} alt="EWX" />,
    usb: <img src={usbGradientIcon} width={imageSize} className={imageClassname} alt="EWX" />,
  };

  return (
    <div
      className={clsx({
        'rounded-full border border-gray-70 bg-gray-95 p-3 shadow-[0_0_4px_3px_rgba(0,0,0,0.32)]':
          true,
        'h-[124px] w-[124px]': size === 'md',
        'h-[186px] w-[186px]': size === 'lg',
      })}
    >
      <div className="relative h-full w-full">
        <div
          className={twMerge(
            'absolute left-0 top-0 h-full w-full animate-spin overflow-hidden rounded-full bg-gradient-to-r from-brand from-10% via-teal via-75% to-gray-100 to-50% outline outline-1 outline-black',
            "before:absolute before:left-0 before:top-0 before:mt-[-50%] before:h-full before:w-full before:bg-gray-100 before:content-['']",
          )}
        />
        <div className="relative z-20 h-full w-full rounded-full p-1">
          <div className="grid h-full w-full place-items-center rounded-full border border-gray-95 bg-gray-80 shadow-[0_0_4px_1px_rgba(0,0,0,0.16)_inset]">
            <div
              className={clsx({
                'rounded-full bg-gradient-to-br from-gray-60 p-[1px]': true,
                'h-[48px] w-[48px] shadow-[0_0_12px_1px_rgba(0,0,0,0.8)]': size === 'md',
                'h-[96px] w-[96px] shadow-[0_0_24px_1px_rgba(0,0,0,0.8)]': size === 'lg',
              })}
            >
              <div className="grid h-full w-full place-items-center rounded-full bg-gray-80">
                {images[image]}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type Image = 'ewx' | 'ethereum' | 'verify' | 'usb';
type Size = 'md' | 'lg';
interface Props {
  image?: Image;
  size?: Size;
}

export const ProgressBadgeEWX = (props: Props) => <ProgressBadgeBase {...props} />;
export const ProgressBadgeEthereum = (props: Props) => (
  <ProgressBadgeBase {...props} image="ethereum" />
);
export const ProgressBadgeVerify = (props: Props) => (
  <ProgressBadgeBase {...props} image="verify" />
);
export const ProgressBadgeUSB = (props: Props) => <ProgressBadgeBase {...props} image="usb" />;
