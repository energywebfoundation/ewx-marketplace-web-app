import * as dotenv from 'dotenv';
import * as Joi from 'joi';

dotenv.config();

if (process.env.IGNORE_ENV_VALIDATION) {
  process.exit(0);
}

const VALIDATION_SCHEMA = Joi.object({
  VITE_WC_PROJECT_ID: Joi.string().required(),
  VITE_VOLTA_RPC_ENDPOINT: Joi.string().uri({
    scheme: 'https',
  }),
  VITE_AVT_CONTRACT_ADDRESS: Joi.string().required(),
  VITE_EWC_CHAIN_ID: Joi.number().positive().required(),
  VITE_WC_RELAY_URL: Joi.string()
    .uri({
      scheme: 'wss',
    })
    .required(),
  VITE_SMART_CONTRACT: Joi.string().required(),
  VITE_POLKADOT_ENDPOINT: Joi.string()
    .uri({
      scheme: ['wss', 'https'],
    })
    .required(),
  VITE_POLKADOT_PALLET_ENDPOINT: Joi.string()
    .uri({
      scheme: ['wss', 'https'],
    })
    .required(),
  VITE_EWX_CHAIN_ID: Joi.string().required(),
  VITE_ENVIRONMENT: Joi.string().optional(),
  VITE_IPFS_URL: Joi.string()
    .uri({
      scheme: 'https',
    })
    .required(),
  VITE_IPFS_API_KEY: Joi.string().required(),
  VITE_IPFS_SECRET_KEY: Joi.string().required(),
  VITE_IPFS_CONTEXT_PATH: Joi.string().required(),
  VITE_WHITELIST_URL: Joi.string().optional(),
  VITE_EWX_CHECK_UA: Joi.string().required(),
  VITE_EWC_EXPLORER_URL: Joi.string().optional(),
  VITE_EWX_EXPLORER_URL: Joi.string().optional(),
  VITE_HERO_BANNER_DATA_URL: Joi.string()
    .uri({
      scheme: ['https', 'http'],
    })
    .required(),
  VITE_WORKER_CARD_DATA_URL: Joi.string()
    .uri({
      scheme: ['https', 'http'],
    })
    .required(),
  VITE_NOTIFICATIONS_DATA_URL: Joi.string()
    .uri({
      scheme: ['https', 'http'],
    })
    .required(),
  VITE_BLACKLISTED_SOLUTION_GROUPS_DATA_URL: Joi.string()
    .uri({
      scheme: ['https', 'http'],
    })
    .required(),
  VITE_IS_TEST_VERSION: Joi.string().optional(),
  VITE_DEV: Joi.string().optional(),
  VITE_INDEXER_URL: Joi.string().required(),
});

const result = VALIDATION_SCHEMA.validate(process.env, {
  stripUnknown: true,
});

if (result.error) {
  console.error(result.error);

  process.exit(1);
}

console.info('validation successful');
