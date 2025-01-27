import checkGlowIcon from '@ewf/assets/icons/check-glow.svg';

export const SuccessBadge = (): JSX.Element => {
  return (
    <div className="h-[124px] w-[124px] rounded-full border border-gray-70 p-3 shadow-[0_0_4px_3px_rgba(0,0,0,0.32)]">
      <div className="h-full w-full rounded-full bg-gradient-to-b from-brand to-teal p-1 shadow-[0_0_4px_1px_theme(colors.green/40%)] outline outline-1 outline-green/20">
        <div className="grid h-full w-full place-items-center rounded-full border border-gray-95 bg-gray-80 shadow-[0_0_4px_1px_rgba(0,0,0,0.16)_inset]">
          <div className="h-[48px] w-[48px] rounded-full bg-gradient-to-br from-gray-60 p-[1px] shadow-[0_0_12px_1px_rgba(0,0,0,0.8)]">
            <div className="grid h-full w-full place-items-center rounded-full bg-gray-80">
              <img src={checkGlowIcon} width={32} height={32} alt="Check" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
