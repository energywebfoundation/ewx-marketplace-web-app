import { useState, useEffect } from 'react';
import { PiMagnifyingGlassBold } from 'react-icons/pi';
import clsx from 'clsx';
import { countries, getEmojiFlag, TCountryCode, ICountry } from 'countries-list';
import { Input } from '@ewf/components/Input';
import * as Select from '@ewf/components/Select';

export const SelectCountry = ({ onCountrySelected }: Props): React.ReactNode => {
  const defaultCountry: TCountryCode = 'US';
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState<TCountryCode>(defaultCountry);

  const sortedCountries = Object.entries(countries).sort((a, b) => {
    if (a[1].name > b[1].name) return 1;
    if (a[1].name < b[1].name) return -1;
    return 0;
  });

  const isFilteredCountry = (country: ICountry): boolean => {
    return (
      country.name.toLowerCase().includes(search.toLowerCase()) ||
      country.native.toLowerCase().includes(search.toLowerCase())
    );
  };

  const onCountryChange = (countryId: TCountryCode) => {
    const countryName = countries[countryId].name;
    setSearch('');
    setCountry(countryId);
    onCountrySelected(countryName);
  };

  const onOpenChange = (isOpen: boolean) => {
    if (!isOpen) setSearch('');
  };

  useEffect(() => {
    const defaultCountryName = countries[defaultCountry].name;
    onCountrySelected(defaultCountryName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Select.Root
      // open={true}
      value={country}
      onValueChange={onCountryChange}
      onOpenChange={onOpenChange}
    >
      <Select.Trigger aria-label="Open country select" className="flex justify-between">
        <Select.Value placeholder="Sort by" />
        <Select.TriggerIcon />
      </Select.Trigger>
      <Select.Content position="popper" className="relative z-30 max-h-[400px] min-w-[300px]">
        <div className="relative z-40">
          <Input
            onKeyDown={(e) => e.stopPropagation()}
            onChange={(e) => setSearch(e.currentTarget.value)}
            value={search}
            className="relative box-border pl-8 text-font-subtle"
          />
          <span className="absolute left-2 top-1/2 -translate-y-1/2">
            <PiMagnifyingGlassBold />
          </span>
        </div>
        <Select.ScrollUpButton />
        <Select.Viewport>
          {sortedCountries.map(([id, country]: [string, ICountry]) => (
            <Select.Item
              key={id}
              value={id}
              className={clsx({
                'pr-4 focus:bg-brand/40': true,
                hidden: !isFilteredCountry(country),
              })}
            >
              <span className="font-noto-emoji">{getEmojiFlag(id as TCountryCode)}</span>
              <Select.ItemText className="mr-2">{country.name}</Select.ItemText>
              <Select.ItemIndicator className="!right-2" />
            </Select.Item>
          ))}
        </Select.Viewport>
        <Select.ScrollDownButton />
      </Select.Content>
    </Select.Root>
  );
};

interface Props {
  onCountrySelected: (country: string) => void;
}
