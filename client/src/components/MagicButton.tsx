import React from 'react';

const MagicButton = ({
  title,
  icon,
  position,
  handleClick,
  otherClasses,
}: {
  title: string;
  icon: React.ReactNode;
  position: string;
  handleClick?: () => void;
  otherClasses?: string;
}) => {
  return (
    <button
      className='relative inline-flex h-12 w-fit overflow-hidden rounded-lg p-[1px] focus-visible:outline-none md:w-60'
      onClick={handleClick}
    >
      <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#9300F3_0%,#00CFFF_50%,#9300F3_100%)]' />{' '}
      <span
        className={`inline-flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-background/70 px-7 py-1 text-sm font-medium text-foreground backdrop-blur-md ${otherClasses}`}
      >
        {position === 'left' && icon}
        {title}
        {position === 'right' && icon}
      </span>
    </button>
  );
};

export default MagicButton;
