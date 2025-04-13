import React, { Dispatch, SetStateAction, useState } from 'react';

import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';
import CustomButton from './CustomButton';

const SuccessMessage = ({
  percentToTarget,
  showModal,
}: {
  percentToTarget: number;
  showModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const { width, height } = useWindowSize();

  return (
    <div className='fixed inset-0 z-10 h-screen bg-modal-bg flex items-center justify-center flex-col'>
      <div className='z-9'>
        <Confetti
          width={width}
          height={height}
          recycle={true}
          colors={['#13131a', '#1c1c24', '#3a3a43', '#8c6dfd',  '#1dc071', '#4acd8b', '#2c2f32', '#28282e', '#808191', '#818183', '#4b5264', '#b2b3bd']}
        />
      </div>
      <p className='font-epilogue font-bold text-3xl text-center text-white w-[65%] leading-[42px]'>
        Success! <br /> This campaign has reached its goal.
      </p>
      <div className='mt-4'>
        <CustomButton
          btnType='button'
          title='Go Above and Beyond !'
          handleClick={() => showModal(false)}
          styles='bg-light-purple'
        />
      </div>
    </div>
  );
};

export default SuccessMessage;
