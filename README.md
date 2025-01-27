<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://energywebx.com">
    <img src="/images/ewx-logo.png" alt="Logo" width="160" height="160">
  </a>

  <h3 align="center">EWX Marketplace</h3>

  <p align="center">
    A desktop dApp to access everything happens on the EWX ecosystem
    <br />
    <br />
    <a href="https://energywebx.com/download">Download</a>
    ·
    <a href="https://energywebx.com/">User Manual</a>
    ·
    <a href="https://energywebx.com/">Docs</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#run">Run</a></li>
        <li><a href="#build">Build</a></li>
      </ul>
    </li>
    <li><a href="#achitecture">Architecture</a></li>
    <li><a href="#faq">FAQ</a></li>
    <li><a href="#troubleshoot">Troubleshoot</a></li>
    <li><a href="#security-audit">Security Audits</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project <a id="about-the-project"></a>

<div align="center">
  <a href="https://energywebx.com">
    <img src="/images/ss-1.png" alt="Logo" width="960" height="660">
  </a>
</div>
</br>

#### Overview

The EWX Marketplace, a decentralized desktop application (dApp), serves as a comprehensive gateway to the dynamic EWX ecosystem. Our platform is designed to facilitate seamless interactions within the EWX, offering an intuitive interface for managing digital assets and engaging with decentralized services. This repo refers only to the web app, not to the desktop app.

#### Key Features

- **EWT Bridge (Lifting & Lowering):** Our dApp provides a robust interface for efficient EWT transfers between chains in our ecosystem - the Energy Web Chain (EWC) and EWX. This feature simplifies the process of asset migration, ensuring a smooth user experience.
- **Galaxy Subscriptions (Solution Groups):** Engage directly with worker node networks through our unique subscription model. Users can participate in decentralization efforts, run worker node flows included in the solution groups, and earn rewards for their contributions.
- **Worker Node Management:** We offer a suite of tools allowing users to manage their subscribed Galaxy Subscriptions effectively. These include options to unsubscribe, start/stop worker node flows, claim rewards, and view reward history.
- **User-Friendly Interface:** We prioritize user experience, ensuring our platform is accessible to both novices and experienced users in the blockchain space.
- **Advanced Security Measures:** Security is a cornerstone of our application, implemented through cutting-edge protocols to safeguard user data and transactions.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started <a id="getting-started"></a>

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

#### Installation <a id="installation"></a>

1. Clone the repo

```sh
git clone https://github.com/energywebfoundation/ewx-marketplace-web-app.git
```

2. Open the web application folder

```sh
cd ew-marketplace
```

3. Install NPM packages

```sh
npm install
```

