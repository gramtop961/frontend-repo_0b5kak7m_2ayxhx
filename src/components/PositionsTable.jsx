const demoPositions = [
  { id: 1, symbol: 'BTCUSDT', side: 'Long', qty: 0.05, entry: 63780, mark: 64320.5, leverage: 20, pnl: 27.0 },
  { id: 2, symbol: 'ETHUSDT', side: 'Short', qty: 1.2, entry: 3280, mark: 3240.2, leverage: 10, pnl: 47.76 },
];

export default function PositionsTable() {
  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
      <div className="px-4 py-3 text-sm font-semibold text-zinc-700 dark:text-zinc-200 border-b border-zinc-200 dark:border-zinc-800">
        Positions
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-zinc-500">
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <th className="px-4 py-2">Symbol</th>
              <th className="px-4 py-2">Side</th>
              <th className="px-4 py-2">Qty</th>
              <th className="px-4 py-2">Entry</th>
              <th className="px-4 py-2">Mark</th>
              <th className="px-4 py-2">Lev</th>
              <th className="px-4 py-2 text-right">PnL (USDT)</th>
            </tr>
          </thead>
          <tbody>
            {demoPositions.map((p) => (
              <tr key={p.id} className="border-b border-zinc-100 dark:border-zinc-800/60">
                <td className="px-4 py-2 font-medium text-zinc-700 dark:text-zinc-200">{p.symbol}</td>
                <td className={`px-4 py-2 ${p.side === 'Long' ? 'text-emerald-500' : 'text-rose-500'}`}>{p.side}</td>
                <td className="px-4 py-2">{p.qty}</td>
                <td className="px-4 py-2">{p.entry.toLocaleString()}</td>
                <td className="px-4 py-2">{p.mark.toLocaleString()}</td>
                <td className="px-4 py-2">{p.leverage}x</td>
                <td className={`px-4 py-2 text-right ${p.pnl >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>{p.pnl.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
