import { DiscordHelpCentre } from '../DiscordHelpCentre';
import { EWCard } from '../EnergywebCard/EnergywebCard';
import { EWXCard } from '../EWXCard/EWXCard';
import { GithubCard } from '../GithubCard/GithubCard';

export const SocialMediaCard = (): JSX.Element => {
  return (
    <div className="grid grid-cols-2 gap-4 rounded-lg bg-gray-90 p-6 shadow">
      <DiscordHelpCentre></DiscordHelpCentre>
      <div className="ml-2 flex flex-col justify-end">
        <p className="mb-6 text-lg">Social Media</p>
        <div className="flex justify-center">
          <EWCard></EWCard>
          <EWXCard></EWXCard>
          <GithubCard></GithubCard>
        </div>
      </div>
    </div>
  );
};
