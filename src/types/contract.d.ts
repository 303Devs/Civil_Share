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
}

interface ContextProviderProps {
  children: ReactNode;
}
