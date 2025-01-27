import { mergeConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';
import { type StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../src/renderer/src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/renderer/src/pages/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/renderer/src/stories/**/*.mdx',
    '../src/renderer/src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    'storybook-addon-react-router-v6',
  ],
  core: {
    builder: '@storybook/builder-vite',
  },
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  staticDirs: ['../src/renderer/src/assets'],
  viteFinal: async (config) => {
    return mergeConfig(config, {
      plugins: [tsConfigPaths()],
    });
  },
};

export default config;
