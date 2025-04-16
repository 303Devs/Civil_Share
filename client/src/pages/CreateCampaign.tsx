import React, { useState, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';

import { useContractContext } from '../context';
import { money } from '../../public/icons';
const CustomButton = lazy(() => import('../components/CustomButton'));
const FormField = lazy(() => import('../components/FormField'));
const Loader = lazy(() => import('../components/Loader'));
const EthereumPrice = lazy(() => import('../components/EthereumPrice'));
import { checkIfImage } from '../utils';
import { toWei } from 'thirdweb';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { publishCampaign } = useContractContext();
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: '',
    category: '',
  });

  const handleFormFieldChange = (
    fieldName: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists: boolean) => {
      if (exists) {
        setIsLoading(true);

        await publishCampaign({
          ...form,
          target: toWei(form.target),
        });
        setIsLoading(false);
        navigate('/profile');
      } else {
        alert('Provide valid image URL');
        setForm({ ...form, image: '' });
      }
    });
  };

  return (
    <div className='bg-black-1 flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4'>
      {isLoading && (
        <Suspense fallback={null}>
          <Loader />
        </Suspense>
      )}
      <div className='flex justify-center items-center p-[16px] sm:min-w-[380px] bg-black-2 rounded-[10px]'>
        <h1 className='font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white'>
          Start a Campaign 🚀
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className='w-full mt-[65px] flex flex-col gap-[30px]'
      >
        <Suspense fallback={null}>
          <FormField
            labelName='Campaign Title *'
            placeholder='Write a title'
            inputType='text'
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </Suspense>
        <div className='flex flex-wrap gap-[40px]'>
          <Suspense fallback={null}>
            <FormField
              labelName='Your Name *'
              placeholder='John Doe'
              inputType='text'
              value={form.name}
              handleChange={(e) => handleFormFieldChange('name', e)}
            />
          </Suspense>
          <Suspense fallback={null}>
            <FormField
              labelName='Category *'
              placeholder='Select a Category'
              inputType='text'
              value={form.category}
              handleChange={(e) => handleFormFieldChange('category', e)}
            />
          </Suspense>
        </div>

        <Suspense fallback={null}>
          <FormField
            labelName='Story *'
            placeholder='Write your story'
            isTextArea
            value={form.description}
            handleChange={(e) => handleFormFieldChange('description', e)}
          />
        </Suspense>

        <div
          className={
            'w-full flex justify-start items-center p-4 h-[120px] bg-light-purple rounded-[10px]'
          }
        >
          <img
            src={money}
            alt='money'
            loading='lazy'
            className='w-[40px] h-[40px] object-contain'
          />
          <h4
            className={
              'font-epilogue font-bold text-[25px] text-white ml-[20px]'
            }
          >
            You will get 100% of the raised amount
          </h4>
        </div>

        <div className='flex flex-wrap gap-[40px]'>
          <div className='flex flex-col'>
            <div>
              <Suspense fallback={null}>
                <FormField
                  labelName='Goal *'
                  placeholder='ETH 0.05'
                  inputType='number'
                  value={form.target}
                  handleChange={(e) => handleFormFieldChange('target', e)}
                />
              </Suspense>
            </div>
            <Suspense fallback={null}>
              <EthereumPrice target={form.target} />
            </Suspense>
          </div>
          <Suspense fallback={null}>
            <FormField
              labelName='End Date *'
              placeholder='End Date'
              inputType='date'
              value={form.deadline}
              handleChange={(e) => handleFormFieldChange('deadline', e)}
            />
          </Suspense>
        </div>

        <Suspense fallback={null}>
          <FormField
            labelName='Campaign image *'
            placeholder='Place image URL of your campaign'
            inputType='url'
            value={form.image}
            handleChange={(e) => handleFormFieldChange('image', e)}
          />
        </Suspense>

        <div className='flex justify-center items-center mt-[40px]'>
          <Suspense fallback={null}>
            <CustomButton
              btnType='submit'
              title='Submit new campaign'
              styles='bg-purple-main'
            />
          </Suspense>
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;
