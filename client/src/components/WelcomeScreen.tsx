// src/components/WelcomeScreen.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export type WelcomeScreenProps = {
  title: string;
  img: {
    src: string;
    width?: number;
    height?: number;
  };
};

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ title, img }) => {
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
          to='/signup-info'
          className='text-sm text-center text-gray-400 max-w-[250px] underline'>
          Learn how our sign up process works
        </Link>
        <div className='h-6' />
        <Link
          to='https://blog.thirdweb.com/web3-wallet/'
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-500 underline'>
          New to wallets?
        </Link>
      </div>

      {/* Bottom Section */}
      <div className='flex flex-col gap-6 pt-6 pb-6'>
        <div className='flex flex-wrap justify-center'>
          <span className='max-w-[250px] text-center text-xs text-gray-500'>
            By connecting, you agree to the{' '}
            <a
              href='https://www.share.civilprotocol.io/terms'
              target='_blank'
              rel='noopener noreferrer'
              className='whitespace-nowrap text-blue-500 underline'>
              Terms of Service
            </a>
            {' & '}
            <a
              href='https://www.share.civilprotocol.io/privacy'
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-500 underline'>
              Privacy Policy
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
