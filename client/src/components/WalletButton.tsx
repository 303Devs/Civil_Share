import React, { useEffect, useMemo, useCallback } from 'react';
import { ConnectButton, useActiveAccount } from 'thirdweb/react';
import { base } from 'thirdweb/chains';
import { useContractContext } from '../context/ContractContext';
import WelcomeScreen from '../components/WelcomeScreen';

import { Wallet, Account } from 'thirdweb/dist/types/exports/wallets.native';

const connectButtonStyles =
  'font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px]';

const logo = '/logo.svg';

const WalletButton = () => {
  const { client, setActiveAccount, account } = useContractContext();
  const activeAccount = useActiveAccount() || undefined;

  const welcomeScreen = () => (
    <WelcomeScreen
      title={'Welcome to Civil Share!'}
      img={{ src: logo, width: 200, height: 200 }}
    />
  );

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
      const account: Account | undefined = wallet.getAccount();
      if (!account) {
        console.warn('Wallet connected but no account available');
        return;
      }
      setActiveAccount(account);
    },
    [setActiveAccount]
  );

  return (
    <div>
      <ConnectButton
        client={client}
        chain={base}
        theme={'dark'}
        appMetadata={{
          name: 'Civil Share',
          url: 'www.share.civilprotocol.io',
          description: 'Changing the World One Campaign at a Time.',
          logoUrl: logo,
        }}
        connectButton={{
          label: buttonLabel,
          className: connectButtonStyles,
          style: buttonStyles,
        }}
        connectModal={{
          termsOfServiceUrl: 'https://www.share.civilprotocol.io/terms',
          privacyPolicyUrl: 'https://www.share.civilprotocol.io/privacy',
          size: 'wide',
          showThirdwebBranding: false,
          title: 'Civil Share',
          titleIcon: logo,
          welcomeScreen: welcomeScreen,
        }}
        onConnect={handleConnect}
        onDisconnect={() => setActiveAccount(null)}
      />
    </div>
  );
};

export default WalletButton;
