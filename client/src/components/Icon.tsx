import React from 'react';
interface IconProps {
  styles?: string;
  name?: string;
  imgUrl: string;
  isActive?: string;
  disabled?: boolean;
  handleClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Icon: React.FC<IconProps> = ({
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
      onClick={!disabled ? handleClick : undefined}
    >
      <img
        src={imgUrl}
        alt='logo'
        loading='lazy'
        className={imgClass}
      />
    </div>
  );
};

export default Icon;
