import { create } from 'zustand';
import {
  TxStatus,
  OnFinishData,
  ExtrinsicModule,
  ExtrinsicMethod,
  executePalletTransaction,
} from './tx';

type SignUpOperatorgStore = {
  status: TxStatus;
  isOperatorSignedUp?: boolean;
  errorMsg?: string;
  signUpOperator: (
    name: string,
    location: string,
    onFinish: (onFinishData: OnFinishData) => void,
  ) => Promise<void>;
  reset: () => void;
};

export const useSignUpOperatorStore = create<SignUpOperatorgStore>((set) => ({
  status: 'idle',
  isOperatorSignedUp: undefined,
  signUpOperator: async (
    name: string,
    location: string,
    onFinish: (onFinishData: OnFinishData) => void,
  ) => {
    executePalletTransaction({
      setStatus: (status: TxStatus) => set({ status }),
      extrinsicModule: ExtrinsicModule.WorkerNodePallet,
      extrinsicMethod: ExtrinsicMethod.SignupWorkerNodeOperator,
      payload: [name, location],
      onFinish,
    });
  },
  reset: () => set({ status: 'idle', errorMsg: undefined }),
}));
