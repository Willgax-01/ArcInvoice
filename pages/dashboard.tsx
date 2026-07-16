import Layout from '../components/Layout';
import { mockInvoices } from '../lib/mockData';

export default function DashboardPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Dashboard</p>
            <h2 className="text-3xl font-semibold text-white">Invoice overview</h2>
          </div>
          <div className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-200">
            Mock Arc Testnet activity
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: 'Total invoiced', value: '$8,050' },
            { label: 'Pending', value: '1' },
            { label: 'Paid', value: '1' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
              <p className="text-sm text-slate-400">{stat.label}</p>
              <p className="mt-2 text-2xl font-semibold text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <div className="grid gap-3 md:grid-cols-4">
            <div className="text-sm font-medium text-slate-400">Customer</div>
            <div className="text-sm font-medium text-slate-400">Description</div>
            <div className="text-sm font-medium text-slate-400">Amount</div>
            <div className="text-sm font-medium text-slate-400">Status</div>
          </div>
          {mockInvoices.map((invoice) => (
            <div key={invoice.id} className="mt-4 grid gap-3 rounded-2xl border border-white/10 bg-slate-950/60 p-4 md:grid-cols-4">
              <div className="text-white">{invoice.customerName}</div>
              <div className="text-slate-300">{invoice.description}</div>
              <div className="text-slate-300">${invoice.amount.toLocaleString()}</div>
              <div>
                <span className={`rounded-full px-3 py-1 text-sm ${invoice.status === 'Paid' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-amber-500/15 text-amber-300'}`}>
                  {invoice.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
