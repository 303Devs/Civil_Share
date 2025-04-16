import React, { useEffect, useMemo, useCallback } from 'react';
import { ConnectButton, useActiveAccount } from 'thirdweb/react';
import { base } from 'thirdweb/chains';
import { useContractContext } from '../context/ContractContext';
import WelcomeScreen from '../components/WelcomeScreen';
import { ToastContainer, toast } from 'react-toastify';

import { Wallet, Account } from 'thirdweb/dist/types/exports/wallets.native';

const connectButtonStyles =
  'font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px]';

const logo = '/logo.svg';

const WalletButton = () => {
  const { client, setActiveAccount, account } = useContractContext();
  const activeAccount = useActiveAccount();

  const buttonLabel = useMemo(
    () => (account ? 'Connected' : 'Connect a Wallet'),
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

  useEffect(() => {
    if (account && activeAccount && activeAccount.address !== account.address) {
      setActiveAccount(activeAccount);
    }
  }, [activeAccount, account, setActiveAccount]);

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

  return (
    <div>
      <div className='flex sm:hidden'>
        <ConnectButton
          client={client}
          chain={base}
          theme='dark'
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
      <div className='hidden sm:flex'>
        <ConnectButton
          client={client}
          chain={base}
          theme='dark'
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
