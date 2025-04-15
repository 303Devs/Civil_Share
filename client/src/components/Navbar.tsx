import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useActivePageContext, useContractContext } from '../context';
import { WalletButton, TextGenerate } from './';
import { logo, menu, search } from '../assets';
import { navlinks } from '../constants';

interface SearchBarProps {
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ handleSearch }) => (
  <div className='flex flex-row w-full px-4 py-2 h-[52px] bg-black-1 rounded-[100px]'>
    <input
      type='text'
      placeholder='Search Campaigns'
      className='flex w-full font-epilogue font-normal text-[14px] placeholder:text-placeholder-text text-white bg-transparent outline-hidden'
      onChange={handleSearch}
    />
    <div className='w-[72px] h-full rounded-[20px] bg-purple-main flex justify-center items-center cursor-pointer'>
      <img
        src={search}
        alt='search'
        className='w-[15px] h-[15px] object-contain'
      />
    </div>
  </div>
);

const Navbar = () => {
  const navigate = useNavigate();
  const { isActive, setActivePage } = useActivePageContext();
  const { setSearchTerm } = useContractContext();
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const title = 'Civil Share';

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      {/* Large screen navigation */}
      <div className='hidden lg:flex w-full flex-row justify-between items-center pb-12'>
        <h1 className='h-fit w-full'>
          <TextGenerate
            words={title}
            className='relative -mt-2 pb-2'
          />
        </h1>
        <div className='w-[60%] pr-4'>
          <SearchBar handleSearch={handleSearch} />
        </div>
        <div className='flex flex-row gap-4'>
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
      </div>

      {/* Sm and Md screen navigation */}
      <div className='hidden sm:flex lg:hidden w-full flex-col justify-between pb-12'>
        <div className='flex flex-row justify-between pb-8'>
          <h1 className='h-fit'>
            <TextGenerate
              words={title}
              className='relative -mt-2 pb-2'
            />
          </h1>
          <div className='flex flex-row gap-4'>
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
        </div>
        <SearchBar handleSearch={handleSearch} />
      </div>

      {/* XSmall screen navigation */}
      <div className='sm:hidden flex flex-col gap-4'>
        <div className='flex justify-between items-center relative'>
          <div className='w-[40px] h-[40px] rounded-[10px] bg-black-1 flex justify-center items-center cursor-pointer'>
            <img
              src={logo}
              alt='user'
              className='w-[60%] h-[60%] object-contain'
            />
          </div>
          <h1>
            <TextGenerate
              words={title}
              className='pb-4'
            />
          </h1>
          <img
            src={menu}
            alt='menu'
            className='w-[34px] h-[34px] object-contain cursor-pointer'
            onClick={() => setToggleDrawer((prev) => !prev)}
          />
        </div>
        <div className='pb-8'>
          <SearchBar handleSearch={handleSearch} />
        </div>
        <div
          className={`absolute top-[60px] right-0 left-0 bg-black-1 z-10 shadow-secondary py-4 ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700`}>
          <ul>
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${isActive === link.name && 'bg-black-2'}`}
                onClick={() => {
                  if (!link.disabled) {
                    setActivePage(link.name);
                    setToggleDrawer(false);
                    navigate(link.link);
                  }
                }}>
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${isActive === link.name ? 'grayscale-0 ' : 'grayscale'}`}
                />
                <p
                  className={`ml-[20px] font-epilogue font-semibold text-[14px] cursor-default ${isActive === link.name ? 'text-light-purple' : 'text-primary-text'}`}>
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
