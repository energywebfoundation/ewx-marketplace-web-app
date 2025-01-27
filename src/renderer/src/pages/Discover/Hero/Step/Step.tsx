import { useRef } from 'react';
import { type HeroBannerStepProps } from '@ewf/stores/remote-resources';
import heroBannerFallbackImage from '@ewf/assets/images/hero-banner-fallback.svg';

// For some reason, using the name `props` instead of `args` causes some eslint issues
export const Step = (args: HeroBannerStepProps) => {
  const imageRef = useRef<HTMLImageElement>(null);

  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    args.href ? (
      <a href={args.href} target="_blank" rel="noreferrer">
        {children}
      </a>
    ) : (
      <>{children}</>
    );

  const Root = ({ children }: { children: React.ReactNode }) => (
    <div
      ref={imageRef}
      style={{
        backgroundImage: `url(${args.image})`,
      }}
      className="relative h-full w-full bg-[length:auto_100%] bg-right px-10 pb-16 pt-8"
    >
      <img
        className="hidden"
        src={args.image}
        onError={() => {
          // Can't use <img /> directly because positioning and sizing is worse than background-image
          if (imageRef.current) {
            imageRef.current.style.backgroundImage = `url(${heroBannerFallbackImage})`;
          }
        }}
        alt="Solution group card"
        referrerPolicy="same-origin"
      />
      <div className="absolute left-0 top-0 h-full w-full p-10 pt-8 bg-hero-gradient" />
      <div className="relative z-10 w-fit">{children}</div>
    </div>
  );

  const Title = () => (
    <h1 className="mb-1 font-primary-bold text-2xl leading-10">
      {args.title.map((line, i) => (
        <span key={i}>
          {(() => {
            switch (line.type) {
              case 'text':
                return line.value;
              case 'gradient':
                return <span className="text-gradient">{line.value}</span>;
              case 'image':
                return (
                  <img
                    src={line.value}
                    referrerPolicy="no-referrer"
                    className="inline-block align-baseline"
                    alt=""
                  />
                );
              case 'breakline':
                return <br />;
            }
          })()}
        </span>
      ))}
    </h1>
  );

  const Description = () => (
    <p className="mt-3 leading-5">
      {args.description?.map((line, i) => (
        <span key={i}>
          {(() => {
            switch (line.type) {
              case 'text':
                return line.value;
              case 'breakline':
                return <br />;
            }
          })()}
        </span>
      ))}
    </p>
  );

  return (
    <Wrapper>
      <Root>
        <Title />
        <Description />
      </Root>
    </Wrapper>
  );
};
