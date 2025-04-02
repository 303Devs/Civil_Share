import React from 'react';

type CountBoxProps = {
  title: string;
  value: string | number;
};

const CountBox = ({ title, value }: CountBoxProps) => {
  return (
    <div className='flex flex-col items-center  w-[150px]'>
      <h4 className='font-epilogue font-bold text-[30px] text-white p-3 bg-black-1 rounded-t-[10px] w-full text-center truncate'>
        {value}
      </h4>
      <p className='font-epilogue  font-normal text-[16px] text-primary-text bg-grey-2 px-3 py-2 w-full rounded-b-[10px] text-center'>
        {title}
      </p>
    </div>
  );
};

export default CountBox;
