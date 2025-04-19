import React from 'react';
import { motion } from 'motion/react';
import { Lamp, MagicButton, WalletButton, Footer } from '../components';
import logo from '/icons/logo.svg';

const Hero = () => {
  return (
    <div className='text-white min-h-screen bg-black-bg flex flex-col'>
      <Lamp>
        <div className='flex flex-col items-center justify-center px-6 pt-24 sm:pt-32'>
          <img
            src={logo}
            width={160}
            height={160}
            alt='Civil Share Logo'
            loading='eager'
            className='mb-4 md:mb-6'
          />
          <motion.h1
            initial={{ opacity: 0.5, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: 'easeInOut',
            }}
            className='pb-6 bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-center text-4xl font-semibold tracking-tight text-transparent sm:text-5xl md:text-6xl'
          >
            Civil Share
          </motion.h1>
        </div>
        <div className='flex flex-col justify-center items-center text-center gap-4 px-6 mt-12 sm:mt-16'>
          <h2>Web3 Crowdfunding, Made Simple</h2>
          <p className='text-lg md:text-xl max-w-2xl text-secondary-text mb-6'>
            Civil Share makes it easy to fund and launch campaigns on the Base
            blockchain— no crypto experience required. Sign up with email or
            social, get a wallet instantly, and enjoy full transparency with
            every donation.
          </p>
          <div className='flex flex-col sm:flex-row gap-6 items-center'>
            <MagicButton
              title={'Explore Campaigns'}
              icon={
                <img
                  src={logo}
                  width={25}
                  height={25}
                  alt='logo'
                />
              }
              position={'left'}
              handleClick={() => {
                window.location.href = '/dashboard';
              }}
              otherClasses={'text-neutral-200'}
            />
            <WalletButton />
          </div>
        </div>
      </Lamp>

      {/* Below the fold */}
      <section className='grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-20 max-w-6xl mx-auto'>
        <div className='bg-black-1 p-6 rounded-lg border border-black-2 shadow'>
          <h3 className='text-xl font-semibold mb-2'>
            🌐 What is Civil Share?
          </h3>
          <p className='text-sm text-secondary-text'>
            A community-first platform for secure and direct fundraising. No
            intermediaries. No hidden fees.
          </p>
        </div>
        <div className='bg-black-1 p-6 rounded-lg border border-black-2 shadow'>
          <h3 className='text-xl font-semibold mb-2'>🔒 Why use Web3?</h3>
          <p className='text-sm text-secondary-text'>
            Every donation is recorded on-chain. Transparent, auditable, and
            immutable support for causes you care about.
          </p>
        </div>
        <div className='bg-black-1 p-6 rounded-lg border border-black-2 shadow'>
          <h3 className='text-xl font-semibold mb-2'>🚀 How does it work?</h3>
          <p className='text-sm text-secondary-text'>
            Launch a campaign in minutes. Share with your network. Get funded
            directly through crypto.
          </p>
        </div>
      </section>

      {/* Familiar Experience, Powerful Tech */}
      <section className='bg-black-1 px-6 py-12 border-t border-black-2'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl font-bold mb-4'>
            Familiar Experience, Powerful Tech
          </h2>
          <p className='text-secondary-text text-md mb-6'>
            Civil Share bridges the gap between Web2 ease and Web3 benefits. You
            can log in using email, phone, passkey, or your favorite social
            platform. A wallet is created for you automatically—or connect your
            own like MetaMask or Coinbase Wallet.
          </p>
          <p className='text-secondary-text text-md mb-6'>
            Your wallet is powered by Thirdweb, a secure non-custodial provider.
            You always retain full control of your private key and wallet
            access.{' '}
            <a
              href='https://portal.thirdweb.com/connect/wallet/security'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-500 underline'
            >
              Learn more
            </a>{' '}
            about wallet safety and encryption standards.
          </p>
        </div>
      </section>

      {/* How Civil Share Works */}
      <section className='bg-black-1 px-6 py-12 border-t border-black-2'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl font-bold mb-4'>How Civil Share Works</h2>
          <p className='text-secondary-text text-md mb-6'>
            Built entirely on the Base blockchain, Civil Share provides
            end-to-end transparency and security. Every campaign and donation is
            recorded on-chain, ensuring that 100% of the proceeds go directly to
            the campaign creator—no intermediaries, no hidden fees.
          </p>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 text-left'>
            <div className='bg-black-2 p-5 rounded-lg shadow'>
              <h3 className='text-lg font-semibold mb-2'>
                1. Sign Up or Connect
              </h3>
              <p className='text-sm text-secondary-text'>
                Sign in with email, phone, social login, or passkey. Already
                have a wallet like MetaMask or Coinbase Wallet? Just connect it.
                Don’t have one? We’ll generate a secure, non-custodial wallet
                for you.
              </p>
            </div>
            <div className='bg-black-2 p-5 rounded-lg shadow'>
              <h3 className='text-lg font-semibold mb-2'>
                2. Explore or Create
              </h3>
              <p className='text-sm text-secondary-text'>
                Browse active campaigns, donate directly in crypto, or launch
                your own campaign within minutes. All activity is tracked
                on-chain for full accountability.
              </p>
            </div>
            <div className='bg-black-2 p-5 rounded-lg shadow'>
              <h3 className='text-lg font-semibold mb-2'>
                3. Support with Confidence
              </h3>
              <p className='text-sm text-secondary-text'>
                Watch your contributions make a difference in real time, knowing
                exactly where your funds go.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Using Your Wallet */}
      <section className='px-6 pt-12 border-t border-black-2 bg-black-bg'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl font-bold mb-4'>
            Your Web3 Wallet Made Easy
          </h2>
          <p className='text-secondary-text text-md mb-6'>
            Whether you&#39;re new to crypto or a seasoned user, our wallet
            tools are intuitive and accessible. All wallets are non-custodial,
            giving you full control and ownership of your assets.
          </p>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 text-left'>
            <div className='bg-black-2 p-5 rounded-lg shadow'>
              <h3 className='text-lg font-semibold mb-2'>Manage Funds</h3>
              <p className='text-sm text-secondary-text'>
                View balances, send and receive tokens, and access your wallet’s
                private key anytime through the Wallet menu.
              </p>
            </div>
            <div className='bg-black-2 p-5 rounded-lg shadow'>
              <h3 className='text-lg font-semibold mb-2'>Buy with Fiat</h3>
              <p className='text-sm text-secondary-text'>
                Easily purchase crypto with your debit/credit card using our
                secure onramp provider—no need to leave the platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Hero;
