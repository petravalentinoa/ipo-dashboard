import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { IPOData, StatusIPO } from "@/types/ipo";
import SectionHeader from "@/components/SectionHeader";
import InfoBox from "@/components/InfoBox";
import TrendIndicator from "@/components/TrendIndicator";
import ProgressBar from "@/components/ProgressBar";
import StickyNav from "@/components/StickyNav";
import FinanceCharts from "@/components/FinanceCharts";

function getIpoList(): IPOData[] {
  const filePath = path.join(process.cwd(), "src", "data", "ipo-list.json");
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function getIpo(id: string): IPOData | undefined {
  return getIpoList().find((ipo) => ipo.id === id);
}

const STATUS_CONFIG: Record<StatusIPO, { label: string; className: string }> = {
  penawaran_awal: { label: "Penawaran Awal", className: "bg-blue-100 text-blue-800" },
  penawaran_umum: { label: "Penawaran Umum", className: "bg-yellow-100 text-yellow-800" },
  penjatahan_efek: { label: "Penjatahan Efek", className: "bg-orange-100 text-orange-800" },
  distribusi_saham: { label: "Distribusi Saham", className: "bg-green-100 text-green-800" },
  tercatat: { label: "Tercatat di BEI", className: "bg-gray-100 text-gray-600" },
};

const JADWAL_LABELS: { key: keyof IPOData["jadwalIPO"]; label: string }[] = [
  { key: "penawaranAwal", label: "Penawaran Awal" },
  { key: "penawaranUmum", label: "Penawaran Umum" },
  { key: "penjatahanEfek", label: "Penjatahan Efek" },
  { key: "distribusiSaham", label: "Distribusi Saham" },
  { key: "pencatatan", label: "Pencatatan di BEI" },
];

const JADWAL_STATUS_MAP: Record<string, StatusIPO> = {
  penawaranAwal: "penawaran_awal",
  penawaranUmum: "penawaran_umum",
  penjatahanEfek: "penjatahan_efek",
  distribusiSaham: "distribusi_saham",
  pencatatan: "tercatat",
};

function formatHarga(min: number, max: number): string {
  const fmt = (n: number) => new Intl.NumberFormat("id-ID").format(n);
  return min === max ? `Rp ${fmt(min)}` : `Rp ${fmt(min)} – ${fmt(max)}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const ipo = getIpo(id);
  if (!ipo) return { title: "IPO Tidak Ditemukan" };
  return {
    title: `${ipo.kodeSaham} – ${ipo.namaPerusahaan} | Look at IPO`,
    description: ipo.bisnisPerusahaan.deskripsiSingkat,
  };
}

export default async function IpoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ipo = getIpo(id);
  if (!ipo) notFound();

  const status = STATUS_CONFIG[ipo.status];

  const metrics = [
    { label: "Harga Penawaran", value: formatHarga(ipo.hargaIPO.min, ipo.hargaIPO.max), mono: true },
    { label: "Jumlah Saham Ditawarkan", value: ipo.jumlahSahamDitawarkan, mono: false },
    { label: "Penjamin Emisi", value: ipo.penjaminEmisi, mono: false },
    { label: "Sektor Industri", value: ipo.bisnisPerusahaan.sektorIndustri, mono: false },
  ];

  const keuanganRows = [
    { metrik: "Pendapatan", data: ipo.keuangan.pendapatan },
    { metrik: "Laba Bersih", data: ipo.keuangan.labaBersih },
    { metrik: "Total Aset", data: ipo.keuangan.totalAset },
    ...(ipo.keuangan.totalLiabilitas ? [{ metrik: "Total Liabilitas", data: ipo.keuangan.totalLiabilitas }] : []),
    ...(ipo.keuangan.totalEkuitas ? [{ metrik: "Total Ekuitas", data: ipo.keuangan.totalEkuitas }] : []),
  ];

  return (
    <div className="min-h-screen bg-surface animate-fade-in">
      <div className="mx-auto max-w-[900px] px-4 py-8 sm:px-6">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-light"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Kembali ke daftar
        </Link>

        {/* Header */}
        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-jakarta text-[32px] font-bold leading-tight text-primary">
              {ipo.kodeSaham}
            </h1>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}>
              {status.label}
            </span>
          </div>
          <p className="mt-1 text-lg text-text-secondary">{ipo.namaPerusahaan}</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-text-secondary">
            <span className="font-jetbrains font-medium text-foreground">
              {formatHarga(ipo.hargaIPO.min, ipo.hargaIPO.max)}
            </span>
            <span className="text-border">•</span>
            <span>{ipo.penjaminEmisi}</span>
            <span className="text-border">•</span>
            <span>Pencatatan: {ipo.jadwalIPO.pencatatan}</span>
          </div>
          <hr className="mt-6 border-border" />
        </header>

        {/* Sticky navigation — no wrapper div so sticky works properly */}
        <StickyNav />

        {/* ========== SECTION 1: RINGKASAN ========== */}
        <section id="ringkasan" className="scroll-mt-28 pt-8">
          <SectionHeader icon="chart-bar" title="Ringkasan" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {metrics.map((m) => (
              <div key={m.label} className="rounded-lg bg-surface-warm p-4">
                <p className="text-[11px] font-medium uppercase tracking-wider text-muted">
                  {m.label}
                </p>
                <p className={`mt-1.5 text-[15px] font-medium text-foreground ${m.mono ? "font-jetbrains" : ""}`}>
                  {m.value}
                </p>
              </div>
            ))}
          </div>

          {/* Jadwal IPO Timeline */}
          <div className="mt-6">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
              Jadwal IPO
            </h3>
            <div className="relative space-y-0">
              {JADWAL_LABELS.map((step, i) => {
                const date = ipo.jadwalIPO[step.key];
                const stepStatus = JADWAL_STATUS_MAP[step.key];
                const isCurrentOrPast =
                  Object.values(JADWAL_STATUS_MAP).indexOf(stepStatus) <=
                  Object.values(JADWAL_STATUS_MAP).indexOf(ipo.status);
                const isCurrent = stepStatus === ipo.status;
                return (
                  <div key={step.key} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`h-3 w-3 rounded-full border-2 ${
                          isCurrent
                            ? "border-primary bg-primary"
                            : isCurrentOrPast
                              ? "border-primary bg-primary/30"
                              : "border-border bg-white"
                        }`}
                      />
                      {i < JADWAL_LABELS.length - 1 && (
                        <div
                          className={`w-0.5 h-8 ${
                            isCurrentOrPast ? "bg-primary/30" : "bg-border"
                          }`}
                        />
                      )}
                    </div>
                    <div className="-mt-0.5 pb-4">
                      <p
                        className={`text-[13px] font-medium ${
                          isCurrent ? "text-primary" : isCurrentOrPast ? "text-foreground" : "text-text-secondary"
                        }`}
                      >
                        {step.label}
                        {isCurrent && (
                          <span className="ml-2 inline-block rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                            Saat ini
                          </span>
                        )}
                      </p>
                      <p className="mt-0.5 font-jetbrains text-[12px] text-text-secondary">
                        {date}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {ipo.risikoUtama && (
            <div className="mt-6 flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
              <svg className="mt-0.5 h-5 w-5 shrink-0 text-accent-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-accent-red">Risiko Utama</p>
                <p className="mt-1 text-sm leading-relaxed text-foreground">{ipo.risikoUtama}</p>
              </div>
            </div>
          )}
        </section>

        {/* ========== SECTION 2: PEMEGANG SAHAM ========== */}
        <section id="pemegang-saham" className="scroll-mt-28 pt-10">
          <SectionHeader icon="users" title="Pemegang Saham" />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface text-left">
                  <th className="px-3 py-2.5 font-medium text-muted">Pemegang Saham</th>
                  <th className="px-3 py-2.5 font-medium text-muted">Jumlah Saham</th>
                  <th className="px-3 py-2.5 text-right font-medium text-muted">Sebelum IPO</th>
                  <th className="px-3 py-2.5 text-right font-medium text-muted">Setelah IPO</th>
                  <th className="px-3 py-2.5 text-right font-medium text-muted">Perubahan</th>
                </tr>
              </thead>
              <tbody>
                {ipo.pemegangSaham.map((ps) => {
                  const before = parseFloat(ps.persentaseSebelumIPO.replace(",", "."));
                  const after = parseFloat(ps.persentaseSetelahIPO.replace(",", "."));
                  const hasChange = !isNaN(before) && !isNaN(after);
                  const change = hasChange ? after - before : 0;
                  return (
                    <tr key={ps.nama} className="border-b border-border/50">
                      <td className="px-3 py-3 font-medium">{ps.nama}</td>
                      <td className="px-3 py-3 font-jetbrains text-text-secondary">{ps.jumlahSaham}</td>
                      <td className="px-3 py-3 text-right font-jetbrains">{ps.persentaseSebelumIPO}</td>
                      <td className="px-3 py-3 text-right font-jetbrains">{ps.persentaseSetelahIPO}</td>
                      <td className={`px-3 py-3 text-right font-jetbrains font-medium ${change < 0 ? "text-accent-red" : change > 0 ? "text-accent-green" : ""}`}>
                        {hasChange ? `${change > 0 ? "+" : ""}${change.toFixed(1)}%` : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <InfoBox>
            Dilusi adalah berkurangnya persentase kepemilikan pemegang saham lama setelah perusahaan
            menerbitkan saham baru ke publik. Ini hal yang wajar dalam IPO — yang perlu diperhatikan
            adalah seberapa besar dilusinya.
          </InfoBox>
        </section>

        {/* ========== SECTION 3: KOMISARIS & DIREKSI ========== */}
        <section id="manajemen" className="scroll-mt-28 pt-10">
          <SectionHeader icon="briefcase" title="Komisaris & Direksi" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">
                Dewan Komisaris
              </h3>
              <div className="space-y-2.5">
                {ipo.komisarisDanDireksi.komisaris.map((k) => (
                  <div key={k.nama} className="rounded-lg border border-border/50 p-3">
                    <p className="text-[15px] font-medium text-foreground">{k.nama}</p>
                    <p className="mt-0.5 text-[13px] text-text-secondary">{k.jabatan}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted">
                Direksi
              </h3>
              <div className="space-y-2.5">
                {ipo.komisarisDanDireksi.direksi.map((d) => (
                  <div key={d.nama} className="rounded-lg border border-border/50 p-3">
                    <p className="text-[15px] font-medium text-foreground">{d.nama}</p>
                    <p className="mt-0.5 text-[13px] text-text-secondary">{d.jabatan}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <InfoBox>
            Komisaris bertugas mengawasi jalannya perusahaan. Direksi bertugas menjalankan operasional
            sehari-hari. Perhatikan apakah ada nama-nama yang punya track record di industri terkait.
          </InfoBox>
        </section>

        {/* ========== SECTION 4: BISNIS PERUSAHAAN ========== */}
        <section id="bisnis" className="scroll-mt-28 pt-10">
          <SectionHeader icon="building" title="Bisnis Perusahaan" />
          <p className="text-[15px] leading-[1.7] text-foreground">
            {ipo.bisnisPerusahaan.deskripsiSingkat}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-[13px] text-muted">Sektor:</span>
            <span className="rounded-md bg-primary/10 px-3 py-1 text-[13px] font-medium text-primary">
              {ipo.bisnisPerusahaan.sektorIndustri}
            </span>
          </div>

          <div className="mt-5">
            <h3 className="mb-2.5 text-sm font-semibold uppercase tracking-wider text-muted">
              Produk / Jasa Utama
            </h3>
            <div className="flex flex-wrap gap-2">
              {ipo.bisnisPerusahaan.produkUtama.map((p) => (
                <span
                  key={p}
                  className="rounded-md bg-primary-light/15 px-3 py-1 text-[13px] text-primary"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          {ipo.bisnisPerusahaan.anakUsaha.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-2.5 text-sm font-semibold uppercase tracking-wider text-muted">
                Anak Usaha
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-surface text-left">
                      <th className="px-3 py-2.5 font-medium text-muted">Nama</th>
                      <th className="px-3 py-2.5 font-medium text-muted">Bidang Usaha</th>
                      <th className="px-3 py-2.5 text-right font-medium text-muted">Kepemilikan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ipo.bisnisPerusahaan.anakUsaha.map((au, i) => (
                      <tr
                        key={au.nama}
                        className={i % 2 === 1 ? "bg-surface-warm/50" : ""}
                      >
                        <td className="px-3 py-2.5 font-medium">{au.nama}</td>
                        <td className="px-3 py-2.5 text-text-secondary">{au.bidangUsaha}</td>
                        <td className="px-3 py-2.5 text-right font-jetbrains">{au.kepemilikan}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          <InfoBox>
            Perhatikan apakah bisnis perusahaan mudah dipahami dan apakah anak usahanya mendukung
            bisnis utama. Perusahaan dengan bisnis yang jelas dan fokus umumnya lebih mudah dianalisis.
          </InfoBox>
        </section>

        {/* ========== SECTION 5: TREN KEUANGAN ========== */}
        <section id="keuangan" className="scroll-mt-28 pt-10">
          <SectionHeader icon="chart-bar" title="Tren Keuangan" />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface text-left">
                  <th className="px-3 py-2.5 font-medium text-muted">Metrik</th>
                  {ipo.keuangan.pendapatan.map((d) => (
                    <th key={d.tahun} className="px-3 py-2.5 text-right font-medium text-muted">
                      {d.tahun}
                    </th>
                  ))}
                  <th className="px-3 py-2.5 text-right font-medium text-muted">Tren</th>
                </tr>
              </thead>
              <tbody>
                {keuanganRows.map((row) => {
                  const lastIdx = row.data.length - 1;
                  return (
                    <tr key={row.metrik} className="border-b border-border/50">
                      <td className="px-3 py-3 font-medium">{row.metrik}</td>
                      {row.data.map((d, i) => (
                        <td
                          key={d.tahun}
                          className={`px-3 py-3 text-right font-jetbrains ${
                            i === lastIdx ? "font-medium text-foreground" : "text-text-secondary"
                          }`}
                        >
                          {d.nilai}
                        </td>
                      ))}
                      <td className="px-3 py-3 text-right">
                        <TrendIndicator
                          prev={row.data[lastIdx - 1]?.nilai ?? ""}
                          current={row.data[lastIdx]?.nilai ?? ""}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Grouped bar charts */}
          <FinanceCharts keuangan={ipo.keuangan} />

          <InfoBox>
            Perhatikan apakah pendapatan dan laba bersih konsisten naik selama 3 tahun terakhir.
            Perusahaan dengan tren keuangan stabil umumnya lebih menarik. Waspada jika laba turun
            sementara pendapatan naik — bisa jadi margin tergerus.
          </InfoBox>
        </section>

        {/* ========== SECTION 6: PENGGUNAAN DANA & DIVIDEN ========== */}
        <section id="dana-dividen" className="scroll-mt-28 pt-10 pb-16">
          <SectionHeader icon="coin" title="Penggunaan Dana IPO & Dividen" />

          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
            Penggunaan Dana IPO
          </h3>
          {ipo.penggunaanDanaIPO.map((item, i) => (
            <ProgressBar
              key={item.keperluan}
              label={item.keperluan}
              persentase={item.persentase}
              deskripsi={item.deskripsi}
              index={i}
            />
          ))}

          <h3 className="mb-3 mt-8 text-sm font-semibold uppercase tracking-wider text-muted">
            Kebijakan Dividen
          </h3>
          <div className="flex gap-3 rounded-lg bg-warning-light p-4">
            <svg className="mt-0.5 h-5 w-5 shrink-0 text-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <p className="text-sm leading-relaxed text-foreground">{ipo.kebijakanDividen}</p>
          </div>

          <InfoBox>
            Perhatikan apakah mayoritas dana IPO digunakan untuk ekspansi bisnis atau bayar utang.
            Jika sebagian besar dana untuk bayar utang, perusahaan mungkin IPO terutama untuk
            mengurangi beban hutang, bukan untuk pertumbuhan.
          </InfoBox>
        </section>

        {/* ========== CATATAN PENTING ========== */}
        {ipo.catatanPenting && (
          <section className="scroll-mt-28 pb-16">
            <div className="flex gap-3 rounded-xl border border-amber-300 bg-amber-50 p-5">
              <svg className="mt-0.5 h-5 w-5 shrink-0 text-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">Catatan Penting</p>
                <p className="mt-1.5 text-sm leading-[1.7] text-foreground">{ipo.catatanPenting}</p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
