const COLOR_MAP: Record<number, string> = {
  0: "bg-primary",
  1: "bg-teal",
};
const DEFAULT_COLOR = "bg-amber";

export default function ProgressBar({
  label,
  persentase,
  deskripsi,
  index,
}: {
  label: string;
  persentase: string;
  deskripsi: string;
  index: number;
}) {
  const pct = parseFloat(persentase);
  const barColor = COLOR_MAP[index] ?? DEFAULT_COLOR;

  return (
    <div className="mb-5 last:mb-0">
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="font-jetbrains text-sm font-medium text-foreground">{persentase}</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface-warm">
        <div className={`h-full rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-1.5 text-[13px] leading-relaxed text-text-secondary">{deskripsi}</p>
    </div>
  );
}
