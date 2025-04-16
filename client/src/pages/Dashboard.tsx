import React, { useState, useEffect, Suspense } from 'react';
import { useContractContext } from '../context/ContractContext';
import { ToastContainer, toast } from 'react-toastify';

const DisplayCampaigns = React.lazy(
  () => import('../components/DisplayCampaigns')
);

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const { account, contract, getCampaigns } = useContractContext();

  useEffect(() => {
    const fetchCampaigns = async () => {
      setIsLoading(true);
      try {
        const data = await getCampaigns();
        setCampaigns(data);
      } catch (err) {
        toast(`Failed to fetch campaigns: ${err}`);
        <ToastContainer />;
      } finally {
        setIsLoading(false);
      }
    };

    if (contract) fetchCampaigns();
  }, [account, contract, getCampaigns]);

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
