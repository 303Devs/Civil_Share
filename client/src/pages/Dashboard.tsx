import React, { useState, useEffect, Suspense } from 'react';
import { useContractContext } from '../context/ContractContext';
const DisplayCampaigns = React.lazy(
  () => import('../components/DisplayCampaigns')
);

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const { account, contract, getCampaigns } = useContractContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    try {
      const data = await getCampaigns();
      setCampaigns(data);
    } catch (err) {
      console.error('Failed to fetch campaigns', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [account, contract]);
  return (
    <Suspense fallback={<div className='text-white'>Loading campaigns...</div>}>
      <DisplayCampaigns
        title={'All Campaigns'}
        isLoading={isLoading}
        campaigns={campaigns}
      />
    </Suspense>
  );
};

export default Dashboard;
