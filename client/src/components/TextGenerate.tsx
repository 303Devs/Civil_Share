'use client';
import React, { useEffect } from 'react';
import { motion, stagger, useAnimate } from 'motion/react';
import { cn } from '../lib/utils';

const TextGenerate = ({
  words,
  className,
  filter = true,
  duration = 0.3,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(' ');
  useEffect(() => {
    animate(
      'span',
      {
        opacity: 1,
        filter: 'blur(0px)',
      },
      {
        duration: duration ? duration : 1,
        delay: stagger(0.2),
      }
    );
  }, [animate, duration]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className='text-neutral-200 opacity-0 font-semibold font-mono'
              style={{
                filter: filter ? 'blur(4px)' : 'none',
                willChange: 'opacity, filter',
              }}
            >
              {word}{' '}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn('font-bold', className)}>
      <div className='mt-4'>
        <div className=' dark:text-white text-black text-2xl leading-snug tracking-wide'>
          {renderWords()}
        </div>
      </div>
    </div>
  );
};

export default TextGenerate;
