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
  setActiveAccount: (_account: Account) => void;
  publishCampaign: (_form: Form) => Promise<TransactionHash>;
  getCampaigns: () => Promise<Campaign[]>;
  getUserCampaigns: (_address?: string) => Promise<Campaign[]>;
  donate: (_pId: bigint, _amount: string) => Promise<TransactionHash>;
  getDonations: (
    _pId: bigint
  ) => Promise<{ donator: string; donation: string }[]>;
  searchTerm: string;
  setSearchTerm: (_term: string) => void;
  canCreateCampaign: () => boolean; // Added
  registerCampaignCreation: () => void; // Added
}

interface ContextProviderProps {
  children: ReactNode;
}
