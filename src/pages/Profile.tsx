import React, { useState, useEffect } from 'react';
import { useContractContext } from '../context/ContractContext';
import { DisplayCampaigns } from '../components';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const { account, contract, getUserCampaigns } = useContractContext();

  const fetchUserCampaigns = async () => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchUserCampaigns();
  }, [account, contract]);
  return (
    <DisplayCampaigns
      title={'My Campaigns'}
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default Profile;
