import React, { useState, Suspense, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { loader } from '../assets';

const FundCard = React.lazy(() => import('./FundCard'));
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

  const searchFilteredCampaigns = useMemo(() => {
    const query = searchTerm.toLowerCase();
    return campaigns.filter(
      (campaign) =>
        campaign.title.toLowerCase().includes(query) ||
        campaign.description.toLowerCase().includes(query) ||
        campaign.category.toLowerCase().includes(query)
    );
  }, [campaigns, searchTerm]);

  const deadlineFiltered = useMemo(() => {
    const now = Date.now();
    return campaigns.filter((campaign) => {
      const deadline = Number(campaign.deadline);
      if (filter === 'active') return deadline >= now;
      if (filter === 'expired') return deadline < now;
      return true;
    });
  }, [campaigns, filter]);

  const finalCampaigns =
    searchTerm.trim().length > 0 ? searchFilteredCampaigns : deadlineFiltered;

  return (
    <div>
      <div className='flex flex-col'>
        <div className='flex flex-row'>
          <h2 className='font-epilogue font-semibold text-[18px] text-white text-left pr-8'>
            <div className='flex flex-row'>
              <p className='mr-2'>{title}</p>({finalCampaigns.length})
            </div>
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

        {!isLoading && finalCampaigns.length > 0 && (
          <Suspense fallback={<div className='text-white'>Loading...</div>}>
            {finalCampaigns.map((campaign) => (
              <FundCard
                key={campaign.pId}
                {...campaign}
                handleClick={() => handleNavigate(campaign)}
              />
            ))}
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
