import { useEffect, useState } from "react";
import Layout from "../components/Layout";

interface Invoice {
  customerName: string;
  description: string;
  amount: number;
  status: string;
  wallet?: string;
  createdAt: string;
}

export default function TransactionsPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    const savedInvoices = localStorage.getItem("arc-invoices");

    if (savedInvoices) {
      const parsed = JSON.parse(savedInvoices);

      setInvoices(parsed.reverse());
    }
  }, []);

  const persistInvoices = (nextInvoices: Invoice[]) => {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.setItem("arc-invoices", JSON.stringify(nextInvoices));
    setInvoices([...nextInvoices].reverse());
    window.dispatchEvent(new Event("arc-invoices-updated"));
    window.location.reload();
  };

  const handleMarkPaid = (index: number) => {
    const nextInvoices = invoices.map((invoice, invoiceIndex) =>
      invoiceIndex === index ? { ...invoice, status: "Paid" } : invoice
    );

    persistInvoices(nextInvoices);
  };

  const handleDelete = (index: number) => {
    const nextInvoices = invoices.filter((_, invoiceIndex) => invoiceIndex !== index);

    persistInvoices(nextInvoices);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">
            Transaction History
          </p>

          <h2 className="text-3xl font-semibold text-white">
            Recent payment activity
          </h2>
        </div>

        {invoices.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6">
            <p className="text-slate-400">No invoices found.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {invoices.map((invoice, index) => (
              <div
                key={`${invoice.customerName}-${index}`}
                className="rounded-3xl border border-white/10 bg-slate-900/70 p-6"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-white">
                      {invoice.customerName}
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      {invoice.description}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-semibold text-white">
                      ₹{invoice.amount}
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      {invoice.createdAt}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      invoice.status === "Paid"
                        ? "bg-emerald-500/15 text-emerald-300"
                        : "bg-amber-500/15 text-amber-300"
                    }`}
                  >
                    {invoice.status}
                  </span>

                  {invoice.wallet && (
                    <span className="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-sm text-slate-300">
                      Wallet: {invoice.wallet}
                    </span>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => handleMarkPaid(index)}
                    className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-500"
                  >
                    Mark Paid
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(index)}
                    className="rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}