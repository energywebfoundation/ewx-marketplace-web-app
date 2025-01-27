import clsx from 'clsx';
import { PiHeartBold, PiHeartFill, PiArrowRightBold } from 'react-icons/pi';
import { useConnectionStore } from '@ewf/stores/connection';
import { useRemoteResourcesStore } from '@ewf/stores/remote-resources';
import { GenericChip } from '@ewf/components/Chips/GenericChip';
import cloudsImage from '@ewf/assets/images/clouds.png';
import windTurbineImage from '@ewf/assets/images/wind-turbine.png';
import { useApiServiceStore } from '@ewf/stores/api';
import { GENERIC_CHIP_COLOR } from '@ewf/types/enums';
import { WorkerApi } from '@ewf/types/api';
import { useSolutionGroupsStore } from '@ewf/stores/solution-groups';

export const WorkerCard = ({
  id,
  category,
  name,
  description,
  status,
  hasOperatorsAllowlist,
}: Props): JSX.Element => {
  const workerApi = useApiServiceStore.getState().api;
  const isConnected = useConnectionStore((state) => state.isConnected);
  const { small: workerCardImages } = useRemoteResourcesStore((state) => state.workerCardImages);
  const setFavourite = useSolutionGroupsStore((state) => state.setFavourite);
  const backgroundImage = workerCardImages[id.toLowerCase()] || windTurbineImage;
  const isFav = Boolean(status?.isFavourites);

  const toggleFavorite = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const oldFavState = isFav;
    const newFavState = !isFav;

    try {
      setFavourite(id.toString(), newFavState);
      newFavState === true
        ? await workerApi.addFavourite(id.toString())
        : await workerApi.delFavourite(id.toString());
    } catch (err) {
      console.error(err);
      setFavourite(id.toString(), oldFavState);
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(${cloudsImage})` }}
      className="group relative h-full rounded-lg bg-cover bg-no-repeat transition-all duration-100 hover:shadow-card"
    >
      <img
        className="absolute bottom-0 right-0 w-full rounded-r-lg"
        src={backgroundImage}
        onError={(e) => (e.currentTarget.src = windTurbineImage)}
        alt="Solution group card"
        referrerPolicy="same-origin"
      />
      <div className="relative h-full rounded-lg p-6 bg-worker-gradient">
        <div className="absolute right-4 top-4 z-20 space-y-2 ">
          {isConnected ? (
            <button
              onClick={toggleFavorite}
              className="relative h-[32px] w-[32px] rounded-full bg-gray-90 hover:bg-gray-80 active:bg-gray-95"
            >
              <PiHeartFill
                size={16}
                className={clsx({
                  'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 fill-brand': true,
                  hidden: !isFav,
                })}
              />
              <PiHeartBold
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                size={16}
              />
            </button>
          ) : (
            ''
          )}

          <button className="duraion-100 block rounded-full bg-white p-2 opacity-0 transition-all group-hover:opacity-100">
            <PiArrowRightBold size={16} className="text-black" />
          </button>
        </div>
        <div className="space-between relative z-10 flex h-full flex-col">
          <div className="mb-4 h-full">
            <p className="mb-2 text-sm uppercase">{category}</p>
            <p className="mb-2 max-w-[220px] font-primary-bold text-[22px]">{name}</p>
            <p className="mb-2 max-w-[200px] text-sm">{description}</p>
            {hasOperatorsAllowlist && (
              <GenericChip label="PRIVATE" color={GENERIC_CHIP_COLOR.White}></GenericChip>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export interface Props {
  id: WorkerApi.WorkerId;
  category?: string | null;
  name?: string | null;
  description?: string | null;
  progress?: undefined | number;
  hasOperatorsAllowlist?: boolean;
  status?: {
    isFavourites: boolean;
  };
}
