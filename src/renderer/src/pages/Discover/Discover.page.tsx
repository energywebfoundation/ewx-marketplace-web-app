import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@ewf/components/Header';
import { Layout } from '@ewf/components/Layout';
import { useExperimentalMode } from '@ewf/stores/experimental-mode';
import { routerConst, Section, useDiscoverSection } from '@ewf/lib/router';
import { Balance } from './Balance';
import { Sidebar } from './Sidebar';
import { Hero } from './Hero';
import { WorkerList } from './WorkerList';
import { SocialMediaCard } from './SocialMedia/SocialMediaCard/SocialMediaCard';
import { useRemoteResourcesStore } from '@ewf/stores/remote-resources';
import { useDeepLink } from '@ewf/stores/deep-link';
import { useSolutionGroupsStore } from '@ewf/stores/solution-groups';
import { ConnectUserWallet } from '@ewf/components/ConnectUserWallet';
import { useConnectionStore } from '@ewf/stores/connection';

export const DiscoverPage = (): JSX.Element => {
  const isConnected = useConnectionStore((state) => state.isConnected);
  const solutionGroups = useSolutionGroupsStore((state) => state.solutionGroups);
  const whiteList = useSolutionGroupsStore((state) => state.whitelistedSolutionGroupIds);
  const isLoading = useSolutionGroupsStore((state) => state.isLoading);
  const isExperimental = useExperimentalMode((state) => state.isExperimental);
  const fetchSolutionGroups = useSolutionGroupsStore((state) => state.fetchSolutionGroups);
  const fetchHeroBannerSteps = useRemoteResourcesStore((state) => state.fetchHeroBannerSteps);
  const fetchWorkerCardImages = useRemoteResourcesStore((state) => state.fetchWorkerCardImages);
  const deepLinkStatus = useDeepLink((state) => state.status);
  const navigate = useNavigate();
  const { section, setSection } = useDiscoverSection();

  const filterSolutionGroups = () => {
    const solutionGroupsBySection =
      section === Section.Favourites
        ? solutionGroups.filter((sg) => sg.isFavourites)
        : solutionGroups;

    return isExperimental
      ? solutionGroupsBySection
      : solutionGroupsBySection.filter((sg) => whiteList.includes(sg.id));
  };

  // Fetch data on page load
  useEffect(() => {
    fetchHeroBannerSteps();
    fetchWorkerCardImages();
    fetchSolutionGroups();
  }, [fetchHeroBannerSteps, fetchWorkerCardImages, fetchSolutionGroups]);

  useEffect(() => {
    if (section === Section.Favourites && !isConnected) {
      setSection(Section.Discover);
    }
  }, [section, isConnected, setSection]);

  const filteredSolutionGroups = filterSolutionGroups();

  return (
    <main className="min-h-[100vh] py-4 bg-radial-gradient">
      <ConnectUserWallet
        isOpen={deepLinkStatus === 'connect'}
        setIsOpen={(isOpen) => useDeepLink.setState({ status: isOpen ? 'connect' : 'idle' })}
        onSuccess={() => navigate(routerConst.Dashboard)}
      />
      <Layout>
        <Header />
        <div className="mt-8 flex gap-8">
          {/* TOP MARGIN: page top padding (4*4px) + header height (64px) + body top margin (8*4px) = 112px */}
          <section className="sticky top-[112px] -mb-4 -mr-1 flex h-[calc(100vh-112px)] min-w-[264px] flex-col gap-8 overflow-y-auto pb-4 pr-1">
            <Balance />
            <Sidebar />
          </section>
          <section className="flex flex-grow flex-col gap-8">
            <Hero />
            <WorkerList isLoading={isLoading} workers={filteredSolutionGroups} />
            <SocialMediaCard />
          </section>
        </div>
      </Layout>
    </main>
  );
};
