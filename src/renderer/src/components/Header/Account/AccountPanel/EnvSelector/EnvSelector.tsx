import * as Select from '@ewf/components/Select';
import { useWalletEnvStore, MARKETPLACE_ENV } from '@ewf/stores/wallet-env';

export const EnvSelector = ({ onEnvChanged, onFailed }: Props): React.ReactNode => {
  const envs = Object.values(MARKETPLACE_ENV);
  const env = useWalletEnvStore((state) => state.env);
  const reloadEnv = useWalletEnvStore((state) => state.reloadEnv);

  const onSelectEnv = async (env: MARKETPLACE_ENV) => {
    onEnvChanged();

    try {
      await reloadEnv(env);
    } catch (error) {
      console.error(error);
      onFailed();
    }
  };

  return (
    <Select.Root onValueChange={onSelectEnv} value={env}>
      <Select.Trigger
        aria-label="Select environment"
        className="h-[40px] !rounded-full border-none !pl-3 !pr-3 text-base"
      >
        <Select.Value placeholder="ENV" />
        <Select.TriggerIcon size={16} />
      </Select.Trigger>
      <Select.Content position="popper" className="!rounded-md !pt-0">
        <Select.ScrollDownButton />
        <Select.Viewport>
          <Select.Group>
            {envs.map((env) => (
              <Select.Item
                key={env}
                value={env}
                className="flex items-center justify-between gap-2 !pr-10"
              >
                <Select.ItemText>{env}</Select.ItemText>
                <Select.ItemIndicator className="mb-1" />
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton />
      </Select.Content>
      {/* </Select.Portal> */}
    </Select.Root>
  );
};

interface Props {
  onEnvChanged: () => void;
  onFailed: () => void;
}
