import { DateTime } from 'luxon';
import { Tooltip } from '@ewf/components/Tooltip';
import { isElectron } from '@main/helpers/is-electron';
import questionMarkIcon from '@ewf/assets/icons/question.svg';

export const ScheduledUnsubscriptionChip = ({ unsubscriptionDate, withdrawalDelay }: ScheduledUnsubscriptionChipProps): JSX.Element => {
  let approxDelayFormatted = '';
  const unsubscriptionDateFormatted = DateTime.fromISO(unsubscriptionDate.toISOString()); // convert to luxon DateTime object

  if (isElectron()) {
    const delayInSeconds = withdrawalDelay * 12; // Approx 12 seconds per block
    const approxDelayInDatetime = unsubscriptionDateFormatted.plus({ seconds: delayInSeconds });
    approxDelayFormatted = approxDelayInDatetime.toLocaleString(DateTime.DATETIME_FULL);
  } else { // skip adding withdrawal delay seconds for web -- date is derived directly from unsubscribeBlock
    approxDelayFormatted = unsubscriptionDateFormatted.toLocaleString(DateTime.DATETIME_FULL);
  }

  return (
    <div className="item-center flex w-fit rounded-full bg-pink-light/20 px-3 py-1 text-center text-sm text-pink-light">
      Unsubscription Scheduled
      <Tooltip
        side="bottom"
        content={
          <div className="max-w-[300px] p-2">{`Unsubscribe will take effect around ${approxDelayFormatted}`}</div>
        }
      >
        <div className="ml-2 flex h-[16px] w-[16px] justify-center rounded-full bg-gray-100">
          <img src={questionMarkIcon} width={11} height={11} alt="more info"/>
        </div>
      </Tooltip>
    </div>
  )
};

interface ScheduledUnsubscriptionChipProps {
  unsubscriptionDate: Date;
  withdrawalDelay: number;
}



