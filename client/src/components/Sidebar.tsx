import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useActivePageContext } from '../context';
import { logo, sun } from '../assets';
import { navlinks } from '../constants';

interface IconProps {
  styles?: string;
  name?: string;
  imgUrl: string;
  isActive?: string;
  disabled?: boolean;
  handleClick?: React.MouseEventHandler<HTMLDivElement>;
}

const IconComponent: React.FC<IconProps> = ({
  styles,
  name,
  imgUrl,
  isActive,
  disabled,
  handleClick,
}) => {
  const isCurrentlyActive = isActive && isActive === name;
  const imgClass =
    !isActive ? 'w-[30px] h-[30px]' : (
      `w-1/2 h-1/2 ${isCurrentlyActive ? '' : 'grayscale'}`
    );

  return (
    <div
      className={`w-[48px] h-[48px] rounded-[10px] flex justify-center items-center ${
        isCurrentlyActive ? 'bg-black-1' : ''
      } ${!disabled ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed'} ${styles}`}
      onClick={!disabled ? handleClick : undefined}>
      <img
        src={imgUrl}
        alt='logo'
        loading='lazy'
        className={imgClass}
      />
    </div>
  );
};

const Icon = React.memo(IconComponent);

const Sidebar = () => {
  const navigate = useNavigate();
  const { isActive, setActivePage } = useActivePageContext();

  return (
    <div className='flex justify-between items-center flex-col sticky top-5 h-[93vh]'>
      <Link
        to='/'
        onClick={() => setActivePage('home')}>
        <Icon
          styles='w-[48px] h-[48px] bg-bg-1'
          imgUrl={logo}
          name='home'
        />
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
                  setActivePage(link.name);
                  navigate(link.link);
                }
              }}
            />
          ))}
        </div>

        <Icon
          styles='bg-black-1 shadow-secondary'
          imgUrl={sun}
          name='theme'
          isActive={isActive}
        />
      </div>
    </div>
  );
};

export default Sidebar;
