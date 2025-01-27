import { useState } from 'react';
import { useSignUpOperatorStore } from '@ewf/stores/sign-up-operator';
import { useNotificationStore } from '@ewf/stores/notifications';
import { TxExecuting } from '@ewf/components/TxExecuting';
import { TxSuccess } from '@ewf/components/TxSuccess';
import { TxFailure } from '@ewf/components/TxFailure';
import { useWalletEnvStore } from '@ewf/stores/wallet-env';
import { formatPalletErrorMessage } from '@ewf/lib/utils';
import { SignUp } from './SignUp';

type Step = 'signup' | 'executing' | 'success' | 'failure';

export const OperatorSignUp = ({ onFinish, onClose }: Props): React.ReactNode => {
  const [step, setStep] = useState<Step>('signup');
  const [errorMsg, setErrorMsg] = useState('');
  const [txUrl, setTxUrl] = useState('');
  const walletConst = useWalletEnvStore((state) => state.walletConst);
  const status = useSignUpOperatorStore((state) => state.status);
  const signUpOperator = useSignUpOperatorStore((state) => state.signUpOperator);
  const reset = useSignUpOperatorStore((state) => state.reset);
  const operatorSignupSuccessNotification = useNotificationStore(
    (state) => state.operatorSignupSuccessNotification,
  );
  const operatorSignupErrorNotification = useNotificationStore(
    (state) => state.operatorSignupErrorNotification,
  );

  const onOperatorSignupFinish = () => {
    setTimeout(() => reset(), 500);
    onFinish();
  };
  const onOperatorSignupClose = () => {
    setTimeout(() => reset(), 500);
    onClose();
  };

  const onEnterData = async (name: string, country: string) => {
    setStep('executing');

    try {
      await signUpOperator(name, country, ({ status, errorMsg, blockHash }) => {
        if (status === 'success') {
          useSignUpOperatorStore.setState({ isOperatorSignedUp: true });
          setTxUrl(`${walletConst.ewxExplorerUrl}/${blockHash}`);
          setStep('success');
          operatorSignupSuccessNotification();
        } else {
          setErrorMsg(errorMsg ? formatPalletErrorMessage(errorMsg) : 'An unknown error occurred');
          setStep('failure');
          operatorSignupErrorNotification();
        }
      });
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setErrorMsg(error.message);
      } else if (typeof error === 'object' && error?.['message']) {
        setErrorMsg(error['message']);
      } else {
        setErrorMsg('An unknown error occurred');
      }
      setStep('failure');
      operatorSignupErrorNotification();
    }
  };

  const stepComponents: Record<Step, React.ReactNode> = {
    signup: <SignUp onEnterData={onEnterData} onClose={onOperatorSignupClose} />,
    executing: <TxExecuting operation="operator-signup" txStatus={status} />,
    success: (
      <TxSuccess
        txUrl={txUrl}
        operation="operator-signup"
        onNext={onOperatorSignupFinish}
        onClose={onOperatorSignupClose}
      />
    ),
    failure: (
      <TxFailure operation="operator-signup" onClose={onOperatorSignupClose} message={errorMsg} />
    ),
  };

  return stepComponents[step];
};

interface Props {
  onFinish: () => void;
  onClose: () => void;
}
