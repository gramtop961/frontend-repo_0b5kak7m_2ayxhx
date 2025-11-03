import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const defaultMarkets = [
  { symbol: 'BTCUSDT', price: 64320.5, change: 2.31 },
  { symbol: 'ETHUSDT', price: 3240.2, change: -1.04 },
  { symbol: 'SOLUSDT', price: 178.1, change: 0.82 },
  { symbol: 'XRPUSDT', price: 0.612, change: 1.67 },
];

export default function MarketBar() {
  const [selected, setSelected] = useState(defaultMarkets[0]);

  return (
    <div className="w-full border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/60">
            {selected.symbol}
            <ChevronDown className="h-4 w-4" />
          </button>
          <div className="text-zinc-900 dark:text-zinc-100 font-semibold">{selected.price.toLocaleString()}</div>
          <div className={
            'text-sm font-medium ' +
            (selected.change >= 0 ? 'text-emerald-500' : 'text-rose-500')
          }>
            {selected.change >= 0 ? '+' : ''}{selected.change}%
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6">
          {defaultMarkets.map((m) => (
            <button
              key={m.symbol}
              onClick={() => setSelected(m)}
              className="flex items-baseline gap-2 text-sm text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100"
            >
              <span className="font-medium">{m.symbol}</span>
              <span className="text-zinc-500">{m.price.toLocaleString()}</span>
              <span className={m.change >= 0 ? 'text-emerald-500' : 'text-rose-500'}>
                {m.change >= 0 ? '+' : ''}{m.change}%
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
