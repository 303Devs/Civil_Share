import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useActivePageContext } from '../context';

import { navlinks } from '../constants';

const MobileMenu = () => {
  const navigate = useNavigate();
  const { isActive, setActivePage } = useActivePageContext();
  const [toggleDrawer, setToggleDrawer] = useState(false);

  return (
    <div
      className={`absolute top-[60px] right-0 left-0 bg-black-1 z-10 shadow-secondary py-4 ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700`}
    >
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
            }}
          >
            <img
              src={link.imgUrl}
              alt={link.name}
              className={`w-[24px] h-[24px] object-contain ${isActive === link.name ? 'grayscale-0 ' : 'grayscale'}`}
            />
            <p
              className={`ml-[20px] font-epilogue font-semibold text-[14px] cursor-default ${isActive === link.name ? 'text-light-purple' : 'text-primary-text'}`}
            >
              {link.name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MobileMenu;
