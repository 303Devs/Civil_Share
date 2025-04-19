import React, { useEffect, useMemo, useCallback } from 'react';
import { ConnectButton, useActiveAccount, darkTheme } from 'thirdweb/react';
import { base } from 'thirdweb/chains';
import { createWallet, inAppWallet } from 'thirdweb/wallets';

import { useContractContext } from '../context/ContractContext';
import WelcomeScreen from '../components/WelcomeScreen';
import { ToastContainer, toast } from 'react-toastify';

import { Wallet, Account } from 'thirdweb/dist/types/exports/wallets.native';

const connectButtonStyles =
  'font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px]';

const logo = '/logo.svg';

const wallets = [
  inAppWallet({
    auth: {
      mode: 'popup',
      redirectUrl: 'https://shared.civilprotocol.io/dashboard',
      options: [
        'google',
        'discord',
        'telegram',
        'email',
        'x',
        'passkey',
        'phone',
        'github',
        'coinbase',
        'facebook',
        'apple',
      ],
    },
  }),
  createWallet('io.metamask'),
  createWallet('com.coinbase.wallet'),
  createWallet('org.uniswap'),
  createWallet('com.crypto.wallet'),
  createWallet('com.robinhood.wallet'),
  // createWallet('me.rainbow'),
  // createWallet('com.binance.wallet'),
  // createWallet('com.kraken'),
  // createWallet('io.1inch.wallet'),
  // createWallet('global.safe'),
];

const WalletButton = () => {
  const { client, setActiveAccount, account } = useContractContext();
  const activeAccount = useActiveAccount();

  const buttonLabel = useMemo(
    () => (account ? 'Connected' : 'Login & Connect'),
    [account]
  );
  const buttonStyles = useMemo(
    () => ({
      backgroundColor: account ? '#8c6dfd' : '#9300f3',
      fontFamily: 'epilogue',
      border: 'none',
      color: '#ffffff',
    }),
    [account]
  );

  const handleConnect = useCallback(
    (wallet: Wallet) => {
      const userAccount: Account | undefined = wallet.getAccount();
      if (userAccount) {
        setActiveAccount(userAccount);
      } else {
        toast('Wallet not connected. Please connect a wallet and try again.');
        <ToastContainer />;
      }
    },
    [setActiveAccount]
  );

  const appMetadata = {
    name: 'Civil Share',
    url: 'www.share.civilprotocol.io',
    description: 'Changing the World One Campaign at a Time.',
    logoUrl: logo,
  };

  const connectModal = {
    termsOfServiceUrl: 'https://www.share.civilprotocol.io/terms',
    privacyPolicyUrl: 'https://www.share.civilprotocol.io/privacy',
    showThirdwebBranding: false,
    title: 'Civil Share',
    titleIcon: logo,
    welcomeScreen: () => (
      <WelcomeScreen
        title={'Welcome to Civil Share!'}
        img={{ src: logo, width: 200, height: 200 }}
      />
    ),
  };

  useEffect(() => {
    if (account && activeAccount && activeAccount.address !== account.address) {
      setActiveAccount(activeAccount);
    } else {
      setActiveAccount(null);
    }
  }, [activeAccount, account, setActiveAccount]);

  return (
    <div>
      {/* On xs screens */}
      <div className='flex sm:hidden'>
        <ConnectButton
          client={client}
          wallets={wallets}
          chain={base}
          theme={darkTheme({
            colors: {
              accentButtonBg: 'hsl(276, 100%, 48%)',
              accentText: 'hsl(276, 100%, 48%)',
            },
          })}
          appMetadata={appMetadata}
          connectButton={{
            label: buttonLabel,
            className: connectButtonStyles,
            style: buttonStyles,
          }}
          connectModal={{ ...connectModal, size: 'compact' }}
          onConnect={handleConnect}
          onDisconnect={() => setActiveAccount(null)}
        />
      </div>
      {/* On screns small(640px) and larger */}
      <div className='hidden sm:flex'>
        <ConnectButton
          client={client}
          chain={base}
          wallets={wallets}
          theme={darkTheme({
            colors: {
              accentButtonBg: 'hsl(276, 100%, 48%)',
              accentText: 'hsl(276, 100%, 48%)',
            },
          })}
          appMetadata={appMetadata}
          connectButton={{
            label: buttonLabel,
            className: connectButtonStyles,
            style: buttonStyles,
          }}
          connectModal={{ ...connectModal, size: 'wide' }}
          onConnect={handleConnect}
          onDisconnect={() => setActiveAccount(null)}
        />
      </div>
    </div>
  );
};

export default WalletButton;
