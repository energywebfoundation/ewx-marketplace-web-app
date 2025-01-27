import { useState } from 'react';
import { PiCheckBold } from 'react-icons/pi';
import clsx from 'clsx';
import * as Select from '@ewf/components/Select';
import arrowUpIcon from '@ewf/assets/icons/arrow-up.svg';
import arrowDownIcon from '@ewf/assets/icons/arrow-down.svg';

export type Criteria = 'name' | 'date' | 'time-remaining' | 'min-staking-amount';
export type Order = 'ascending' | 'descending';

export const SortBy = ({ onValueChanged }: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [criteria, setCriteria] = useState<Criteria | undefined>('name');
  const [order, setOrder] = useState<Order>('ascending');

  const criteriaOptions: { id: Criteria; name: string }[] = [
    {
      id: 'name',
      name: 'Name',
    },
    /*{
      id: 'date',
      name: 'Date',
    },
    {
      id: 'time-remaining',
      name: 'Time Remaining',
    },
    {
      id: 'min-staking-amount',
      name: 'Min Staking Amount',
    },*/
  ];
  const orderOptions: { id: Order; name: string; image: string }[] = [
    {
      id: 'ascending',
      name: 'Ascending',
      image: arrowUpIcon,
    },
    {
      id: 'descending',
      name: 'Descending',
      image: arrowDownIcon,
    },
  ];

  const open = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const selectCriteria = (id: Criteria) => {
    setCriteria(id);
    onValueChanged({
      criteria: id,
      order,
    });
    onClose();
  };

  const selectOrder = (id: Order) => {
    setOrder(id);
    onValueChanged({
      criteria: criteria || 'name',
      order: id,
    });
    onClose();
  };

  return (
    <Select.Root value={criteria} open={isOpen}>
      <Select.Trigger aria-label="Open user select" onClick={open}>
        <Select.Value placeholder="Sort by" />
        <Select.TriggerIcon />
      </Select.Trigger>
      <Select.Portal>
        <Select.Content position="popper" onPointerDownOutside={onClose} onEscapeKeyDown={onClose}>
          <Select.ScrollDownButton />
          <Select.Viewport>
            <Select.Group>
              <Select.Label className="mb-1 pl-2 font-primary-light text-sm uppercase tracking-wide text-font-subtle">
                Sort by
              </Select.Label>
              {criteriaOptions.map((option) => (
                <Select.Item
                  onClick={() => selectCriteria(option.id)}
                  key={option.id}
                  value={option.id}
                  className="flex items-center justify-between gap-2"
                >
                  <Select.ItemText>{option.name}</Select.ItemText>
                  <PiCheckBold
                    size={16}
                    className={clsx({
                      'flex-none fill-brand': true,
                      'opacity-0': option.id !== criteria,
                    })}
                  />
                </Select.Item>
              ))}
            </Select.Group>
            <Select.Separator />
            <Select.Group>
              <Select.Label className="mb-1 pl-2 font-primary-light text-sm uppercase tracking-wide text-font-subtle">
                Order
              </Select.Label>
              {orderOptions.map((option) => (
                <Select.Item
                  onClick={() => selectOrder(option.id)}
                  key={option.id}
                  value={option.id}
                  className="-ml-1 flex items-center justify-between gap-2"
                >
                  <div className="flex gap-2">
                    <img src={option.image} />
                    <Select.ItemText>{option.name}</Select.ItemText>
                  </div>

                  <PiCheckBold
                    size={16}
                    className={clsx({
                      'flex-none fill-brand': true,
                      'opacity-0': option.id !== order,
                    })}
                  />
                </Select.Item>
              ))}
            </Select.Group>
            <Select.Separator />
          </Select.Viewport>
          <Select.ScrollDownButton />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

interface Props {
  onValueChanged: ({ criteria, order }: { criteria: Criteria; order: Order }) => void;
}
