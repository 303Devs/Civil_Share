import React from 'react'

interface CustomButtonProps {
  btnType: 'submit' | 'reset' | 'button' | undefined
  title: string
  styles?: string
  handleClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const CustomButton: React.FC<CustomButtonProps> = ({ btnType, title, styles, handleClick }) => {
  return (
    <button
      type={btnType}
      className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${styles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  )
}

export default CustomButton