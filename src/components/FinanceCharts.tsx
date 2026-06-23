import type { Keuangan } from "@/types/ipo";

function parseNilai(s: string): number {
  const clean = s.replace(/[Rp.\s]/g, "").toLowerCase();
  const match = clean.match(/([\d,]+)\s*(triliun|miliar|juta)?/);
  if (!match) return 0;
  const num = parseFloat(match[1].replace(",", "."));
  const unit = match[2];
  if (unit === "triliun") return num * 1000;
  if (unit === "miliar") return num;
  return num;
}

interface Series {
  label: string;
  color: string;
  values: number[];
}

function GroupedBarChart({
  title,
  years,
  series,
}: {
  title: string;
  years: string[];
  series: Series[];
}) {
  const allVals = series.flatMap((s) => s.values);
  const maxVal = Math.max(...allVals, 1);

  return (
    <div>
      <p className="mb-1 text-[13px] font-medium text-muted">{title}</p>
      <div className="flex items-center gap-4 mb-3">
        {series.map((s) => (
          <div key={s.label} className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: s.color }} />
            <span className="text-[11px] text-text-secondary">{s.label}</span>
          </div>
        ))}
      </div>
      <div className="flex items-end gap-4 h-28">
        {years.map((year, yi) => (
          <div key={year} className="flex flex-1 flex-col items-center gap-1">
            <div className="flex items-end gap-1 w-full justify-center" style={{ height: 96 }}>
              {series.map((s) => (
                <div
                  key={s.label}
                  className="flex-1 max-w-8 rounded-t overflow-hidden"
                  style={{
                    backgroundColor: s.color,
                    height: `${maxVal > 0 ? (s.values[yi] / maxVal) * 96 : 0}px`,
                    minHeight: s.values[yi] > 0 ? 2 : 0,
                  }}
                />
              ))}
            </div>
            <span className="text-[10px] text-muted">{year}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FinanceCharts({ keuangan }: { keuangan: Keuangan }) {
  const years = keuangan.pendapatan.map((d) => d.tahun);

  const profitLoss: Series[] = [
    {
      label: "Pendapatan",
      color: "var(--color-primary)",
      values: keuangan.pendapatan.map((d) => parseNilai(d.nilai)),
    },
    {
      label: "Laba Bersih",
      color: "var(--color-teal)",
      values: keuangan.labaBersih.map((d) => parseNilai(d.nilai)),
    },
  ];

  const hasNeraca = keuangan.totalLiabilitas && keuangan.totalEkuitas;

  const neraca: Series[] = [
    {
      label: "Total Aset",
      color: "var(--color-primary)",
      values: keuangan.totalAset.map((d) => parseNilai(d.nilai)),
    },
    ...(keuangan.totalLiabilitas
      ? [{
          label: "Liabilitas",
          color: "var(--color-accent-red)",
          values: keuangan.totalLiabilitas.map((d) => parseNilai(d.nilai)),
        }]
      : []),
    ...(keuangan.totalEkuitas
      ? [{
          label: "Ekuitas",
          color: "var(--color-teal)",
          values: keuangan.totalEkuitas.map((d) => parseNilai(d.nilai)),
        }]
      : []),
  ];

  return (
    <div className={`mt-6 grid grid-cols-1 gap-8 ${hasNeraca ? "sm:grid-cols-2" : ""}`}>
      <GroupedBarChart title="Pendapatan & Laba Bersih" years={years} series={profitLoss} />
      <GroupedBarChart
        title={hasNeraca ? "Aset, Liabilitas & Ekuitas" : "Total Aset"}
        years={years}
        series={neraca}
      />
    </div>
  );
}
