import { useEffect, useState } from "react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: {
      request: (args: {
        method: string;
        params?: unknown[];
      }) => Promise<unknown>;
    };
  }
}

export default function WalletButton() {
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedAddress = window.localStorage.getItem(
      "arcinvoice-address"
    );

    if (storedAddress) {
      setAddress(storedAddress);
    }
  }, []);

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError(
        "Please install MetaMask or another Ethereum-compatible wallet."
      );
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Ask MetaMask for permission
      await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      // Create provider
      const provider = new ethers.providers.Web3Provider(
        window.ethereum as never
      );

      // Get signer and wallet address
      const signer = provider.getSigner();
      const walletAddress = await signer.getAddress();

      // Format address
      const formattedAddress =
        `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`;

      // Save state
      setAddress(formattedAddress);

      // Store locally
      window.localStorage.setItem(
        "arcinvoice-address",
        formattedAddress
      );

      setError("");
    } catch (err) {
      console.error(err);

      setError(
        "Wallet connection was cancelled or denied."
      );
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    setAddress(null);
    setError("");

    window.localStorage.removeItem(
      "arcinvoice-address"
    );
  };

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={
          address ? disconnectWallet : connectWallet
        }
        disabled={loading}
        className="
          rounded-full
          border
          border-cyan-500/25
          bg-cyan-500/10
          px-4
          py-2
          text-sm
          font-medium
          text-cyan-200
          transition
          hover:bg-cyan-500/20
        "
      >
        {loading
          ? "Connecting..."
          : address
          ? `Wallet: ${address}`
          : "Connect Wallet"}
      </button>

      {error && (
        <p className="text-xs text-rose-300">
          {error}
        </p>
      )}
    </div>
  );
}