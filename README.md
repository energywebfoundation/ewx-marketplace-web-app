<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://energywebx.com">
    <img src="/images/ewx-logo.png" alt="Logo" width="160" height="160">
  </a>

  <h3 align="center">EWX Marketplace Web App</h3>

  <p align="center">
    The web app version of EWX Marketplace desktop dApp which provides access to everything on the EWX ecosystem
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
    <li><a href="#faq">FAQ</a></li>
    <li><a href="#security-audit">Security Audits</a></li>
    <li><a href="#maintainers">Maintainers</a></li>
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

This project contains the web application version of the EWX Marketplace desktop application (dApp). It serves as a comprehensive gateway to the dynamic EWX ecosystem. Our platform is designed to facilitate seamless interactions within the EWX, offering an intuitive interface for managing digital assets and engaging with decentralized services. This has all the features available on the desktop application minus the ability to run workers on the device.

#### Key Features

- **EWT Bridge (Lifting & Lowering):** Our dApp provides a robust interface for efficient EWT transfers between chains in our ecosystem - the Energy Web Chain (EWC) and EWX. This feature simplifies the process of asset migration, ensuring a smooth user experience.
- **Galaxy Subscriptions (Solution Groups):** Engage directly with worker node networks through our unique subscription model. Users can participate in decentralization efforts, run worker node flows included in the solution groups, and earn rewards for their contributions.
- **Worker Node Management:** We offer a suite of tools allowing users to manage their subscribed Galaxy Subscriptions effectively. These include options to unsubscribe, monitor and claim rewards, and view reward history.
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

<!-- FAQ -->

## FAQ <a id="faq"></a>

- How can I get Volta Token (VT) for testing?

  - You can visit [Volta Faucet](https://voltafaucet.energyweb.org/) and request a VT for testing.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- SECURITY AUDITS -->

## Security Audits <a id="security-audit"></a>

- [01.12.2023 Audit Report - cure53](https://github.com/energywebfoundation/ew-marketplace/) (Not Available Yet)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MAINTAINERS -->

## Maintainers <a id="maintainers"></a>

- [Daniel Serrano](mailto:daniel.serrano@energyweb.org)
- [Justyna Łempicka-Wojno](mailto:justyna.lempicka-wojno@energyweb.org )
- [Nadia Adila](mailto:nadia.adila@energyweb.org)

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
