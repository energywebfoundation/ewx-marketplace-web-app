import { Button } from '@ewf/components/Button';
import { Link } from 'react-router-dom';

export const DiscordHelpCentre = (): JSX.Element => {
  return (
    <div className="group h-[198px] w-full max-w-[382px] rounded-lg bg-[url('@ewf/assets/images/discordhelpcentre.png')] bg-cover bg-no-repeat md:bg-[75%_0]">
      <div className="relative h-full rounded-lg p-6">
        <div className="relative z-10">
          <p className="mb-1 text-sm uppercase text-black">Discord Help Centre</p>
          <h2 className="mb-2 max-w-[200px] text-black">Need help?</h2>
          <p className="mb-4 max-w-[125px] text-sm text-black">
            Get in touch with our support team
          </p>
          <Link to="https://discord.gg/psraNwqGqp" target="_blank">
            <Button size="small" color="outlined-dark">
              Create a ticket
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
