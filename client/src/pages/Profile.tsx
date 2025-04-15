import React, { useState, useEffect, Suspense } from 'react';
import { useContractContext } from '../context/ContractContext';

const DisplayCampaigns = React.lazy(
  () => import('../components/DisplayCampaigns')
);

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const { account, contract, getUserCampaigns } = useContractContext();

  const fetchUserCampaigns = async () => {
    setIsLoading(true);
    try {
      const data = await getUserCampaigns();
      setCampaigns(data);
    } catch (err) {
      console.error('Error fetching user campaigns:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (contract) fetchUserCampaigns();
  }, [account, contract]);

  return (
    <Suspense fallback={<div className='text-white'>Loading campaigns...</div>}>
      <DisplayCampaigns
        title={'My Campaigns'}
        isLoading={isLoading}
        campaigns={campaigns}
      />
    </Suspense>
  );
};

export default Profile;
