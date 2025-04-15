import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loader } from '../assets';
import { FundCard } from './';
import { useContractContext } from '../context';

type DisplayCampaignsProps = {
  title: string;
  isLoading: boolean;
  campaigns: Campaign[] | [];
};

const DisplayCampaigns = ({
  title,
  isLoading,
  campaigns = [],
}: DisplayCampaignsProps) => {
  const navigate = useNavigate();
  const handleNavigate = (campaign: Campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  const { searchTerm } = useContractContext();
  const [filter, setFilter] = useState<'all' | 'active' | 'expired'>('active');

  const searchFilteredCampaigns = campaigns.filter((campaign) => {
    const query = searchTerm.toLowerCase();
    return (
      campaign.title.toLowerCase().includes(query.toLowerCase()) ||
      campaign.description.toLowerCase().includes(query.toLowerCase()) ||
      campaign.category.toLowerCase().includes(query.toLowerCase())
    );
  });

  const now = Date.now();
  const deadlineFiltered = campaigns.filter((campaign) => {
    const deadline = Number(campaign.deadline);
    if (filter === 'active') return deadline >= now;
    if (filter === 'expired') return deadline < now;
    return true;
  });

  const finalCampaigns =
    searchTerm.trim().length > 0 ? searchFilteredCampaigns : deadlineFiltered;

  return (
    <div>
      <div className='flex flex-col'>
        <div className='flex flex-row'>
          <h2 className='font-epilogue font-semibold text-[18px] text-white text-left pr-8'>
            {title} ({finalCampaigns.length})
          </h2>
          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as 'all' | 'active' | 'expired')
            }
            className='text-white px-2 py-1 rounded border border-purple-main'>
            <option value='all'>All</option>
            <option value='active'>Active</option>
            <option value='expired'>Expired</option>
          </select>
        </div>
      </div>

      <div className='flex flex-wrap mt-[20px] gap-[26px]'>
        {isLoading && (
          <img
            src={loader}
            alt='loader'
            className='w-[100px] h-[100px] object-contain'
          />
        )}

        {!isLoading && finalCampaigns.length === 0 && (
          <p className='font-epilogue font-semibold text-[14px] leading-[30px] text-secondary-text'>
            No campaigns found for this filter.
          </p>
        )}

        {!isLoading &&
          finalCampaigns.length > 0 &&
          finalCampaigns.map((campaign) => (
            <FundCard
              key={campaign.pId}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
