import { useState } from 'react';
import clsx from 'clsx';
import { PiMagnifyingGlass } from 'react-icons/pi';
import * as Select from '@ewf/components/Select';

export type Record = {
  level: string;
  message: string;
  date: string;
  time: string;
  trxHash: string;
};

export const RecordsTable = ({ records, isLoading, isError }: Props) => {
  const levels = ['all', 'info', 'success', 'error'] as const;
  const [search, setSearch] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<(typeof levels)[number]>('all');

  const filterRecords = (records: Record[]) => {
    if (selectedLevel === 'all' && search === '') {
      return records.filter((record) => record.message !== '');
    }

    return records.filter((record) => {
      const { date, time, level, message } = record;
      const isTypeMatch = selectedLevel === 'all' || record.level === selectedLevel;
      const isSearchMatch = [date, time, level, message].some((field) =>
        field.toLowerCase().includes(search.toLowerCase()),
      );
      return isTypeMatch && isSearchMatch;
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.trim());
  };

  const handleLevelChange = (level: (typeof levels)[number]) => {
    setSelectedLevel(level);
  };

  const filteredRecords = filterRecords(records);

  return (
    <div className="relative">
      <section className="absolute -top-12 right-0 z-20 flex w-fit flex-row gap-4">
        <div className="relative">
          <input
            value={search}
            onChange={handleSearch}
            type="text"
            placeholder="Search logs"
            className="h-[30px] w-[180px] rounded-full border border-gray-50 bg-transparent py-1 pl-10 pr-4 transition-[border] duration-200 placeholder:text-sm placeholder:text-font-subtle focus:border-gray-10 focus:outline-none"
          />
          <PiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
        <Select.Root value={selectedLevel} onValueChange={handleLevelChange}>
          <Select.Trigger
            aria-label="Select environment"
            className="gap-3 !rounded-full border-none !px-3 text-base uppercase"
          >
            <Select.Value placeholder="ENV" />
            <Select.TriggerIcon size={16} />
          </Select.Trigger>
          <Select.Content position="popper" className="!rounded-md !pt-0">
            <Select.ScrollDownButton />
            <Select.Viewport>
              <Select.Group>
                {levels.map((level) => (
                  <Select.Item
                    key={level}
                    value={level}
                    className="flex items-center justify-between gap-2 !pr-10 uppercase"
                  >
                    <Select.ItemText>{level}</Select.ItemText>
                    <Select.ItemIndicator className="mb-1" />
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Viewport>
            <Select.ScrollDownButton />
          </Select.Content>
        </Select.Root>
      </section>
      <div className="relative max-h-[min(calc(60vh-57px),800px)] overflow-x-auto">
        <div
          // The implemented class 'bg-dark-gradient' is too bright for the background
          style={{ background: 'linear-gradient(138deg, #090909 18.54%, #3d3d3d 100%)' }}
          className="w-fit min-w-full rounded-b-md py-2 pl-6 pr-8"
        >
          {(() => {
            if (isError) return <ErrorDisplay />;
            if (isLoading) return <LoadingTable />;
            if (filteredRecords.length === 0) return <EmptyTable />;

            return (
              <div className="space-y-2 text-left text-sm text-font-subtler rtl:text-right">
                <Row className="shadow-none">
                  <Column>Date</Column>
                  <Column>Time</Column>
                  <Column>Type</Column>
                  <Column>Description</Column>
                </Row>
                {/* Reverse array to show the latest logs first */}
                {filteredRecords.reverse().map((record, index) => (
                  <Row
                    key={index}
                    className={clsx({
                      'gradient-border-dark-with-gray-80': index % 2 === 0,
                      'gradient-border-dark-with-gray-70': index % 2 === 1,
                    })}
                  >
                    <Column>{record.date}</Column>
                    <Column>{record.time}</Column>
                    <Column
                      className={clsx({
                        'font-bold uppercase': true,
                        'text-blue': record.level === 'info',
                        'text-red': record.level === 'error',
                        'text-green': record.level === 'success',
                      })}
                    >
                      {record.level}
                    </Column>
                    <Column className="w-fit">
                      {record.trxHash ? record.trxHash : ''}
                      {record.trxHash ? <br></br> : ''}
                      {record.message}
                    </Column>
                  </Row>
                ))}
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

interface Props {
  records: Record[];
  isLoading?: boolean;
  isError?: boolean;
}

interface EmptyTableProps {
  message?: string;
}
interface ErrorDisplayProps {
  message?: string;
}

export const ErrorDisplay = ({
  message = 'Could not find any record data in this reward period',
}: ErrorDisplayProps) => (
  <div className="py-4">
    <p>{message}</p>
  </div>
);

export const EmptyTable = ({
  message = 'There are no locally logged records in this machine to show.',
}: EmptyTableProps) => (
  <div className="py-4 pr-6 font-primary-light">
    <p>{message}</p>
  </div>
);

export const LoadingTable = () =>
  Array.from({ length: 10 }).map((_, index) => (
    <Row key={index} className="mb-2 animate-pulse bg-gray-70">
      <p>Loading...</p>
    </Row>
  ));

export const Row = (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={clsx({
      'grid grid-cols-[120px_120px_120px_1fr] rounded-lg border-2 border-transparent px-6 py-3 shadow-lg':
        true,
      [props.className as string]: true,
    })}
  >
    {props.children}
  </div>
);

export const Column = (props: React.HTMLAttributes<HTMLSpanElement>) => {
  const isJsonContent = () => {
    try {
      JSON.parse(props.children as string);
      return true;
    } catch (e) {
      return false;
    }
  };

  if (isJsonContent()) {
    return (
      <pre
        className={clsx({
          [props.className as string]: true,
        })}
      >
        {props.children}
      </pre>
    );
  }

  return (
    <span
      className={clsx({
        [props.className as string]: true,
      })}
    >
      {props.children}
    </span>
  );
};
