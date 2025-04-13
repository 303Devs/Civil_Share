import React, { useState, useEffect } from 'react';
import { useContractContext } from '../context/ContractContext';
import { DisplayCampaigns } from '../components';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const { account, contract, getCampaigns } = useContractContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [account, contract]);
  return (
    <DisplayCampaigns
      title={'All Campaigns'}
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default Home;
