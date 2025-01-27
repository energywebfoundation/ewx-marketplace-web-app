import clsx from 'clsx';
import { Link } from 'react-router-dom';
import arrowUpGradientIcon from '@ewf/assets/icons/arrow-up-gradient.svg';
import eye from '@ewf/assets/icons/eye.svg';
import arrowDownGradientIcon from '@ewf/assets/icons/arrow-down-gradient.svg';
import success from '@ewf/assets/icons/success.svg';
import pending from '@ewf/assets/icons/clock-clockwise.svg';
import arrowSquereOut from '@ewf/assets/icons/arrow-square-out.svg';
import ewLogo from '@ewf/assets/logos/ew.svg';
import ewxGlowLogo from '@ewf/assets/logos/ewx-glow.svg';
import { SunkenBox } from '@ewf/components/SunkenBox';
import { DateTime } from 'luxon';
import { truncateAddress } from '@ewf/lib/utils';
import { getIndexer } from '@ewf/lib/indexer';
import { Tooltip } from '@ewf/components/Tooltip';
import { PiMagnifyingGlass } from 'react-icons/pi';
import {
  Column,
  Row,
  LoadingTable,
  EmptyTable,
  ErrorDisplay,
} from '@ewf/pages/Dashboard/Modals/RecordTable';
import { ReactNode, useEffect, useState } from 'react';
import { useConnectionStore } from '@ewf/stores/connection';
import { Transaction, TransactionType } from '@main/entities/transaction';
import { useWalletEnvStore } from '@ewf/stores/wallet-env';
import { CopyButton } from '@ewf/components/CopyButton';

