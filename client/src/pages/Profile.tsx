import React, { useState, useEffect, Suspense } from 'react';
import { useContractContext } from '../context/ContractContext';
import { ToastContainer, toast } from 'react-toastify';

const DisplayCampaigns = React.lazy(
  () => import('../components/DisplayCampaigns')
);

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const { account, contract, getUserCampaigns } = useContractContext();

  useEffect(() => {
    const fetchUserCampaigns = async () => {
      setIsLoading(true);
      try {
        const data = await getUserCampaigns();
        setCampaigns(data);
      } catch (err) {
        toast(`Error fetching user campaigns: ${err}`);
        <ToastContainer />;
      } finally {
        setIsLoading(false);
      }
    };

    if (contract) fetchUserCampaigns();
  }, [account, contract, getUserCampaigns]);

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