4. Fill the environment variables, `.env` template can be found [here](https://github.com/energywebfoundation/ew-marketplace/blob/develop/.env.template).

5. Open the web application folder

```sh
cd src/web
```

6. Install NPM packages

```sh
npm install
```

7. Fill also the environment variables of the web app, `.env` template can be found [here](https://github.com/energywebfoundation/ewx-marketplace-web-app/blob/master/src/web/.env.template). Note the `VITE_` prefix.

8. Run the project. While being on the `/src/web` folder, execute the following command

```sh
npm run dev
```

### Environment variables
| Name                                 | Sample Value                                                                                                 | Description                               |
|--------------------------------------|--------------------------------------------------------------------------------------------------------------|-------------------------------------------|
| SERVICE_NAME                         | EWF-MARKET                                                                                                   | Marketplace service name                  |
| SERVICE_ACCOUNT                      | EWF-MARKET-WORKER                                                                                            | Marketplace service account               |
| POLKADOT_ENDPOINT                    | https://wnp-rpc.mainnet.energywebx.com                                                                       | Polkadot public endpoint                  |
| POLKADOT_PALLET_ENDPOINT             | https://wnp-rpc.mainnet.energywebx.com                                                                       | Polkadot public endpoint                  |
| VOLTA_RPC_ENDPOINT                   | https://rpc.energyweb.org                                                                                    | Volta RPC endpoint                        |
| VOLTA_WS_ENDPOINT                    | wss://rpc.energyweb.org/ws                                                                                   | Volta WebSocket endpoint                  |
| SYMMETRIC_ALGORITHM                  | aes-256-cbc                                                                                                  | Symmetric Algorithm                       |
| IPFS_API_KEY                         |                                                                                                              | IPFS API Key                              |
| IPFS_SECRET_KEY                      |                                                                                                              | IPFS Secret Key                           |
| IPFS_URL                             | https://ipfs.infura.io:5001                                                                                  | IPFS URL                                  |
| IPFS_CONTEXT_PATH                    | /api/v0/cat?arg=                                                                                             | IPFS Context Path                         |
| SMART_CONTRACT                       |                                                                                                              | Smart Contract address                    |
| WC_PROJECT_ID                        | ba592d626408bb37e94c6a69ab611dab                                                                             | WalletConnect project ID                  |
| AVT_CONTRACT_ADDRESS                 | 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee                                                                   | Aventus contract address                  |
| EWC_CHAIN_ID                         | 246                                                                                                          | Energy Web Chain ID                       |
| EWX_CHAIN_ID                         | 5a51e04b88a4784d205091aa7bada002                                                                             | Energy Web X Chain ID                     |
| WC_RELAY_URL                         | wss://relay.walletconnect.com                                                                                | WalletConnect Relay Websocket URL         |
| ELECTRON_ENABLE_SECURITY_WARNINGS    | true                                                                                                         | Enable Electron security warnings         |
| CRON_JOB_SCHEDULE_BASE               | */1 * * * *                                                                                                  | Refresh solutions cron job                |
| CRON_JOB_SCHEDULE_USER               | */30 * * * * *                                                                                               | Refresh subscription cron job             |
| CRON_JOB_SCHEDULE_FLOW               | */30 * * * * *                                                                                               | Refresh flow cron job                     |
| CRON_JOB_SCHEDULE_EARNED             | */30 * * * *                                                                                                 | Refresh earned rewards cron job           |
| CRON_JOB_SCHEDULE_NETWORK            | */30 * * * * *                                                                                               | Refresh network cron job                  |
| CRON_JOB_SCHEDULE_PERIOD             | */30 * * * * *                                                                                               | Refresh period cron job                   |
| CRON_JOB_SCHEDULE_HEALTHY            | */30 * * * * *                                                                                               | Refresh validate solution active cron job |
| CRON_JOB_SCHEDULE_ENGINE             | */15 * * * *                                                                                                 | Refresh worker engine status cron job     |
| EWX_CHECK_UA                         | ewx-marketplace                                                                                              | User Agent                                |
| WHITELIST_URL                        | https://marketplace-cdn.energyweb.org/ewf_marketplace_whitelist.json                                         | Whitelist URL                             |
| EWC_EXPLORER_URL                     | 'https://explorer.energyweb.org/tx'                                                                          | Energy Web Chain Explorer URL             |
| EWX_EXPLORER_URL                     | 'https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpublic-rpc.mainnet.energywebx.com%2F#/explorer/query'         | Energy Web X Explorer URL                 |
| COINGECKO_EWT_USD_API_URL            | https://api.coingecko.com/api/v3/simple/price?ids=energy-web-token&vs_currencies=Usd                         | CoinGecko EWT to USD price API            |
| IS_TEST_VERSION                      | true                                                                                                         | Is Test Version                           |
| HERO_BANNER_DATA_URL                 | https://marketplace-cdn.energyweb.org/remote-resources/hero-banner/hero-banner-data.json                     | Hero Banner URL                           |
| WORKER_CARD_DATA_URL                 | https://marketplace-cdn.energyweb.org/remote-resources/worker-card/worker-card-data.json                     | Worker Card URL                           |
| NOTIFICATIONS_DATA_URL               | https://marketplace-cdn.energyweb.org/remote-resources/notifications/notifications.json                      | Notifications URL                         |
| BLACKLISTED_SOLUTION_GROUPS_DATA_URL | https://marketplace-cdn.energyweb.org/remote-resources/blacklisted-solutions/blacklisted-solutions-data.json | Blacklisted Solution Groups URL           |

#### Run <a id="run"></a>

1. Run the application in development mode

```sh
npm run dev
```

2. Run the Storybook to view frontend components

```sh
npm run storybook
```

#### Build <a id="build"></a>

1. Create a build by selecting a OS tag, currently available tags are `mac`, `win` and `linux`. This command will output both the installer and the executable version of the application in the `/dist` folder.

```sh
npm run build:<os_tag>
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Architecture <a id="achitecture"></a>

<div align="center">
  <a href="https://energywebx.com">
    <img src="/images/ss-2.png" alt="Logo" width="960" height="500">
  </a>
</div>
</br>

The EW Marketplace app is made with [Electron](https://www.electronjs.org) and Typescript, using React as frontend framework and [Vite](https://vitejs.dev/) as bundler. To bootstrap the project we have used [Electron Vite](https://electron-vite.org/ 'Electron-vite') for a pre-made setup. The main project config is located at the `electron.vite.config.ts` file. The Typescript configuration is splitted between the frontend and the backend, having two config files: `tsconfig.web.json` and `tsconfig.node.json`. Details related to application compilation can be found in the `electron-builder.yml`, such as OS tag specifications, output files and naming, etc.

The main code can be found under the `/src` folder. The project structure follows the Electron-vite recommendation, having three sections:

#### Main

The Node.js backend code can be found in the `/src/main` folder. This is also the entry point for the application, everything related to the main Electron process is located in this folder.

#### Preload

Contains the scripts that will run right after the web process is executed. It is used as a bridge between the main and the renderer process. Exposes the API to the renderer process via `window` object. Is located at `/src/preload`, and its entry point is `index.ts`.

#### Renderer

Here can be found the frontend code. Is a standard React + Vite application.

The frontend is built with React + Typescript, using [Vite](https://vitejs.dev/) as bundler. It uses [TailwindCSS](https://tailwindcss.com/) for styling and [Radix UI](https://www.radix-ui.com/) to build some accesible components, such as dropdowns and dialogs. Routing is handled with [React Router](https://reactrouter.com).

The entry point for the application is the `/renderer/index.html` file. The main code is under the `/renderer/src` folder, where the entry JS file is `main.tsx`. Under the `/src` folder, the project is structured as following:

- `/assets`: Contains all the assets (images, fonts, etc.).
- `/components`: Both small or large components/containers that are reused accross multiple places in the app. Each component is in its own folder, with a barrel file (index.ts that exports the component to abbreviate import path) and a Storybook file ({componentName}.stories.tsx).
- `/lib`:
  - Electron API interface
  - Routing constants (paths)
  - Wallet constants (project Ids, RPC endpoints, ABI, etc.)
  - Utils
- `/pages`: Complete page that will be rendered on each route endpoint. If the page has sub components that will only be used on that page, they can be placed here.
- `/stores`: If some data must be accessed/updated accross different part of the apps, it will be contained in some store. Must info in the 'Store' section.
- `/stories`: General stories that are not related with any specific components. Here are placed Design System, colors, etc.
- `/styles`: Anything related to global styles.
- `main.tsx`: Entry point for the React application.

##### Store - shared global data

The store is a global state management system that allows to share data between components. It is implemented using [Zustand](https://zustand.surge.sh/), a small and fast state management library. The stores are located in the `/src/stores` folder, and they are separated into different modules, such as `connection`, `balance`, `notifications`, `address-book`, `notifications`, etc. The goal is, instead of having one very large single store, split them into smaller and more manageable ones. Also, all the chain interaction operations have its own store, being the following:

- `lifting`
- `lowering`
- `staking`
- `unstaking`
- `claim-rewards`
- `sign-up-operator`
- `link-up-ewx-worker`

These particular stores implements a very similar structure, having a `status` variable that indicates the current state of the operation, alongside with the main function that triggers the operation (e.g. `lift`, `lower`, `stake` etc.) and a `reset` function that resets the store to its initial state. For the EWX operations (all of the above except for `lifting`), the transaction code is abstracted in the `tx` file, which is not a store but a helper module. The goal was to homogeneous the transaction process, so practically the same code can be used for all the operations.

Each store is a hook that can be imported and used in any component. They are constructed using the Zustand's `create` function, which accepts a type definition for the store. Inside the `create` function, there are available the `get` and `set` functions, which are used to get the current state and update the store, respectively. In order to interact with with some external store from within a store, it's as simple as importing the store and using it as a hook. In this case, to get and update the external store it's needed to use the `.getState()` and `.setState()` methods. Here's an example:

`balance.ts` Balance store:

```typescript
import { create } from 'zustand';

type BalanceStore = {
  balance: number;
};

export const useBalanceStore = create<BalanceStore>(() => ({
  balance: 0, // Initial state
}));
```

`connection.ts` Connection store:

```typescript
import { create } from 'zustand';
import { useBalanceStore } from './balance';

type ConnectionStore = {
  isConnected: boolean;
  connect: () => void;
  sendTokens: (amount: number) => void;
};

export const useBalanceStore = create<ConnectionStore>((get, set) => ({
  isConnected: false,
  connect: async () => {
    // Simulate getting the balance async from the chain
    const balance = await ...;
    // Updating internal store
    set({ isConnected: true });
    // Updating external store
    useBalanceStore.setState({ balance });
  },
  sendTokens: async (amount: number) => {
    // Accessing internal store
    const { isConnected } = get();
    // It's also possible to do:
    const isConnected = get().isConnected;

    if (!isConnected) {
      throw new Error('Not connected');
    }

    // Accessing external store
    const { balance } = useBalanceStore.getState();
    // It's also possible to do:
    const balance = useBalanceStore.getState().balance;

    if (balance < amount) {
      throw new Error('Insufficient balance');
    }

    await ...
  }
}));
```

`BalanceComponent.tsx` Balance React component:

```typescript
export const BalanceComponent = () => {
  const balance = useBalanceStore((state) => state.balance);
  // It's also possible to do:
  const { balance } = useBalanceStore();
  // However, this second approach will re-render the component every time the store changes, even though that particular variable has not changed.

  return <div>Balance: {balance}</div>;
};
```

With Zustand there is no need to use a provider, as the store is a hook that can be imported and used in any component. The store is automatically updated when the state changes, and the components that are using the store are re-rendered. However, it's useful to execute some functions only once, when the app is mounted. It's, for example, the case of Electron backend listener, implemented via `window.Api.on('event', callback)`. Those listener should only be initialized once, so as a convention, the stores may have an `init` function that serves as a constructor, alongside with an `isInitialized` variable that indicates if the store is already initialized, and a `cleanUp` function that serves as a destructor. All the `init` functions are executed inside a `useEffect` in a component called `StoreInitializer`, which is placed in the `main.tsx` file, wrapping all the application. When this component is unmounted, the `cleanUp` functions are executed. This is probably not needed, since the `StoreInitializer` component only will be unmounted on app reload, but it's a nice-to-have measure just in case to prevent initialize some store twice.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- FAQ -->

## FAQ <a id="faq"></a>

- How can I get Volta Token (VT) for testing?

  - You can visit [Volta Faucet](https://voltafaucet.energyweb.org/) and request a VT for testing.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- TROUBLESHOOT -->

## Troubleshoot <a id="troubleshoot"></a>

- If there is a DB change happened after develop branch is cloned to local; run the below command before running the project:

```bash
npx prisma generate
```

- If there is a major DB change happened after develop branch is cloned to local; delete the `app.db` under `/prisma` directory and run the below command to force the DB change on local:

```bash
npx prisma db push
```

- (Only works on macOS) If you need to mimic fresh install run the below bash script; it will delete all application specific folders:

```bash
#!/bin/bash

# Define the directories to be deleted
DIR1="$HOME/.node-red"
DIR2="$HOME/library/Application Support/EnergyWeb Marketplace"
DIR3="$HOME/library/Application Support/EnergyWeb Marketplace (development)"

# Function to delete a directory
delete_directory() {
    if [ -d "$1" ]; then
        echo "Deleting $1..."
        rm -rf "$1"
        echo "DELETED."
    else
        echo "$1 does not exist."
    fi
}

# Delete the directories
delete_directory "$DIR1"
delete_directory "$DIR2"
delete_directory "$DIR3"

echo "Deletion process completed."
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- SECURITY AUDITS -->

## Security Audits <a id="security-audit"></a>

- [01.12.2023 Audit Report - cure53](https://github.com/energywebfoundation/ew-marketplace/) (Not Available Yet)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing <a id="contributing"></a>

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License <a id="license"></a>

This project is licensed under the GNU General Public License v3.0 or later - see the [LICENSE](/LICENSE) file for details

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact <a id="contact"></a>

- [X](https://x.com/xenergyweb)
- [Discord](https://discord.gg/psraNwqGqp)
- [Telegram](https://t.me/energyweb)

Project Link: [https://github.com/energywebfoundation/ew-marketplace/](https://github.com/energywebfoundation/ew-marketplace/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
