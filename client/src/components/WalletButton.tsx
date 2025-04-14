import React, { useEffect } from 'react';
import { ConnectButton, useActiveAccount } from 'thirdweb/react';
import { base } from 'thirdweb/chains';
import { useContractContext } from '../context/ContractContext';

const connectButtonStyles =
  'font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px]';

const logo =
  'https://res.cloudinary.com/dxvlke88h/image/upload/v1744614467/civil_diamond_transparent_vp218l.png';

const WalletButton = () => {
  const { client, setActiveAccount, account } = useContractContext();
  const activeAccount = useActiveAccount() || undefined;

  const buttonLabel = account ? 'Connected' : 'Connect a Wallet';
  const buttonStyles = {
    backgroundColor: account ? '#8c6dfd' : '#9300f3',
    fontFamily: 'epilogue',
    border: 'none',
    color: '#ffffff',
  };

  useEffect(() => {
    if (account && activeAccount && activeAccount.address !== account.address) {
      setActiveAccount(activeAccount);
    }
  }, [activeAccount]);

  return (
    <div>
      <ConnectButton
        client={client}
        chain={base}
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
          welcomeScreen: {
            title: 'Civil Share',
            subtitle:
              'Log in with an existing wallet or use "Social Login" via email, phone, social, or passkey. A new wallet will be created and linked to your account. You can export your private key under "Manage Wallet" — keep it secure and never share it.',
            img: {
              src: logo,
              width: 150,
              height: 150,
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
    </div>
  );
};

export default WalletButton;
