import Link from 'next/link';
import Layout from '../components/Layout';
import WalletButton from '../components/WalletButton';

export default function HomePage() {
  return (
    <Layout>
      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">
            Modern Arc Testnet invoicing
          </span>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            ArcInvoice Phase 2 Ready
          </h1>
          <p className="max-w-xl text-lg text-slate-300">
            ArcInvoice helps freelancers and teams issue invoices, share payment QR codes, and track settlement status in a refined fintech experience.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/create-invoice" className="rounded-full bg-cyan-500 px-5 py-3 font-medium text-slate-950 transition hover:bg-cyan-400">
              Create an Invoice
            </Link>
            <Link href="/dashboard" className="rounded-full border border-white/15 px-5 py-3 font-medium text-slate-200 transition hover:bg-white/10">
              View Dashboard
            </Link>
          </div>
          <div className="pt-2">
            <WalletButton />
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-950/40">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Live wallet</p>
              <p className="mt-1 font-medium text-white">0xA1b2C3d4E5f6...</p>
            </div>
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-sm text-emerald-300">Connected</span>
          </div>
          <div className="mt-6 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 p-5">
            <p className="text-sm text-slate-400">Next payout</p>
            <p className="mt-2 text-3xl font-semibold text-white">$3,200.00</p>
            <p className="mt-3 text-sm text-slate-300">Mock Arc Testnet settlement is ready for review.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
