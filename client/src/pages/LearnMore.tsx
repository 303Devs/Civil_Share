import React from 'react';

const LearnMore = () => {
  return (
    <div className='min-h-screen text-neutral-100 p-6'>
      <div className='max-w-3xl mx-auto'>
        <h1 className='text-3xl font-bold mb-6'>Learn More</h1>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold mb-4'>Creating Your Wallet</h2>
          <p className='mb-4 text-base leading-relaxed'>
            When you sign in with social, email, phone, or passkey, a secure
            wallet is automatically created for you. This is a{' '}
            <strong>non-custodial</strong> wallet, which means you are the only
            one who has control over it. No one else can access your funds
            because your wallet’s private key—your unique secret code—is
            generated just for you.
          </p>
          <p className='mb-4 text-base leading-relaxed'>
            Your wallet is like a digital safe deposit box. Each time you log
            in, your wallet is set up with advanced security measures that
            ensure only you have access to your assets.
          </p>
          <p className='text-base leading-relaxed'>
            For more information about our sign-in methods, please visit{' '}
            <a
              href='https://portal.thirdweb.com/connect/wallet/sign-in-methods/configure'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-500 underline'
            >
              this guide
            </a>
            .
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold mb-4'>
            Your Wallet’s Security
          </h2>
          <p className='mb-4 text-base leading-relaxed'>
            Your wallet is secured with strong encryption and industry-leading
            security measures. Because it is non-custodial, you are solely
            responsible for keeping your private key safe. Your private key is a
            secret code that acts like the password to your bank account—it
            grants complete access to your digital assets.
          </p>
          <p className='mb-4 text-base leading-relaxed'>
            It is extremely important that you never share your private key with
            anyone. Thirdweb does not store or have access to your keys—only you
            do. If someone else obtains your private key, they could gain full
            control over your wallet and assets. Always store your private key
            securely and offline whenever possible.
          </p>
          <p className='mb-4 text-base leading-relaxed'>
            To better understand how your wallet is secured, read the full
            Thirdweb Wallet Security documentation{' '}
            <a
              href='https://portal.thirdweb.com/connect/wallet/security'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-500 underline'
            >
              here
            </a>
            .
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold mb-4'>Managing Your Wallet</h2>
          <p className='mb-4 text-base leading-relaxed'>
            After you log in, you can manage your wallet using the{' '}
            <strong>Manage Wallet</strong> feature in the Wallet Button. This is
            where you can view your wallet details, check your balance, and, if
            needed, export your private key.
          </p>
          <p className='mb-4 text-base leading-relaxed'>
            Exporting your private key is useful if you want to back up your
            wallet or transfer it to another device, but remember—this key is
            the master key to your funds. Guard it like you would a physical key
            to your home.
          </p>
          <p className='text-base leading-relaxed'>
            For answers to common questions about managing your wallet, check{' '}
            <a
              href='https://portal.thirdweb.com/connect/wallet/in-app-wallet/faq'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-500 underline'
            >
              this FAQ
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className='text-2xl font-semibold mb-4'>In Short</h2>
          <p className='text-base leading-relaxed'>
            Our login system creates a secure, non-custodial wallet for you
            automatically. This means you are in full control of your digital
            assets, protected by advanced encryption. Your private key is your
            secret password—never share it with anyone. With the Manage Wallet
            feature, you can easily keep track of your wallet and export your
            private key if needed.
          </p>
        </section>

        <section className='mb-8'>
          <h2 className='text-2xl font-semibold mb-4'>Why We Use Base</h2>
          <p className='mb-4 text-base leading-relaxed'>
            Civil Share runs on Base, a secure and scalable Ethereum Layer 2
            solution created by Coinbase. It provides ultra-low fees, fast
            confirmations, and access to the Ethereum ecosystem—all while
            benefiting from Coinbase’s infrastructure and decentralization
            principles.
          </p>
          <p className='text-base leading-relaxed'>
            To learn more about the Base blockchain, visit{' '}
            <a
              href='https://base.org/about'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-500 underline'
            >
              base.org/about
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default LearnMore;
