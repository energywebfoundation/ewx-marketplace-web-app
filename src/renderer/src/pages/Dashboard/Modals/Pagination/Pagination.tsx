import { useEffect, useState } from 'react';
import clsx from 'clsx';
import {
  PiCaretDoubleLeftBold,
  PiCaretLeftBold,
  PiCaretRightBold,
  PiCaretDoubleRightBold,
} from 'react-icons/pi';

export const Pagination = ({ currentRewardPeriod, triggerFetchData }: Props) => {
  const [rewardPeriodInput, setRewardPeriodInput] = useState<number>(() =>
    currentRewardPeriod ? currentRewardPeriod : 0,
  );

  useEffect(() => setRewardPeriodInput(currentRewardPeriod), [currentRewardPeriod]);

  const loadRewardPeriodPage = async (rewardPeriod: number) => {
    await triggerFetchData(rewardPeriod);
    setRewardPeriodInput(rewardPeriod);
  };

  const setPreviousRewardPeriod = () => {
    if (rewardPeriodInput === 0) return;
    const newRewardPeriod = rewardPeriodInput - 1;
    loadRewardPeriodPage(newRewardPeriod);
  };

  const setFirstRewardPeriod = () => {
    if (rewardPeriodInput === 0) return;
    const newRewardPeriod = 0;
    loadRewardPeriodPage(newRewardPeriod);
  };

  const setNextRewardPeriod = () => {
    if (rewardPeriodInput === currentRewardPeriod) return;
    const newRewardPeriod = rewardPeriodInput + 1;
    loadRewardPeriodPage(newRewardPeriod);
  };

  const setLastRewardPeriod = () => {
    if (rewardPeriodInput === currentRewardPeriod) return;
    const newRewardPeriod = currentRewardPeriod;
    loadRewardPeriodPage(newRewardPeriod);
  };
  return (
    <div className="mt-3 flex justify-center">
      <div className="flex w-fit justify-center gap-2 rounded-lg bg-gray-85 px-3 py-2">
        <button
          onClick={setFirstRewardPeriod}
          className={clsx({
            'hover:text-brand': true,
            invisible: rewardPeriodInput <= 1,
          })}
        >
          <PiCaretDoubleLeftBold />
        </button>
        <button
          onClick={setPreviousRewardPeriod}
          className={clsx({
            'hover:text-brand': true,
            invisible: rewardPeriodInput === 0,
          })}
        >
          <PiCaretLeftBold />
        </button>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            triggerFetchData(rewardPeriodInput);
          }}
        >
          <input
            type="text"
            name="reward-period"
            onChange={(e) => {
              const { value } = e.target;

              if (!value) {
                setRewardPeriodInput(0);
                return;
              }

              const onlyNumbersRegex = /^[0-9]*$/;
              if (!onlyNumbersRegex.test(value)) {
                return;
              }
              const numberValue = parseInt(value);
              const updatedValue =
                numberValue > currentRewardPeriod ? currentRewardPeriod : numberValue;
              setRewardPeriodInput(updatedValue);
            }}
            value={rewardPeriodInput}
            className="mx-1 w-[80px] rounded-lg border border-gray-60 bg-transparent px-3 py-2 text-center outline-none focus:border-brand"
            onBlur={() => triggerFetchData(rewardPeriodInput)}
          />
        </form>
        <button
          onClick={setNextRewardPeriod}
          className={clsx({
            'hover:text-brand': true,
            invisible: rewardPeriodInput === currentRewardPeriod,
          })}
        >
          <PiCaretRightBold />
        </button>
        <button
          onClick={setLastRewardPeriod}
          className={clsx({
            'hover:text-brand': true,
            invisible: rewardPeriodInput >= currentRewardPeriod - 1,
          })}
        >
          <PiCaretDoubleRightBold />
        </button>
      </div>
    </div>
  );
};

interface Props {
  currentRewardPeriod: number;
  triggerFetchData: (rewardPeriod: number) => void;
}
