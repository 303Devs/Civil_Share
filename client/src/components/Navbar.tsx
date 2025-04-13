import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useContractContext, useActivePageContext } from '../context';
import { WalletButton } from './';
import { logo, menu, search } from '../assets';
import { navlinks } from '../constants';


const Navbar = () => {
  const navigate = useNavigate();
  const { isActive, setActivePage } = useActivePageContext();
  const { getCampaigns } = useContractContext();
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    console.log(searchTerm)
  }

  return (
    <div className='flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6'>
      <div className='lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-black-1 rounded-[100px]'>
        <input
          type='text'
          placeholder='Search for campaigns'
          className='flex w-full font-epilogue font-normal text-[14px] placeholder:text-placeholder-text text-white bg-transparent outline-hidden'
          onChange={(e) => handleSearch(e)}
        />

        <div className='w-[72px] h-full rounded-[20px] bg-green-2 flex justify-center items-center cursor-pointer'>
          <img
            src={search}
            alt='search'
            className='w-[15px] h-[15px] object-contain'
          />
        </div>
      </div>

      <div className='sm:flex hidden flex-row justify-end gap-4'>
        <WalletButton />
        <Link
          to='/profile'
          onClick={() => setActivePage('profile')}>
          <div className='w-[52px] h-[52px] rounded-full bg-black-1 flex justify-center items-center cursor-pointer'>
            <img
              src={logo}
              alt='user'
              className='w-[60%] h-[60%] object-contain'
            />
          </div>
        </Link>
      </div>

      {/* Small screen navigation */}
      <div className='sm:hidden flex justify-between items-center relative'>
        <div className='w-[40px] h-[40px] rounded-[10px] bg-black-1 flex justify-center items-center cursor-pointer'>
          <img
            src={logo}
            alt='user'
            className='w-[60%] h-[60%] object-contain'
          />
        </div>

        <img
          src={menu}
          alt='menu'
          className={'w-[34px] h-[34px] object-contain cursor-pointer'}
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        <div
          className={`absolute top-[60px] right-0 left-0 bg-black-1 z-10 shadow-secondary py-4 ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700`}>
          <ul>
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${isActive === link.name && 'bg-black-2'}`}
                onClick={() => {
                  setActivePage(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}>
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${isActive === link.name ? 'grayscale-0 ' : 'grayscale'}`}
                />
                <p
                  className={`ml-[20px] font-epilogue font-semibold text-[14px] cursor-default ${isActive === link.name ? 'text-green-1' : 'text-primary-text'}`}>
                  {link.name}
                </p>
              </li>
            ))}
          </ul>

          <div className='flex mx-4'>
            <WalletButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
