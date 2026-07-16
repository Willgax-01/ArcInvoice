import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/create-invoice', label: 'Create Invoice' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/transactions', label: 'Transactions' },
];

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-transparent text-slate-100">
      <header className="border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/" className="text-xl font-semibold tracking-wide text-cyan-400">
            ArcInvoice
          </Link>
          <nav className="flex gap-4 text-sm text-slate-300">
            {navItems.map((item) => {
              const active = router.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-full px-3 py-2 transition ${active ? 'bg-cyan-500/15 text-cyan-300' : 'hover:bg-white/5 hover:text-white'}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8">{children}</main>
    </div>
  );
}
