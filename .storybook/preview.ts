import type { Preview } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';
import { layoutWrapper } from './utils';
import '../src/renderer/src/styles/globals.css';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Components', 'Features', 'Pages', 'Design System'],
      },
    },
  },
  decorators: [withRouter, (Story) => layoutWrapper(Story)],
};

export default preview;
