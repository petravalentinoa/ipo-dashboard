function parseNilai(s: string): number {
  const clean = s.replace(/[Rp.\s]/g, "").toLowerCase();
  const match = clean.match(/([\d,]+)\s*(triliun|miliar|juta)?/);
  if (!match) return 0;
  const num = parseFloat(match[1].replace(",", "."));
  const unit = match[2];
  if (unit === "triliun") return num * 1_000_000;
  if (unit === "miliar") return num * 1_000;
  if (unit === "juta") return num;
  return num;
}

export default function TrendIndicator({ prev, current }: { prev: string; current: string }) {
  const p = parseNilai(prev);
  const c = parseNilai(current);
  if (p === 0) return <span className="text-text-secondary">—</span>;

  const pct = ((c - p) / p) * 100;
  const isUp = pct > 0;
  const isFlat = pct === 0;

  if (isFlat) {
    return <span className="font-jetbrains text-sm text-text-secondary">0%</span>;
  }

  return (
    <span className={`inline-flex items-center gap-1 font-jetbrains text-sm font-medium ${isUp ? "text-accent-green" : "text-accent-red"}`}>
      {isUp ? (
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
      ) : (
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
        </svg>
      )}
      {isUp ? "+" : ""}
      {pct.toFixed(1)}%
    </span>
  );
}
