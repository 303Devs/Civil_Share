import React, { useEffect } from 'react';
import { ConnectButton, useActiveAccount } from 'thirdweb/react';
import { sepolia } from 'thirdweb/chains';
import { useContractContext } from '../context/ContractContext';

const connectButtonStyles =
  'font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px]';

const connectModalMetadata = {
  title: 'Civil Protocol',
  subtitle: 'Changing the World One Campaign at a Time.',
  logoUrl: 'https://imgur.com/a/fy8eCRe',
};

const welcomeScreen = {
  title: connectModalMetadata.title,
  subtitle: connectModalMetadata.subtitle,
  img: {
    src: connectModalMetadata.logoUrl,
    width: 300,
    height: 50,
  },
};

let btnLabel = 'Connect a Wallet';
const WalletButton = () => {
  const { client, setActiveAccount, account } = useContractContext();
  const activeAccount = useActiveAccount() || undefined;

  const buttonLabel = account ? 'Connected' : 'Connect a Wallet';
  const buttonStyles = {
    backgroundColor: account ? '#8c6dfd' : '#1dc071',
    fontFamily: 'epilogue',
    border: 'none',
  };

  useEffect(() => {
    if (account && activeAccount && activeAccount.address !== account.address) {
      setActiveAccount(activeAccount);
    }
  }, [activeAccount]);

  return (
    <ConnectButton
      client={client}
      chain={sepolia}
      appMetadata={{
        name: 'Civil Protocol',
        url: 'www.civilprotocol.com',
        description: 'Changing the World One Campaign at a Time.',
        logoUrl: 'https://imgur.com/a/fy8eCRe',
      }}
      connectButton={{
        label: buttonLabel,
        className: connectButtonStyles,
        style: buttonStyles,
      }}
      connectModal={{
        showThirdwebBranding: false,
        title: 'Civil Protocol',
        titleIcon: 'https://imgur.com/a/fy8eCRe',
        welcomeScreen: {
          title: 'Civil Protocol',
          subtitle: 'Changing the World One Campaign at a Time.',
          img: {
            src: 'https://imgur.com/a/fy8eCRe',
            width: 300,
            height: 50,
          },
        },
      }}
      onConnect={(wallet) => {
        const account = wallet.getAccount();
        if (!account) throw new Error('No account found in wallet');
        setActiveAccount(account);
      }}
      onDisconnect={() => setActiveAccount(null)}
    />
  );
};

export default WalletButton;
