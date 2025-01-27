import { useSearchParams } from 'react-router-dom';

export const routerConst = {
  Home: '/',
  Discover: '/discover',
  Favourites: '/discover?section=favourites',
  SolutionDetail: '/workers',
  Dashboard: '/dashboard',
} as const;

export enum Section {
  Discover = 'discover',
  Favourites = 'favourites',
}

export const useDiscoverSection = () => {
  const SECTION_SEARCH_PARAM = 'section' as const;
  const [searchParams, setSearchParams] = useSearchParams();
  const searchSection = searchParams.get(SECTION_SEARCH_PARAM) as Section | null;
  const section = (() => {
    const defaultSection = Section.Discover;

    if (!searchSection) {
      return defaultSection;
    }
    const isValidSection = Object.values(Section).includes(searchSection);

    if (!isValidSection) {
      return defaultSection;
    }
    return searchSection;
  })();

  const setSection = (section: Section) => {
    if (section === Section.Discover) {
      setSearchParams();
      return;
    }

    setSearchParams({ [SECTION_SEARCH_PARAM]: section });
  };

  return { section, setSection };
};
