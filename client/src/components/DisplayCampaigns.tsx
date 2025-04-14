import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loader } from '../assets';
import { FundCard } from './';

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
  const [filter, setFilter] = useState<'all' | 'current' | 'expired'>(
    'current'
  );

  const now = Date.now();
  const filteredCampaigns = campaigns.filter((campaign) => {
    const deadline = Number(campaign.deadline);
    if (filter === 'current') return deadline >= now;
    if (filter === 'expired') return deadline < now;
    return true; // 'all'
  });

  const handleNavigate = (campaign: Campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  return (
    <div>
      <div className='flex items-center'>
        <h1 className='font-epilogue font-semibold text-[18px] text-white text-left pr-2'>
          {title} ( {filteredCampaigns.length} )
        </h1>
        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value as 'all' | 'current' | 'expired')
          }
          className='text-white px-2 py-1 rounded border border-purple-main'>
          <option value='all'>All</option>
          <option value='current'>Current</option>
          <option value='expired'>Expired</option>
        </select>
      </div>

      <div className='flex flex-wrap mt-[20px] gap-[26px]'>
        {isLoading && (
          <img
            src={loader}
            alt='loader'
            className='w-[100px] h-[100px] object-contain'
          />
        )}

        {!isLoading && filteredCampaigns.length === 0 && (
          <p className='font-epilogue font-semibold text-[14px] leading-[30px] text-secondary-text'>
            No campaigns found for this filter.
          </p>
        )}

        {!isLoading &&
          filteredCampaigns.length > 0 &&
          filteredCampaigns.map((campaign) => (
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
