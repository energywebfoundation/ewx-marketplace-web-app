import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://ewx-subsquid-dev.energyweb.org/graphql',
  documents: ['src/**/*.ts'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    'src/renderer/src/lib/indexer/gql/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;
