import { useEffect, useState } from 'react';
import { TrendingUp, Settings, Wallet, Sun, Moon } from 'lucide-react';

export default function Header() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // initialize dark theme by default
    document.documentElement.classList.add('dark');
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    if (next === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header className="w-full border-b border-zinc-200/60 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-white shadow-md">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">FuturesX</span>
            <span className="text-xs text-zinc-500">CoinEx Futures Demo</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 text-zinc-600 dark:text-zinc-300 transition">
            Markets
          </button>
          <button className="px-3 py-1.5 text-sm rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 text-zinc-600 dark:text-zinc-300 transition">
            Funding
          </button>
          <button className="px-3 py-1.5 text-sm rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 text-zinc-600 dark:text-zinc-300 transition">
            Leaderboard
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-500 text-white text-sm shadow hover:bg-emerald-600 transition">
            <Wallet className="h-4 w-4" /> Deposit
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 text-zinc-600 dark:text-zinc-300 transition"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button className="p-2 rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 text-zinc-600 dark:text-zinc-300 transition" aria-label="Settings">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
