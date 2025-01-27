import * as dotenv from 'dotenv';
import * as Joi from 'joi';

dotenv.config();

if (process.env.IGNORE_ENV_VALIDATION) {
  process.exit(0);
}

const VALIDATION_SCHEMA = Joi.object({
  NODE_ENV: Joi.string().valid('production', 'development').optional(),
  MAIN_WINDOW_ID: Joi.string().optional(),
  WC_PROJECT_ID: Joi.string().required(),
  VOLTA_RPC_ENDPOINT: Joi.string().uri({
    scheme: 'https',
  }),
  AVT_CONTRACT_ADDRESS: Joi.string().required(),
  EWC_CHAIN_ID: Joi.number().positive().required(),
  WC_RELAY_URL: Joi.string()
    .uri({
      scheme: 'wss',
    })
    .required(),
  SMART_CONTRACT: Joi.string().required(),
  POLKADOT_ENDPOINT: Joi.string()
    .uri({
      scheme: ['wss', 'https', 'ws', 'http'],
    })
    .required(),
  POLKADOT_PALLET_ENDPOINT: Joi.string()
    .uri({
      scheme: ['wss', 'https', 'ws', 'http'],
    })
    .required(),
  EWX_CHAIN_ID: Joi.string().required(),
  ENVIRONMENT: Joi.string().optional(),
  EWX_ADDRESS: Joi.string().optional(),
  IPFS_URL: Joi.string()
    .uri({
      scheme: 'https',
    })
    .required(),
  IPFS_API_KEY: Joi.string().required(),
  IPFS_SECRET_KEY: Joi.string().required(),
  IPFS_CONTEXT_PATH: Joi.string().required(),
  CRON_JOB_SCHEDULE_BASE: Joi.string().optional(),
  CRON_JOB_SCHEDULE_USER: Joi.string().optional(),
  CRON_JOB_SCHEDULE_FLOW: Joi.string().optional(),
  CRON_JOB_SCHEDULE_EARNED: Joi.string().optional(),
  CRON_JOB_SCHEDULE_NETWORK: Joi.string().optional(),
  CRON_JOB_SCHEDULE_PERIOD: Joi.string().optional(),
  CRON_JOB_SCHEDULE_HEALTHY: Joi.string().optional(),
  CRON_JOB_SCHEDULE_ENGINE: Joi.string().optional(),
  WHITELIST_URL: Joi.string().optional(),
  EWX_CHECK_UA: Joi.string().required(),
  EWC_EXPLORER_URL: Joi.string().optional(),
  EWX_EXPLORER_URL: Joi.string().optional(),
  ELECTRON_RENDERER_URL: Joi.string().optional(),
  DEBUG_CONSSOLE: Joi.string().optional(),
  NODES_DENY_LIST: Joi.string().optional(),
  REQ_EWX_SLEEP: Joi.string().optional(),
});

const result = VALIDATION_SCHEMA.validate(process.env, {
  stripUnknown: true,
});

if (result.error) {
  console.error(result.error);

  process.exit(1);
}

console.info('validation successful');
