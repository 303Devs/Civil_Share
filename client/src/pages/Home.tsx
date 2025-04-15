'use client';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lamp, MagicButton, TextGenerate } from '../components';

import logo from '../assets/logo.webp';

export function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <Lamp>
        <img
          src={logo}
          width={200}
          height={200}
        />
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className='mt-8 bg-gradient-to-br from-slate-300 to-slate-500 pt-4 pb-28 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl'>
          <TextGenerate words={'Welcome to Civil Share'} />
        </motion.h1>
        <div>
          <MagicButton
            title={'Start Sharing'}
            icon={
              <img
                src={logo}
                width={25}
                height={25}
              />
            }
            position={'left'}
            handleClick={() => {
              navigate('/dashboard');
            }}
            otherClasses={'text-neutral-200'}
          />
        </div>
      </Lamp>
    </div>
  );
}

export default Home;
