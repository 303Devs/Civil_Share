import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className='px-6 py-12 max-w-4xl mx-auto text-neutral-200'>
      <h1 className='text-4xl font-bold mb-6'>Privacy Policy</h1>
      <p className='mb-4'>
        <strong>Effective Date:</strong> April 1st, 2025
      </p>
      <p className='mb-4'>
        At <strong>Civil Share</strong>, your privacy is fundamentally protected
        by our architecture. Because we do not store personal data, there’s very
        little to collect or protect.
      </p>

      <h2 className='text-2xl font-semibold mt-6 mb-2'>1. No Data Storage</h2>
      <p className='mb-4'>
        Civil Share does <strong>not</strong> collect or store:
      </p>
      <ul className='list-disc list-inside mb-4'>
        <li>Names</li>
        <li>Emails</li>
        <li>Wallet keys</li>
        <li>IP addresses</li>
        <li>Device data</li>
      </ul>
      <p className='mb-4'>
        All transactions and interactions happen directly between your wallet
        and the blockchain.
      </p>

      <h2 className='text-2xl font-semibold mt-6 mb-2'>
        2. Blockchain Transparency
      </h2>
      <p className='mb-4'>
        All campaign contributions and actions are recorded on-chain. This
        means:
      </p>
      <ul className='list-disc list-inside mb-4'>
        <li>Anyone can view the transactions on the blockchain.</li>
        <li>Data is immutable and publicly accessible.</li>
        <li>We cannot delete or alter this data.</li>
      </ul>

      <h2 className='text-2xl font-semibold mt-6 mb-2'>
        3. Third-Party Wallets
      </h2>
      <p className='mb-4'>
        When connecting your wallet (e.g., MetaMask), you are using a
        third-party service. Please review the privacy policies of those wallets
        to understand their practices.
      </p>

      <h2 className='text-2xl font-semibold mt-6 mb-2'>4. Wallet Security</h2>
      <p className='mb-4'>
        Civil Share integrates with Thirdweb to provide wallet infrastructure.
        These wallets are non-custodial—only you have access to your private
        keys. Neither Civil Share nor Thirdweb can retrieve or reset your
        wallet.
      </p>
      <p className='mb-4'>
        For more details on wallet protection, visit{' '}
        <a
          href='https://portal.thirdweb.com/connect/wallet/security'
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-500 underline'
        >
          Thirdweb’s wallet security documentation
        </a>
        .
      </p>

      <h2 className='text-2xl font-semibold mt-6 mb-2'>
        5. Cookies & Analytics
      </h2>
      <p className='mb-4'>
        Civil Share uses lightweight analytics tools to track overall site
        usage, such as page visits, traffic volume, and feature engagement.
        These metrics help us improve the platform and user experience. We do{' '}
        <strong>not</strong> collect personal information or track users across
        websites.
      </p>

      <h2 className='text-2xl font-semibold mt-6 mb-2'>
        6. Your Responsibilities
      </h2>
      <p className='mb-4'>
        You are responsible for safeguarding your wallet credentials. Civil
        Share cannot recover lost wallets, private keys, or seed phrases.
      </p>

      <h2 className='text-2xl font-semibold mt-6 mb-2'>
        7. Changes to this Policy
      </h2>
      <p className='mb-4'>
        We may revise this Privacy Policy occasionally. Continued use of the
        platform means you accept the most recent version.
      </p>

      <h2 className='text-2xl font-semibold mt-6 mb-2'>8. Contact</h2>
      <p className='mb-4'>
        If you have questions about privacy, contact us at [insert contact info
        or support page].
      </p>
    </div>
  );
};

export default PrivacyPolicy;
