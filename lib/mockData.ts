export type Invoice = {
  id: number;
  customerName: string;
  description: string;
  amount: number;
  status: 'Pending' | 'Paid';
  txHash: string;
  createdAt: string;
};

export const mockInvoices: Invoice[] = [
  {
    id: 1,
    customerName: 'Nova Labs',
    description: 'Smart contract audit',
    amount: 3200,
    status: 'Paid',
    txHash: '0x3f91...b2d4',
    createdAt: '2026-07-01',
  },
  {
    id: 2,
    customerName: 'Northstar Studio',
    description: 'Web3 onboarding sprint',
    amount: 1850,
    status: 'Pending',
    txHash: '0x8c21...66ef',
    createdAt: '2026-07-12',
  },
];

export const mockWalletAddress = '0xA1b2C3d4E5f6...';
