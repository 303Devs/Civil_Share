import React from 'react';
import { socialIcons, quickLinks } from '../constants';

export default function Footer() {
  return (
    <footer className='bg-black-bg py-10 border-t mt-24 md:mt-36'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col md:flex-row gap-8 mb-8'>
          {/* Contact Us - Second on mobile, first on desktop */}
          <div className='order-2 md:order-1 md:flex-1'>
            <h3 className='text-lg font-semibold mb-4 text-primary-text'>
              Contact Us
            </h3>
            <div className='space-y-2'>
              <div className='flex items-center'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5 mr-2 text-tertiary-text'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                  />
                </svg>
                <a
                  href='mailto:contact@civilprotocol.io'
                  className='text-secondary-text hover:text-primary-text transition-colors'
                >
                  contact@civilprotocol.io
                </a>
              </div>
            </div>

            <div className='mt-4 flex space-x-4'>
              {socialIcons.map((icon: { name: string; d: string }) => (
                <a
                  key={icon.name}
                  href='https://x.com/303devs'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-secondary-text hover:text-color-primary-text transition-colors'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    fill='currentColor'
                    className={`bi text-purple-main ${icon.name}`}
                    viewBox='0 0 16 16'
                  >
                    <path d={`${icon.d}`} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links - First on mobile, second on desktop */}
          <div className='order-1 md:order-2 md:flex-1'>
            <h3 className='text-lg font-semibold mb-4 text-primary-text'>
              Links
            </h3>
            <ul className='space-y-2'>
              {quickLinks.map((link: { title: string; url: string }) => (
                <li key={link.title}>
                  <a
                    href={link.url}
                    className='text-secondary-text hover:text-primary-text transition-colors'
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Civil Protocol - Third on mobile, third on desktop */}
          <div className='order-3 md:order-3 md:flex-1'>
            <h3 className='text-lg font-semibold mb-4 text-primary-text'>
              Civil Protocol
            </h3>
            <p className='text-secondary-text text-sm mb-4'>
              A Web3 ecosystem built on Base, bridging the gap between
              traditional and decentralized technologies.
            </p>
            <a
              href='https://civilprotocol.io'
              className='inline-flex items-center gap-2 hover:opacity-80 transition-opacity'
            >
              <span className='text-secondary-text'>
                © 2025 Civil Protocol
              </span>
              <img
                src='/icons/logo-purple.svg'
                alt='Civil Protocol Logo'
                className='w-6 h-6'
              />
            </a>
          </div>
        </div>

        <div className='flex flex-col sm:flex-row sm:items-end sm:justify-center sm:space-x-2 border-t pt-6 text-center'>
          <p className='text-secondary-text text-sm'>
            The Civil Protocol Ecosystem is an initiative by
          </p>
          <a
            href='https://303devs.com'
            className='mt-2 sm:mt-0 flex justify-center sm:justify-start'
          >
            <img
              src='/icons/303_logo.svg'
              alt='303Devs Logo'
              className='h-[26px] w-auto'
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
