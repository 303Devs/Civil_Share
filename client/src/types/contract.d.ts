interface GetUserCampaignsProps {
  owner: string;
  title: string;
  description: string;
  target: string;
  deadline: number;
  amountCollected: string;
  image: string;
  pId: number;
}

interface ContractContextType {
  client: ThirdwebClient | null;
  account: Account | null;
  contract: Contract | undefined;
  setActiveAccount: (account: Account) => void;
  publishCampaign: (form: Form) => Promise<TransactionHash>;
  getCampaigns: () => Promise<Campaign[]>;
  getUserCampaigns: () => Promise<Campaign[]>;
  donate: (pId: bigint, amount: string) => Promise<TransactionHash>;
  getDonations: (
    pId: bigint
  ) => Promise<{ donator: string; donation: string }[]>;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

interface ContextProviderProps {
  children: ReactNode;
}

const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const term = e.target.value.toLowerCase();
  setSearchTerm(term);

  try {
    const campaigns = await getCampaigns();
    const filtered = campaigns.filter(
      (c) =>
        c.title.toLowerCase().includes(term) ||
        c.description.toLowerCase().includes(term)
    );

    console.log('Search Results:', filtered);
    // You can pass these filtered results to state or props as needed.
  } catch (err) {
    console.error('Search error:', err);
  }
};
