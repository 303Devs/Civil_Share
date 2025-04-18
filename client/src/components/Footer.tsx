import React from 'react';

export default function FooterSection() {
  return (
    <footer className='bg-black-bg py-10 border-t mt-24 md:mt-48'>
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
              <a
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
                  className='bi bi-twitter text-purple-main'
                  viewBox='0 0 16 16'
                >
                  <path d='M5.026 15c6.038 0 9.341-4.926 9.341-9.205 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.887c-.6.266-1.24.448-1.901.528.684-.406 1.203-1.048 1.449-1.815a6.84 6.84 0 0 1-2.099.794A3.366 3.366 0 0 0 7.797 5.976A9.528 9.528 0 0 1 1.112 2.62a3.364 3.364 0 0 0 1.035 4.487 3.35 3.35 0 0 1-1.523-.416v.042a3.36 3.36 0 0 0 2.695 3.292c-.297.082-.592.111-.9.111-.22 0-.434-.021-.644-.062.453 1.4 1.77 2.419 3.328 2.447a6.774 6.774 0 0 1-4.168 1.428c-.271 0-.538-.016-.804-.046 1.389.88 3.045 1.398 4.824 1.398' />
                </svg>
              </a>
              <a
                href='#'
                target='_blank'
                rel='noopener noreferrer'
                className='text-secondary-text hover:text-primary-text transition-colors'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  fill='currentColor'
                  className='bi bi-discord text-purple-main'
                  viewBox='0 0 16 16'
                >
                  <path d='M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z' />
                </svg>
              </a>
              <a
                href='https://github.com/303Devs'
                target='_blank'
                rel='noopener noreferrer'
                className='text-secondary-text hover:text-primary-text transition-colors'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  fill='currentColor'
                  className='bi bi-github text-purple-main'
                  viewBox='0 0 16 16'
                >
                  <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z' />
                </svg>
              </a>
              <a
                href='https://www.tiktok.com/@303devs'
                target='_blank'
                rel='noopener noreferrer'
                className='text-secondary-text hover:text-primary-text transition-colors'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  fill='currentColor'
                  className='bi bi-tiktok text-purple-main'
                  viewBox='0 0 16 16'
                >
                  <path d='M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z' />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links - First on mobile, second on desktop */}
          <div className='order-1 md:order-2 md:flex-1'>
            <h3 className='text-lg font-semibold mb-4 text-primary-text'>
              Links
            </h3>
            <ul className='space-y-2'>
              <li>
                <a
                  href='https://civilprotocol.io'
                  className='text-secondary-text hover:text-primary-text transition-colors'
                >
                  Civil Protocol
                </a>
              </li>
              <li>
                <a
                  href='https://basescan.org/address/0xE48F250676bc94D35dF83f645942181Fd77892B6'
                  className='text-secondary-text hover:text-primary-text transition-colors'
                >
                  Contract Address
                </a>
              </li>
              <li>
                <a
                  href='https://303Devs.com'
                  className='text-secondary-text hover:text-primary-text transition-colors'
                >
                  303Devs
                </a>
              </li>
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
            <div className='flex items-center'>
              <img
                src='/logo.svg'
                alt='Civil Protocol Logo'
                className='w-6 h-6 mr-2'
              />
              <span className='text-secondary-text'>
                © 2025 Civil Protocol
              </span>
            </div>
          </div>
        </div>

        <div className='border-t pt-6 text-center'>
          <p className='text-secondary-text text-sm'>
            The Civil Protocol Ecosystem is a product of
            <a
              href='https://303devs.com'
              className='text-purple-main hover:text-white transition-colors ml-1'
            >
              303Devs LLC
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
