// src/components/WelcomeScreen.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export type WalletModalProps = {
  title: string;
  img: {
    src: string;
    width?: number;
    height?: number;
  };
};

const WalletModal: React.FC<WalletModalProps> = ({ title, img }) => {
  return (
    <div className='flex flex-col h-full'>
      {/* Top Section */}
      <div className='flex-1 flex flex-col justify-center items-center p-6 min-h-[300px]'>
        <div className='flex flex-wrap justify-center'>
          <div className='relative inline-flex flex-shrink-0 items-center justify-center'>
            <img
              src={img.src}
              alt={title}
              width={img.width || 150}
              height={img.height || 150}
              className='object-contain h-[150px] w-[150px] select-none transition-opacity duration-400'
            />
          </div>
        </div>
        <div className='h-12' />
        <span className='text-xl font-bold'>{title}</span>
        <div className='h-4' />
        <Link
          to='/learn-more'
          className='text-sm text-center text-blue-500 max-w-[250px] underline'
        >
          Explore our social, email, phone, and passkey login options.
        </Link>
        <div className='h-6' />
        <Link
          to='https://blog.thirdweb.com/web3-wallet/'
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-500 underline'
        >
          New to wallets?
        </Link>
      </div>

      {/* Bottom Section */}
      <div className='flex flex-col gap-6 pt-6 pb-6'>
        <div className='flex flex-wrap justify-center'>
          <span className='max-w-[250px] text-center text-xs text-gray-500'>
            By connecting, you agree to the{' '}
            <Link
              to='/terms'
              className='whitespace-nowrap text-blue-500 underline'
            >
              Terms of Service
            </Link>
            {' & '}
            <Link
              to='/privacy'
              className='text-blue-500 underline'
            >
              Privacy Policy
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default WalletModal;
