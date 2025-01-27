import { create } from 'zustand';
import Joi from 'joi';
import { useWalletEnvStore } from './wallet-env';
import { useApiServiceStore } from '@ewf/stores/api';
import { WorkerApi } from '@ewf/types/api';

type RemoteResourcesStore = {
  isInitialized: boolean;
  intervalId: NodeJS.Timeout | undefined;
  init: () => void;
  cleanUp: () => void;
  isLoading: boolean;
  fetchData: () => Promise<void[]>;
  heroBannerSteps: HeroBannerStepProps[];
  fetchHeroBannerSteps: () => Promise<void>;
  workerCardImages: WorkerCardImages;
  fetchWorkerCardImages: () => Promise<void>;
  blacklistedWorkers: WorkerApi.WorkerId[];
  fetchBlacklistedSolutionGroups: () => Promise<void>;
};

type WorkerCardImages = Record<'small' | 'large', Record<string, string>>;

export type HeroBannerStepProps = {
  href?: string;
  image: string;
  title: {
    type: 'text' | 'gradient' | 'image' | 'breakline';
    value?: string;
  }[];
  description?: {
    type: 'text' | 'breakline';
    value?: string;
  }[];
};

export const useRemoteResourcesStore = create<RemoteResourcesStore>((set, get) => ({
  isInitialized: false,
  intervalId: undefined,
  init: async () => {
    if (get().isInitialized) return;
    set({ isInitialized: true, isLoading: true });

    get()
      .fetchData()
      .finally(() => set({ isLoading: false }));

    const TIME_IN_MINUTES = 15;
    const intervalId = setInterval(() => get().fetchData(), TIME_IN_MINUTES * 60 * 1000);
    set({ intervalId });

    useWalletEnvStore.subscribe((state, prevState) => {
      if (state.env !== prevState.env) {
        get().fetchData();
      }
    });
  },
  cleanUp: () => {
    set({ isInitialized: false });
    clearInterval(get().intervalId);
  },
  isLoading: false,
  fetchData: async () => {
    const apiIsInitialized = useApiServiceStore.getState().isInitialized;
    if (!apiIsInitialized) {
      console.error('API service is not initialized');
      return [];
    }
    return Promise.all([
      get().fetchHeroBannerSteps(),
      get().fetchWorkerCardImages(),
      get().fetchBlacklistedSolutionGroups(),
    ]).finally(() => set({ isLoading: false }));
  },
  heroBannerSteps: [],
  fetchHeroBannerSteps: async () => {
    const workerApi = useApiServiceStore.getState().api;
    workerApi
      .getHeroBannerUrl()
      .then((url) => fetch(url, { cache: 'no-cache' }))
      .then((response) => response.json())
      .then((data: HeroBannerStepProps[]) => {
        const fallbackStep: HeroBannerStepProps = {
          href: 'https://www.energyweb.org/energywebx',
          image: '',
          title: [
            {
              type: 'text',
              value: 'Fallback title',
            },
          ],
          description: [
            {
              type: 'text',
              value: 'Fallback description',
            },
          ],
        };
        const fileSchema = Joi.array();
        const { error: fileError } = fileSchema.validate(data);
        if (fileError) {
          console.error('Hero banner file - ', fileError);
          set({ heroBannerSteps: [fallbackStep] });
          return;
        }

        const stepSchema = Joi.object({
          href: Joi.string().optional(),
          image: Joi.string().required(),
          title: Joi.array()
            .items(
              Joi.object({
                type: Joi.string().valid('text', 'gradient', 'image', 'breakline').required(),
                value: Joi.string().optional(),
              }),
            )
            .required(),
          description: Joi.array()
            .items(
              Joi.object({
                type: Joi.string().valid('text', 'breakline').required(),
                value: Joi.string().optional(),
              }),
            )
            .optional(),
        });
        const validatedSteps: HeroBannerStepProps[] = [];
        data.forEach((step) => {
          const { error: stepError } = stepSchema.validate(step);
          if (stepError) {
            console.error('Hero banner step - ', stepError);
            return;
          }
          validatedSteps.push(step);
        });
        if (validatedSteps.length === 0) {
          validatedSteps.push(fallbackStep);
        }

        set({ heroBannerSteps: validatedSteps });
      })
      .catch((err) => console.error(err));
  },
  workerCardImages: {
    small: {},
    large: {},
  },
  fetchWorkerCardImages: async () => {
    const schema = Joi.object({
      small: Joi.object().pattern(Joi.string(), Joi.string()).required(),
      large: Joi.object().pattern(Joi.string(), Joi.string()).required(),
    });
    const workerApi = useApiServiceStore.getState().api;
    workerApi
      .getWorkerCardUrl()
      .then((url) => fetch(url, { cache: 'no-cache' }))
      .then((response) => response.json())
      .then((data: WorkerCardImages) => {
        const { error } = schema.validate(data);
        if (error) {
          console.error('Worker card images - ', error);
          return;
        }
        set({ workerCardImages: data });
      })
      .catch((err) => console.error(err));
  },
  blacklistedWorkers: [],
  fetchBlacklistedSolutionGroups: async () => {
    const schema = Joi.object({
      blacklistedSolutions: Joi.array().items(Joi.string().required()),
    });
    const workerApi = useApiServiceStore.getState().api;
    workerApi
      .getBlacklistedSolutionGroupsUrl()
      .then((url) => fetch(url, { cache: 'no-cache' }))
      .then((response) => response.json())
      .then((data: { blacklistedSolutions: WorkerApi.WorkerId[] }) => {
        const { error } = schema.validate(data);
        if (error) {
          console.error('Blacklisted workers - ', error);
          return;
        }
        set({ blacklistedWorkers: data.blacklistedSolutions });
      })
      .catch((err) => console.error(err));
  },
}));
