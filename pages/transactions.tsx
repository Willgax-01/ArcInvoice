import Layout from '../components/Layout';
import { mockInvoices } from '../lib/mockData';

export default function TransactionsPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Transaction History</p>
          <h2 className="text-3xl font-semibold text-white">Recent payment activity</h2>
        </div>

        <div className="space-y-4">
          {mockInvoices.map((invoice) => (
            <div key={invoice.id} className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-lg font-semibold text-white">{invoice.customerName}</p>
                  <p className="mt-1 text-sm text-slate-400">{invoice.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-semibold text-white">${invoice.amount.toLocaleString()}</p>
                  <p className="mt-1 text-sm text-slate-400">{invoice.createdAt}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span className={`rounded-full px-3 py-1 text-sm ${invoice.status === 'Paid' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-amber-500/15 text-amber-300'}`}>
                  {invoice.status}
                </span>
                <span className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-sm text-slate-300">
                  Tx: {invoice.txHash}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
