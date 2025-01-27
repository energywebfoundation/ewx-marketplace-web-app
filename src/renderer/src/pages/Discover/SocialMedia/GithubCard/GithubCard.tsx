import { GithubSocialButton } from '@ewf/components/Button/SocialButtons/GithubButton';

export const GithubCard = (): JSX.Element => {
  return (
    <div className="group h-[120px] w-full max-w-[120px] rounded-lg bg-gray-80 px-4 py-5 shadow-sunken">
      <p className="mb-5 mt-1 text-center">Github</p>
      <div className="flex justify-center">
        <GithubSocialButton></GithubSocialButton>
      </div>
    </div>
  );
};
