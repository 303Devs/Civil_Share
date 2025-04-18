import React from 'react';

const TermsOfService = () => {
  return (
    <div className='px-6 py-12 max-w-4xl mx-auto text-neutral-200'>
      <h1 className='text-4xl font-bold mb-6'>Terms of Service</h1>
      <p className='mb-4'>
        <strong>Effective Date:</strong> April 1st, 2025
      </p>
      <p className='mb-4'>
        Welcome to <strong>Civil Share</strong>, a decentralized crowdfunding
        platform built on blockchain technology and powered by Civil Protocol.
        By accessing or using our platform, you agree to these Terms of Service
        (`&quot;`Terms``&quot;`). Please read them carefully.
      </p>

      <h2 className='text-2xl font-semibold mt-6 mb-2'>1. Overview</h2>
      <p className='mb-4'>
        Civil Share allows users to create and contribute to crowdfunding
        campaigns through blockchain-based smart contracts. All transactions
        occur on-chain, and Civil Share does not hold or control any user funds.
      </p>

      <h2 className='text-2xl font-semibold mt-6 mb-2'>2. Eligibility</h2>
      <ul className='list-disc list-inside mb-4'>
        <li>
          You are at least 18 years old or of legal age in your jurisdiction.
        </li>
        <li>
          You are not prohibited from using blockchain-based applications under
          applicable laws.
        </li>
        <li>
          You understand how to use digital wallets and interact with smart
          contracts.
        </li>
      </ul>

      <h2 className='text-2xl font-semibold mt-6 mb-2'>
        3. Blockchain-Based Transactions
      </h2>
      <p className='mb-4'>
        All contributions are executed through smart contracts deployed on the
        Base Network and are publicly verifiable:
      </p>
      <ul className='list-disc list-inside mb-4'>
        <li>
          <strong>100% of contributions</strong> go directly to the campaign
          founder.
        </li>
        <li>
          Civil Share does <strong>not</strong> take a cut or retain any portion
          of funds.
        </li>
        <li>
          You are solely responsible for verifying campaign legitimacy before
          donating.
        </li>
      </ul>

      <h2 className='text-2xl font-semibold mt-6 mb-2'>
        4. Smart Contract Risks
      </h2>
      <p className='mb-4'>By using Civil Share, you acknowledge and accept:</p>
      <ul className='list-disc list-inside mb-4'>
        <li>
          The inherent risks of interacting with smart contracts and blockchain
          technology.
        </li>
        <li>The possibility of irreversible transactions.</li>
        <li>
          That Civil Share and its creators are not responsible for loss of
          funds due to bugs, exploits, or malicious campaigns.
        </li>
      </ul>

      <h2 className='text-2xl font-semibold mt-6 mb-2'>
        5. No Custodial Control
      </h2>
      <p className='mb-4'>Civil Share never stores or controls:</p>
      <ul className='list-disc list-inside mb-4'>
        <li>User private keys</li>
        <li>Campaign funds</li>
        <li>Wallet credentials</li>
      </ul>
      <p className='mb-4'>
        All actions are initiated and confirmed by the user via their Web3
        wallet.
      </p>

      <h2 className='text-2xl font-semibold mt-6 mb-2'>6. User Conduct</h2>
      <ul className='list-disc list-inside mb-4'>
        <li>Not use Civil Share for any illegal or fraudulent activity.</li>
        <li>Not impersonate others or create misleading campaign content.</li>
        <li>Follow any additional rules posted on the platform.</li>
      </ul>

      <h2 className='text-2xl font-semibold mt-6 mb-2'>
        7. Limitation of Liability
      </h2>
      <p className='mb-4'>
        Civil Share is provided “as-is.” We make no guarantees of uptime,
        security, or functionality. We are not liable for:
      </p>
      <ul className='list-disc list-inside mb-4'>
        <li>Lost or misdirected funds</li>
        <li>Campaigns that fail to deliver on promises</li>
        <li>Any indirect, incidental, or consequential damages</li>
      </ul>

      <h2 className='text-2xl font-semibold mt-6 mb-2'>8. Changes to Terms</h2>
      <p className='mb-4'>
        These Terms may be updated periodically. By continuing to use Civil
        Share, you agree to the latest version.
      </p>

      <h2 className='text-2xl font-semibold mt-6 mb-2'>9. Contact</h2>
      <p className='mb-4'>
        Questions? Reach out to us at info@civilprotocol.io.
      </p>
      <h2 className='text-2xl font-semibold mt-6 mb-2'>10. Contract Address</h2>
      <p className='mb-4'>Base: 0xE48F250676bc94D35dF83f645942181Fd77892B6 </p>
    </div>
  );
};

export default TermsOfService;
