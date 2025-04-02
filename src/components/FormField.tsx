import React from 'react';

interface FormFieldProps {
  labelName: string;
  placeholder: string;
  inputType?: string;
  isTextArea?: boolean;
  value: string;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const FormField: React.FC<FormFieldProps> = ({
  labelName,
  placeholder,
  inputType,
  isTextArea,
  value,
  handleChange,
}) => {
  return (
    <label className='flex-1 w-full flex flex-col'>
      {labelName && (
        <span className='font-epilogue font-medium text-[14px] leading-[22px] text-primary-text mb-[10px]'>
          {labelName}
        </span>
      )}
      {isTextArea ?
        <textarea
          required
          value={value}
          onChange={handleChange}
          rows={10}
          placeholder={placeholder}
          className={
            'py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-black-2 bg-transparent font-epilogue text-white text-[14px] placeholder:text-placeholder-text rounded-[10px] sm:min-w-[300px]'
          }
        />
      : <input
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          step='0.01'
          min='0.01'
          placeholder={placeholder}
          className={
            'py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-black-2 bg-transparent font-epilogue text-white text-[14px] placeholder:text-placeholder-text rounded-[10px] sm:min-w-[300px]'
          }
        />
      }
    </label>
  );
};

export default FormField;
