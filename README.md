# Civil Share

A Web3 crowdfunding platform built on Ethereum, developed by [303Devs](https://github.com/303Devs). Civil Share allows users to connect their wallets, create fundraising campaigns with goals and deadlines, and fund campaigns in ETH — all powered by on-chain smart contracts.

**Live App:** [share.civilprotocol.io](https://share.civilprotocol.io)

---

## Tech Stack

![React](https://img.shields.io/badge/React_18-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Solidity](https://img.shields.io/badge/Solidity-363636?style=flat-square&logo=solidity&logoColor=white)
![Ethereum](https://img.shields.io/badge/Ethereum-3C3C3D?style=flat-square&logo=ethereum&logoColor=white)

### Client (React App)

| Category | Technology |
|---|---|
| Framework | React 18 + Vite |
| Language | TypeScript |
| Styling | Tailwind CSS, Tailwind Merge, clsx |
| Routing | react-router-dom |
| Web3 SDK | Thirdweb |
| Notifications | react-toastify |
| Utilities | react-confetti, react-use |

### Smart Contracts

| Category | Technology |
|---|---|
| Language | Solidity |
| Development Framework | Hardhat |
| Contract Versions | `CivilShare-Contract-V2/`, `web3/` |

---

## Features

- **Wallet Connection** — Connect any compatible Ethereum wallet via Thirdweb
- **Campaign Creation** — Create fundraising campaigns with a title, description, funding goal (ETH), deadline, and cover image
- **Campaign Discovery** — Browse all active campaigns with real-time funding progress
- **Fund Campaigns** — Contribute ETH directly to campaigns on-chain
- **Real-Time ETH Price** — Live Ethereum price display for context when contributing
- **User Dashboard** — View campaigns you've created and campaigns you've contributed to
- **Campaign Details** — Full campaign view with donator list and contribution history
- **Animated UI** — Custom components including animated buttons and text generation effects

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — featured and active campaigns |
| `/dashboard` | Personal dashboard — your campaigns and contributions |
| `/create-campaign` | Campaign creation form |
| `/campaign-details/:id` | Individual campaign view with funding |
| `/profile` | User profile |
| `/learn-more` | Platform overview |
| `/privacy-policy` | Privacy policy |
| `/terms-of-service` | Terms of service |

---

## Project Structure

```
civil-share/
├── client/                        # React + Vite frontend
│   ├── src/
│   │   ├── pages/                 # Route-level page components
│   │   │   ├── Home.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── CreateCampaign.tsx
│   │   │   ├── CampaignDetails.tsx
│   │   │   ├── Profile.tsx
│   │   │   └── ...
│   │   ├── components/            # Shared UI components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── DisplayCampaigns.tsx
│   │   │   ├── FundCard.tsx
│   │   │   ├── WalletButton.tsx
│   │   │   ├── EthereumPrice.tsx
│   │   │   ├── MagicButton.tsx
│   │   │   └── ...
│   │   └── ...
├── CivilShare-Contract-V2/        # Hardhat project (V2 contracts)
│   ├── contracts/
│   ├── scripts/
│   └── hardhat.config.js
└── web3/                          # Hardhat project (original contracts)
    ├── contracts/
    ├── scripts/
    └── hardhat.config.js
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A Thirdweb account and API key ([thirdweb.com](https://thirdweb.com))
- MetaMask or another Ethereum wallet for local testing

### Frontend Setup

```bash
git clone https://github.com/303Devs/Civil_Share.git
cd Civil_Share/client
npm install
```

Create a `.env` file in `client/` with your Thirdweb configuration:

```bash
VITE_THIRDWEB_CLIENT_ID=your_thirdweb_client_id
```

```bash
npm run dev
```

### Smart Contract Setup

```bash
cd CivilShare-Contract-V2
npm install
```

Configure `hardhat.config.js` with your network RPC URL and deployer private key, then:

```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network <network>
```

---

## Screenshots

<!-- Add screenshots here -->

---

## Deployment

- Frontend deployed on [share.civilprotocol.io](https://share.civilprotocol.io)
- Smart contracts deployed on Ethereum (see contract directory for deployment addresses)

---

## Status

Active — live at [share.civilprotocol.io](https://share.civilprotocol.io).

---

Built by [303Devs](https://github.com/303Devs)