function useRecords({
  type,
  search,
  addressEWX,
}: {
  type: TransactionType;
  search: string;
  addressEWX: string;
}): {
  isLoading: boolean;
  isError: boolean;
  data: Transaction[] | undefined;
} {
  const [isPending, setIsPending] = useState(false);
  const [records, setRecords] = useState<Transaction[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const indexer = getIndexer();

  useEffect(() => {
    const fetchResults = async () => {
      const promises: Promise<Transaction[]>[] = [];

      if (type === TransactionType.LIFTING || type === TransactionType.ALL) {
        const liftsPromise = indexer.getLiftsByReceiver(addressEWX);
        promises.push(liftsPromise);
      }

      if (type === TransactionType.LOWERING || type === TransactionType.ALL) {
        const lowersPromise = indexer.getLowersBySender(addressEWX);
        promises.push(lowersPromise);
      }

      const records = (await Promise.all(promises)).flat();
      setRecords(records);
    };

    const intervalId = setInterval(() => {
      fetchResults()
        .catch(() => setIsError(true))
        .finally(() => setIsPending(false));
    }, 5000);

    // Initial fetch
    setIsPending(true);
    fetchResults()
      .catch(() => setIsError(true))
      .finally(() => setIsPending(false));

    return () => clearInterval(intervalId);
  }, [addressEWX, type, indexer]);

  if (isPending) {
    return {
      isLoading: true,
      isError,
      data: undefined,
    };
  }

  return {
    isLoading: false,
    isError,
    data: search
      ? records
          .filter(
            (r) =>
              r.txHash?.toLowerCase().includes(search.toLowerCase()) ||
              r.addressEWC?.toLowerCase().includes(search.toLowerCase()) ||
              r.addressEWX?.toLowerCase().includes(search.toLowerCase()),
          )
          .sort((a, b) => Number(a.when) - Number(b.when))
      : records.sort((a, b) => Number(a.when) - Number(b.when)),
  };
}

const statusChips: Record<'success' | 'pending', ReactNode> = {
  success: (
    <>
      <img src={success} alt={'success'} width={10} height={10} />
      <p className={'text-sm text-green'}>Success</p>
    </>
  ),
  pending: (
    <>
      <img src={pending} alt={'pending'} width={10} height={10} />
      <p className={'text-sm text-gray-20'}>Pending</p>
    </>
  ),
};

const getTransactionStatus = ({
  isFinalized,
  isPending,
}: Transaction): keyof typeof statusChips => {
  if (isPending && isFinalized !== null && !isFinalized) {
    return 'pending';
  }
  if (isFinalized && isPending !== null && !isPending) {
    return 'success';
  }

  return 'success';
};

export const TransactionsListTable = ({ type }: { type: TransactionType }) => {
  const [search, setSearch] = useState('');
  const addressEWX = useConnectionStore((state) => state.addressEWX);
  const { ewcExplorerUrl, ewxExplorerUrl } = useWalletEnvStore((state) => state.walletConst);
  const { isLoading, isError, data: records } = useRecords({ type, search, addressEWX });

  return (
    <div className="relative">
      <section className="absolute -top-12 right-0 z-20 flex w-fit flex-row gap-4">
        <div className="relative">
          <input
            value={search}
            onChange={(value) => {
              setSearch(value.target.value);
            }}
            type="text"
            placeholder="Search transactions"
            className="h-[30px] w-[180px] rounded-full border border-gray-50 bg-transparent pb-1 pl-10 pr-4 transition-[border] duration-200 placeholder:text-sm placeholder:text-font-subtler focus:border-gray-10 focus:outline-none"
          />

          <PiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </section>
      <div className="relative max-h-[min(calc(60vh-57px),800px)] rounded-lg">
        <div
          style={{ background: 'linear-gradient(138deg, #090909 18.54%, #3d3d3d 100%)' }}
          className="w-fit min-w-full rounded-b-md py-2 pl-[15px] pr-8"
        >
          <div className="max-h-[400px] overflow-y-scroll ">
            <div className="space-y-2 text-start text-base  text-font-subtler rtl:text-right">
              <Row className="grid grid-cols-[1fr_1.2fr_2.4fr_3fr] items-center  rounded-lg border-2 border-transparent px-3 py-3  shadow-none">
                <Column>Date</Column>
                <Column>Type</Column>
                <Column>Addresses</Column>
                <Column>Amount and status</Column>
              </Row>
              {isLoading && <LoadingTable />}
              {isError && (
                <ErrorDisplay message="Could not find any transactions connected to your account" />
              )}
              {records?.length === 0 && !isError && (
                <EmptyTable message="There are no transactions connected to your account to be displayed." />
              )}
              {!isLoading &&
                !isError &&
                (records ?? []).toReversed().map((record, index) => (
                  <Row
                    key={record.id}
                    className={clsx({
                      'bg-gray-80': index % 2 === 0,
                      'bg-gray-90': index % 2 === 1,
                      'grid grid-cols-[1fr_1.2fr_2.4fr_3fr] items-center  rounded-lg border-2 border-transparent px-3 py-3 shadow-lg':
                        true,
                    })}
                  >
                    <Column className="h-[100%] border-r border-[#5D5D5D] pl-3">
                      <div className="flex h-[100%] flex-col justify-center ">
                        <p className=" text-[12px] font-bold leading-[24px] text-[#C9C9C9]">
                          {DateTime.fromMillis(Number(record.when)).toFormat('dd-MM-yyyy')}
                        </p>
                        <p className="text-[12px] leading-[18px] text-[#989799]">
                          {DateTime.fromMillis(Number(record.when)).toLocaleString(
                            DateTime.TIME_SIMPLE,
                          )}
                        </p>
                      </div>
                    </Column>
                    <Column className="h-[100%] border-r border-[#5D5D5D]">
                      <div className=" flex h-[100%] flex-row items-center justify-center gap-[8px] ">
                        <img
                          src={
                            record.type === TransactionType.LIFTING
                              ? arrowUpGradientIcon
                              : arrowDownGradientIcon
                          }
                          width={24}
                          height={24}
                          alt={record.type === TransactionType.LIFTING ? 'Arrow up' : 'Arrow down'}
                        />
                        <p className="text-[14px] font-bold capitalize leading-[20px] text-[#DDDCDD]">
                          {record.type}
                        </p>
                      </div>
                    </Column>
                    <Column className="h-[100%] border-r border-[#5D5D5D]">
                      <div className="flex flex-col gap-2 px-4">
                        <div className=" flex flex-row justify-between gap-3">
                          <SunkenBox className="flex h-[31px] w-[165px] items-center gap-2 rounded-sm ">
                            <img src={ewLogo} width={14} height={14} alt="EWT" className="inline" />
                            EWC
                            <p>{truncateAddress(record.addressEWC)}</p>
                          </SunkenBox>

                          <div className="flex flex-row items-center gap-[5px]">
                            <CopyButton text={record.addressEWC} />
                            <Tooltip
                              side="top"
                              content={<div className="p-2">{record.addressEWC}</div>}
                              className="z-40 rounded-lg"
                            >
                              <div className="flex h-[16px] w-[16px] items-center justify-center ">
                                <img src={eye} alt="eye" className=" h-[12px] w-[12px]" />
                              </div>
                            </Tooltip>
                          </div>
                        </div>
                        <div className=" flex flex-row justify-between gap-3">
                          <SunkenBox className="flex h-[31px] w-[165px] items-center gap-2 rounded-sm ">
                            <img
                              src={ewxGlowLogo}
                              width={14}
                              height={14}
                              alt="EWT"
                              className="inline"
                            />
                            EWX
                            <p>{truncateAddress(record.addressEWX)}</p>
                          </SunkenBox>

                          <div className="flex flex-row items-center gap-[5px]">
                            <CopyButton text={record.addressEWX} />

                            <Tooltip
                              side="top"
                              content={<div className="p-2">{record.addressEWX}</div>}
                              className="z-40 rounded-lg"
                            >
                              <div className="flex h-[16px] w-[16px] items-center justify-center ">
                                <img src={eye} alt="eye" className=" h-[12px] w-[12px]" />
                              </div>
                            </Tooltip>
                          </div>
                        </div>
                      </div>
                    </Column>

                    <Column className="h-[100%]">
                      <div className="flex h-[100%] flex-row items-center gap-[16px]">
                        <div className="flex h-[100%] w-[40%] flex-col items-center justify-center gap-2 border-r border-[#5D5D5D]">
                          <p className="text-lg font-bold leading-6 text-[#dddcdd] ">
                            {record.amount} EWT
                          </p>
                          <SunkenBox className="flex w-[71px] flex-row justify-center gap-1 bg-black px-2 py-1">
                            {statusChips[getTransactionStatus(record)]}
                          </SunkenBox>
                        </div>
                        <div className="flex h-[100%] flex-col  items-start justify-center pl-2">
                          <div className="flex flex-row items-center gap-2">
                            <Link
                              to={
                                record.type === TransactionType.LIFTING
                                  ? `${ewcExplorerUrl}/${record.txHash}`
                                  : `${ewxExplorerUrl}/${record.block}`
                              }
                              target="_blank"
                            >
                              <div className="flex flex-row items-center gap-2">
                                <p className="h-fit">view in explorer</p>
                                <img
                                  src={arrowSquereOut}
                                  alt="outsideLink"
                                  className="h-[18px] w-[18px]"
                                />
                              </div>
                            </Link>
                          </div>
                          {record.type === TransactionType.LIFTING && (
                            <div className="flex flex-row items-center gap-2">
                              <p>transaction hash</p>
                              {record.txHash ? <CopyButton text={record.txHash} size={16} /> : null}
                            </div>
                          )}
                        </div>
                      </div>
                    </Column>
                    <Column></Column>
                  </Row>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
