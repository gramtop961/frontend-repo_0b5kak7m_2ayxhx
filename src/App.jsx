import Header from './components/Header';
import MarketBar from './components/MarketBar';
import TradePanel from './components/TradePanel';
import PositionsTable from './components/PositionsTable';

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
      <Header />
      <MarketBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6">
        <section className="space-y-6">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 h-[380px] md:h-[520px] overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800">
              <div className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">Chart</div>
              <div className="text-xs text-zinc-500">Simple preview (no live data)</div>
            </div>
            <div className="h-full w-full p-4">
              <div className="h-full w-full rounded-lg bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950 border border-zinc-200/60 dark:border-zinc-800/60 relative overflow-hidden">
                <GridLines />
                <DemoCandleSeries />
              </div>
            </div>
          </div>

          <PositionsTable />
        </section>

        <TradePanel />
      </main>

      <footer className="py-6 text-center text-xs text-zinc-500">
        Built for educational trading UI purposes. Not affiliated with CoinEx.
      </footer>
    </div>
  );
}

function GridLines() {
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      {[...Array(10)].map((_, i) => (
        <line key={'v'+i} x1={(i+1)*9} y1="0" x2={(i+1)*9} y2="100" stroke="currentColor" className="text-zinc-200/70 dark:text-zinc-800/80" strokeWidth="0.2" />
      ))}
      {[...Array(6)].map((_, i) => (
        <line key={'h'+i} x1="0" y1={(i+1)*14} x2="100" y2={(i+1)*14} stroke="currentColor" className="text-zinc-200/70 dark:text-zinc-800/80" strokeWidth="0.2" />
      ))}
    </svg>
  );
}

function DemoCandleSeries() {
  const candles = [
    { o: 64000, h: 64500, l: 63800, c: 64320 },
    { o: 64320, h: 64680, l: 64150, c: 64210 },
    { o: 64210, h: 64400, l: 63900, c: 64010 },
    { o: 64010, h: 64120, l: 63600, c: 63780 },
    { o: 63780, h: 64050, l: 63500, c: 63920 },
    { o: 63920, h: 64280, l: 63800, c: 64250 },
    { o: 64250, h: 64610, l: 64000, c: 64590 },
  ];

  const width = 100;
  const height = 100;
  const padding = 8;
  const innerW = width - padding * 2;
  const innerH = height - padding * 2;
  const max = Math.max(...candles.map((c) => c.h));
  const min = Math.min(...candles.map((c) => c.l));
  const xStep = innerW / candles.length;

  const y = (v) => padding + (1 - (v - min) / (max - min)) * innerH;

  return (
    <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      {candles.map((c, i) => {
        const x = padding + i * xStep + xStep / 2;
        const color = c.c >= c.o ? '#34d399' : '#f43f5e';
        const bodyTop = Math.min(y(c.o), y(c.c));
        const bodyBottom = Math.max(y(c.o), y(c.c));
        return (
          <g key={i}>
            <line x1={x} x2={x} y1={y(c.h)} y2={y(c.l)} stroke={color} strokeWidth={0.6} />
            <rect
              x={x - xStep * 0.18}
              y={bodyTop}
              width={xStep * 0.36}
              height={Math.max(0.8, bodyBottom - bodyTop)}
              fill={color}
              rx={0.5}
            />
          </g>
        );
      })}
    </svg>
  );
}

export default App;
