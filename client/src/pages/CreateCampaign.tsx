import React, { useState, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';

import { useContractContext } from '../context';
import { campaignCategories } from '../constants';
const CustomButton = lazy(() => import('../components/CustomButton'));
const FormField = lazy(() => import('../components/FormField'));
const Loader = lazy(() => import('../components/Loader'));
const EthereumPrice = lazy(() => import('../components/EthereumPrice'));
const WalletButton = lazy(() => import('../components/WalletButton'));
import { toast } from 'react-toastify';
import { checkIfImage } from '../utils';
import { toWei } from 'thirdweb';

const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { account, publishCampaign, canCreateCampaign, registerCampaignCreation } =
    useContractContext();
  const [form, setForm] = useState({
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

    if (!canCreateCampaign()) {
      toast.error(
        'You can only create one campaign every 24 hours. Please try again later.',
        { position: 'bottom-right', autoClose: 5000, theme: 'colored' }
      );
      return;
    }

    checkIfImage(form.image, async (exists: boolean) => {
      if (exists) {
        setIsLoading(true);

        await publishCampaign({
          ...form,
          target: toWei(form.target),
        });
        registerCampaignCreation();
        setIsLoading(false);
        navigate('/profile');
      } else {
        toast.error('Please provide a valid image URL.');
        setForm({ ...form, image: '' });
      }
    });
  };

  if (!account) {
    return (
      <div className='bg-black-1 flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 gap-6'>
        <h2 className='font-epilogue font-bold text-[18px] text-white text-center'>
          Connect your wallet to create a campaign
        </h2>
        <Suspense fallback={<div />}>
          <WalletButton />
        </Suspense>
      </div>
    );
  }

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
          <label className='flex-1 w-full flex flex-col'>
            <span className='font-epilogue font-medium text-[14px] leading-[22px] text-primary-text mb-[10px]'>
              Category *
            </span>
            <select
              required
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
              className='py-[15px] sm:px-[25px] px-[15px] outline-hidden border-[1px] border-black-2 bg-black-bg font-epilogue text-white text-[14px] rounded-[10px] sm:min-w-[300px]'
            >
              <option value='' disabled>
                Select a category
              </option>
              {campaignCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </label>
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

        <div className='w-full flex justify-start items-center p-4 h-[120px] bg-light-purple rounded-[10px]'>
          <img
            src={'/icons/money.svg'}
            alt='money'
            loading='lazy'
            className='w-[40px] h-[40px] object-contain'
          />
          <h4 className='font-epilogue font-bold text-[25px] text-white ml-[20px]'>
            You will get 100% of the raised amount
          </h4>
        </div>

        <div className='flex flex-wrap gap-[40px]'>
          <div className='flex flex-col'>
            <Suspense fallback={null}>
              <FormField
                labelName='Goal *'
                placeholder='ETH 0.05'
                inputType='number'
                value={form.target}
                handleChange={(e) => handleFormFieldChange('target', e)}
              />
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
