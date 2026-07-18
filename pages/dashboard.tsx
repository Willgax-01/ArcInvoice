import { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";

type Invoice = {
  id: string;
  customerName: string;
  description: string;
  amount: string;
  wallet: string;
  status: "Pending" | "Paid";
  txHash: string | null;
  createdAt: string;
};

const STORAGE_KEY = "arc-invoices";

export default function DashboardPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const storedInvoices = window.localStorage.getItem(STORAGE_KEY);
      const parsedInvoices = storedInvoices ? JSON.parse(storedInvoices) : [];

      setInvoices(Array.isArray(parsedInvoices) ? parsedInvoices : []);
    } catch (error) {
      console.error("Failed to load invoices:", error);
      setInvoices([]);
    }
  }, []);

  const summary = useMemo(() => {
    const totalInvoiced = invoices.reduce(
      (sum, invoice) => sum + Number(invoice.amount || 0),
      0
    );

    const pendingCount = invoices.filter(
      (invoice) => invoice.status === "Pending"
    ).length;

    const paidCount = invoices.filter((invoice) => invoice.status === "Paid").length;

    return {
      totalInvoiced,
      pendingCount,
      paidCount,
    };
  }, [invoices]);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Dashboard</p>
            <h2 className="text-3xl font-semibold text-white">Invoice overview</h2>
          </div>
          <div className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-200">
            Local Arc Testnet invoices
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
            <p className="text-sm text-slate-400">Total Invoiced</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              ${summary.totalInvoiced.toLocaleString()}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
            <p className="text-sm text-slate-400">Pending</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {summary.pendingCount}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-5">
            <p className="text-sm text-slate-400">Paid</p>
            <p className="mt-2 text-2xl font-semibold text-white">{summary.paidCount}</p>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
          <div className="grid gap-3 md:grid-cols-4">
            <div className="text-sm font-medium text-slate-400">Customer</div>
            <div className="text-sm font-medium text-slate-400">Description</div>
            <div className="text-sm font-medium text-slate-400">Amount</div>
            <div className="text-sm font-medium text-slate-400">Status</div>
          </div>

          {invoices.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-slate-400">
              No invoices found
            </div>
          ) : (
            invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="mt-4 grid gap-3 rounded-2xl border border-white/10 bg-slate-950/60 p-4 md:grid-cols-4"
              >
                <div className="text-white">{invoice.customerName}</div>
                <div className="text-slate-300">{invoice.description}</div>
                <div className="text-slate-300">
                  ${Number(invoice.amount || 0).toLocaleString()}
                </div>
                <div>
                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      invoice.status === "Paid"
                        ? "bg-emerald-500/15 text-emerald-300"
                        : "bg-amber-500/15 text-amber-300"
                    }`}
                  >
                    {invoice.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}