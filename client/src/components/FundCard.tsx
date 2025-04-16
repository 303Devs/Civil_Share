import React, { MouseEventHandler, useMemo } from 'react';

import { daysLeft } from '../utils';

const StatBlock = ({ label, value }: { label: string; value: string }) => (
  <div className='flex flex-col'>
    <h4 className='font-epilogue font-semibold text-[14px] text-tertiary-text leading-[22px]'>
      {value}
    </h4>
    <p className='mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-primary-text sm:max-w-[120px] truncate'>
      {label}
    </p>
  </div>
);

interface FundCardProps extends Campaign {
  handleClick: MouseEventHandler;
}

const FundCard = React.memo(
  ({
    owner,
    title,
    description,
    target,
    deadline,
    amountCollected,
    image,
    category,
    handleClick,
  }: FundCardProps) => {
    const remainingDays = useMemo(
      () => daysLeft(new Date(deadline)),
      [deadline]
    );
    return (
      <div
        className='sm:w-[288px] w-full rounded-[15px] bg-black-1 cursor-pointer'
        onClick={handleClick}
      >
        <img
          src={image}
          alt='fund'
          loading='lazy'
          width='288'
          height='288'
          className='w-full object-cover rounded-[15px]'
        />

        <div className='flex flex-col p-4'>
          <div className='flex flex-row items-center mb-[18px]'>
            <img
              src={'/icons/type.svg'}
              alt='tag'
              loading='lazy'
              className='w-[17px] h-[17px] object-contain'
            />
            <p className='ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-primary-text'>
              {category}
            </p>
          </div>

          <div className='block'>
            <h3 className='font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate'>
              {title}
            </h3>
            <p className='mt-[5px] font-epilogue font-[12px] text-primary-text text-left leading-[18px] truncate'>
              {description}
            </p>
          </div>

          <div className='flex justify-between flex-wrap mt-[15px] gap-2'>
            <StatBlock
              label={`Raised of ${target}`}
              value={amountCollected}
            />
          </div>

          <div className='flex justify-between flex-wrap mt-[15px] gap-2'>
            <StatBlock
              label='Days Left'
              value={remainingDays.toString()}
            />
          </div>

          <div className='flex items-center mt-[20px] gap-[12px]'>
            <div className='w-[30px] h-[30px] rounded-full flex justify-center items-center bg-black-bg'>
              <img
                src={'/logo.svg'}
                alt='user'
                loading='lazy'
                className='w-1/2 h-1/2 object-contain'
              />
            </div>
            <p className='flex-1 font-epilogue font-normal text-[12px] text-primary-text truncate'>
              by <span className='text-tertiary-text'>{owner}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
);

FundCard.displayName = 'FundCard';

export default FundCard;
