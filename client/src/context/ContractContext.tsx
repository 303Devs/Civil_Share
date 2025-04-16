import React, { createContext, useContext, useState } from 'react';
import { createThirdwebClient, getContract } from 'thirdweb';
import {
  prepareContractCall,
  readContract,
  sendAndConfirmTransaction,
} from 'thirdweb/transaction';
import { toEther, toWei } from 'thirdweb/utils';
import { base } from 'thirdweb/chains';
import { Account } from 'thirdweb/dist/types/exports/wallets.native';
import { ToastContainer, toast } from 'react-toastify';

const ContractContext = createContext<ContractContextType | null>(null);

const client = createThirdwebClient({
  clientId: `${import.meta.env.VITE_CLIENT_ID}`,
});

const contract = getContract({
  client: client,
  chain: base,
  address: import.meta.env.VITE_CONTRACT_ADDRESS,
  abi: [
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'campaigns',
      outputs: [
        {
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          internalType: 'string',
          name: 'title',
          type: 'string',
        },
        {
          internalType: 'string',
          name: 'description',
          type: 'string',
        },
        {
          internalType: 'uint256',
          name: 'target',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'deadline',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'amountCollected',
          type: 'uint256',
        },
        {
          internalType: 'string',
          name: 'image',
          type: 'string',
        },
        {
          internalType: 'string',
          name: 'category',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_owner',
          type: 'address',
        },
        {
          internalType: 'string',
          name: '_title',
          type: 'string',
        },
        {
          internalType: 'string',
          name: '_description',
          type: 'string',
        },
        {
          internalType: 'uint256',
          name: '_target',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '_deadline',
          type: 'uint256',
        },
        {
          internalType: 'string',
          name: '_image',
          type: 'string',
        },
        {
          internalType: 'string',
          name: '_category',
          type: 'string',
        },
      ],
      name: 'createCampaign',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_id',
          type: 'uint256',
        },
      ],
      name: 'donateToCampaign',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getCampaigns',
      outputs: [
        {
          components: [
            {
              internalType: 'address',
              name: 'owner',
              type: 'address',
            },
            {
              internalType: 'string',
              name: 'title',
              type: 'string',
            },
            {
              internalType: 'string',
              name: 'description',
              type: 'string',
            },
            {
              internalType: 'uint256',
              name: 'target',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'deadline',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'amountCollected',
              type: 'uint256',
            },
            {
              internalType: 'string',
              name: 'image',
              type: 'string',
            },
            {
              internalType: 'string',
              name: 'category',
              type: 'string',
            },
            {
              internalType: 'address[]',
              name: 'donators',
              type: 'address[]',
            },
            {
              internalType: 'uint256[]',
              name: 'donations',
              type: 'uint256[]',
            },
          ],
          internalType: 'struct CivilShare.Campaign[]',
          name: '',
          type: 'tuple[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_id',
          type: 'uint256',
        },
      ],
      name: 'getDonators',
      outputs: [
        {
          internalType: 'address[]',
          name: '',
          type: 'address[]',
        },
        {
          internalType: 'uint256[]',
          name: '',
          type: 'uint256[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'numberOfCampaigns',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ],
});

export const ContractContextProvider = ({ children }: ContextProviderProps) => {
  const [account, setAccount] = useState<Account | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const setActiveAccount = (userAccount: Account) => {
    setAccount(userAccount);
  };

  /* A function to publish a campaign to the blockchain*/
  const publishCampaign = async ({
    title,
    description,
    target,
    deadline,
    image,
    category,
  }: Form) => {
    if (!account) {
      alert('Wallet not connected. Please connect a wallet and try again.');
      return;
    }

    const transaction = prepareContractCall({
      contract,
      method: 'createCampaign',
      params: [
        account.address,
        title,
        description,
        target,
        BigInt(new Date(deadline).getTime()),
        image,
        category,
      ],
    });

    const receipt = await sendAndConfirmTransaction({ transaction, account });
    return receipt;
  };

  /* A function to fetch all campaigns */
  const getCampaigns = async () => {
    const campaigns = await readContract({
      contract,
      method: 'getCampaigns',
      params: [],
    });

    const parsedCampaigns = campaigns.map(
      (
        {
          owner,
          title,
          description,
          target,
          deadline,
          amountCollected,
          image,
          category,
        },
        i
      ) => ({
        owner,
        title,
        description,
        target: toEther(target),
        deadline: Number(deadline.toString()),
        amountCollected: toEther(amountCollected),
        image,
        category,
        pId: i,
      })
    );

    return parsedCampaigns;
  };

  /* A function to fetch a users published campaigns */
  const getUserCampaigns = async (address?: string) => {
    try {
      const campaigns = await getCampaigns();

      if (address) {
        return campaigns.filter((campaign) => campaign.owner === address);
      }

      return campaigns.filter(
        (campaign) => campaign.owner === account?.address
      );
    } catch (error) {
      toast(
        `Failed to fetch user campaigns. Please connect a Wallet. ${error}`
      );
      <ToastContainer />;
      return [];
    }
  };

  // A function for the current user can donate to a campaign
  const donate = async (pId: bigint, amount: string) => {
    if (!account) {
      alert('Wallet not connected. Please connect a wallet and try again.');
      return;
    }

    const transaction = prepareContractCall({
      contract,
      method: 'donateToCampaign',
      params: [pId],
      value: toWei(amount),
    });

    if (!account || !contract) {
      alert('Wallet not connected. Please connect a wallet and try again.');
      return;
    }

    const receipt = await sendAndConfirmTransaction({
      transaction,
      account,
    });

    return receipt;
  };

  // A function to fetch all the donations of a campaign
  const getDonations = async (pId: bigint) => {
    const donations = await readContract({
      contract,
      method: 'getDonators',
      params: [pId],
    });
    const numberOfDonations = donations[0].length;
    const parsedDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: toEther(donations[1][i]),
      });
    }
    return parsedDonations;
  };

  return (
    <ContractContext.Provider
      value={{
        client,
        account,
        contract,
        setActiveAccount,
        publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </ContractContext.Provider>
  );
};

// This is the custom hook to use the ContractContext
export const useContractContext = () => {
  const context = useContext(ContractContext);

  if (!context) {
    throw new Error(
      'useStateContext must be used within a StateContextProvider'
    );
  }

  return context;
};
