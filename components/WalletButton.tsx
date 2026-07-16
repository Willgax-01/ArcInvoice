import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
    };
  }
}

export default function WalletButton() {
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const storedAddress = window.localStorage.getItem('arcinvoice-address');
    if (storedAddress) {
      setAddress(storedAddress);
    }
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError('Please install a wallet compatible with Ethereum-based networks.');
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum as never);
      const signer = await provider.getSigner();
      const walletAddress = await signer.getAddress();
      const formattedAddress = `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;

      setAddress(formattedAddress);
      window.localStorage.setItem('arcinvoice-address', formattedAddress);
      setError('');
    } catch {
      setError('Wallet connection was cancelled or denied.');
    }
  };

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={connectWallet}
        className="rounded-full border border-cyan-500/25 bg-cyan-500/10 px-3 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-500/20"
      >
        {address ? `Wallet: ${address}` : 'Connect Wallet'}
      </button>
      {error ? <p className="text-xs text-rose-300">{error}</p> : null}
    </div>
  );
}
