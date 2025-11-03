import { useMemo, useState } from 'react';
import { Minus, Plus } from 'lucide-react';

export default function TradePanel() {
  const [side, setSide] = useState('long');
  const [leverage, setLeverage] = useState(10);
  const [price, setPrice] = useState('');
  const [qty, setQty] = useState('');
  const [reduceOnly, setReduceOnly] = useState(false);

  const notional = useMemo(() => {
    const p = parseFloat(price) || 0;
    const q = parseFloat(qty) || 0;
    return p * q;
  }, [price, qty]);

  const margin = useMemo(() => {
    if (!leverage) return 0;
    return notional / leverage;
  }, [notional, leverage]);

  const submit = (e) => {
    e.preventDefault();
    alert(`Simulated ${side.toUpperCase()} order submitted\nPrice: ${price || 'Market'}\nQty: ${qty}\nLeverage: ${leverage}x\nReduce Only: ${reduceOnly ? 'Yes' : 'No'}`);
  };

  return (
    <div className="w-full md:w-80 lg:w-96 border-l border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <div className="p-4">
        <div className="inline-flex rounded-md p-1 bg-zinc-100 dark:bg-zinc-800 text-sm mb-4">
          <button
            className={`px-3 py-1.5 rounded-md ${side === 'long' ? 'bg-white dark:bg-zinc-900 text-emerald-600' : 'text-zinc-600 dark:text-zinc-300'}`}
            onClick={() => setSide('long')}
          >
            Long
          </button>
          <button
            className={`px-3 py-1.5 rounded-md ${side === 'short' ? 'bg-white dark:bg-zinc-900 text-rose-600' : 'text-zinc-600 dark:text-zinc-300'}`}
            onClick={() => setSide('short')}
          >
            Short
          </button>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
            <span>Cross</span>
            <span>{leverage}x</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setLeverage((l) => Math.max(1, l - 1))} className="p-2 rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60"><Minus className="h-4 w-4"/></button>
            <input
              type="range"
              min={1}
              max={125}
              value={leverage}
              onChange={(e) => setLeverage(parseInt(e.target.value))}
              className="w-full accent-emerald-500"
            />
            <button onClick={() => setLeverage((l) => Math.min(125, l + 1))} className="p-2 rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60"><Plus className="h-4 w-4"/></button>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-3">
          <div>
            <label className="block text-xs text-zinc-500 mb-1">Price (USDT)</label>
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Market"
              className="w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            />
          </div>
          <div>
            <label className="block text-xs text-zinc-500 mb-1">Quantity</label>
            <input
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              placeholder="0.00"
              className="w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            />
          </div>
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>Notional</span>
            <span className="text-zinc-700 dark:text-zinc-200">{notional ? notional.toLocaleString(undefined, { maximumFractionDigits: 2 }) : '—'} USDT</span>
          </div>
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span>Est. Margin</span>
            <span className="text-zinc-700 dark:text-zinc-200">{margin ? margin.toLocaleString(undefined, { maximumFractionDigits: 2 }) : '—'} USDT</span>
          </div>

          <label className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300">
            <input type="checkbox" checked={reduceOnly} onChange={(e) => setReduceOnly(e.target.checked)} />
            Reduce-Only
          </label>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              type="submit"
              onClick={() => setSide('long')}
              className="rounded-md bg-emerald-500 hover:bg-emerald-600 text-white py-2 text-sm font-medium shadow"
            >
              Buy/Long
            </button>
            <button
              type="submit"
              onClick={() => setSide('short')}
              className="rounded-md bg-rose-500 hover:bg-rose-600 text-white py-2 text-sm font-medium shadow"
            >
              Sell/Short
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
