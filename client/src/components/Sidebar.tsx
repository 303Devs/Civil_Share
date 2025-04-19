import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useActivePageContext } from '../context';
import { useContractContext } from '../context/ContractContext';
import Icon from './Icon';

import { useDisconnect, useActiveWallet } from 'thirdweb/react';
import { navlinks } from '../constants';

const Sidebar = () => {
  const navigate = useNavigate();
  const { disconnect } = useDisconnect();
  const { isActive, setActivePage } = useActivePageContext();
  const { setActiveAccount } = useContractContext();
  const wallet = useActiveWallet();

  return (
    <div className='flex justify-between items-center flex-col sticky top-5 h-[93vh]'>
      <Link
        to='/'
        onClick={() => setActivePage('home')}
      >
        <div
          className={`w-[48px] h-[48px] rounded-[10px] flex justify-center items-center`}
        >
          <img
            src={'/icons/logo-purple.svg'}
            alt='logo'
            loading='lazy'
            className={''}
          />
        </div>
      </Link>

      <div className='flex-1 flex flex-col justify-between items-center bg-black-1 rounded-[20px] w-[76px] py-4 mt-12'>
        <div className='flex flex-col justify-center items-center gap-3'>
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if (!link.disabled) {
                  if (link.name === 'logout' && wallet) {
                    setActiveAccount(null);
                    setActivePage('home');
                    disconnect(wallet);
                    navigate('/home');
                  }
                  setActivePage(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>

        <Icon
          styles='bg-black-1 shadow-secondary'
          imgUrl={'/icons/sun.svg'}
          name='theme'
          isActive={isActive}
        />
      </div>
    </div>
  );
};

export default Sidebar;
