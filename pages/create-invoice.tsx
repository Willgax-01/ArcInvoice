import { FormEvent, useState } from 'react';
import QRCode from 'react-qr-code';
import Layout from '../components/Layout';
import { mockWalletAddress } from '../lib/mockData';

export default function CreateInvoicePage() {
  const [customerName, setCustomerName] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState<'Pending' | 'Paid'>('Pending');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setStatus('Pending');
  };

  const paymentValue = `arcinvoice:${customerName || 'customer'}:${amount || '0'}`;

  return (
    <Layout>
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl shadow-cyan-950/30">
          <h2 className="text-2xl font-semibold text-white">Create invoice</h2>
          <p className="mt-2 text-slate-400">Fill in the invoice details and share a QR payment link.</p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm text-slate-300">Customer Name</label>
              <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 outline-none ring-0" placeholder="Nova Labs" />
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300">Service Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="min-h-24 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 outline-none" placeholder="Product design sprint" />
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300">Amount</label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 outline-none" placeholder="3200" />
            </div>
            <button type="submit" className="w-full rounded-full bg-cyan-500 px-4 py-3 font-medium text-slate-950 transition hover:bg-cyan-400">
              Create Invoice
            </button>
          </form>
        </section>

        <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl shadow-cyan-950/30">
          <h3 className="text-xl font-semibold text-white">Payment QR</h3>
          <p className="mt-2 text-sm text-slate-400">This is a mock Arc Testnet payment link for now.</p>

          <div className="mt-6 flex flex-col items-center rounded-2xl border border-cyan-500/20 bg-slate-950/70 p-5">
            <div className="rounded-2xl bg-white p-4">
              <QRCode value={paymentValue} size={180} />
            </div>
            <div className="mt-4 w-full rounded-2xl bg-slate-800/80 p-4 text-sm text-slate-300">
              <p className="font-medium text-white">Invoice status: {status}</p>
              <p className="mt-2 break-all">Wallet: {mockWalletAddress}</p>
              <p className="mt-2 break-all">Memo: {paymentValue}</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-200">
            <p>Arc RPC and contract address placeholders can be added in this component later.</p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
