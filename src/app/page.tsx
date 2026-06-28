import fs from "fs";
import path from "path";
import Link from "next/link";
import type { IPOData, StatusIPO } from "@/types/ipo";

const STATUS_ORDER: Record<StatusIPO, number> = {
  offering: 0,
  penawaran_awal: 1,
  penawaran_umum: 2,
  penjatahan_efek: 3,
  distribusi_saham: 4,
  tercatat: 5,
};

const STATUS_CONFIG: Record<StatusIPO, { label: string; className: string }> = {
  offering: {
    label: "Masa Penawaran",
    className: "bg-green-100 text-green-800",
  },
  penawaran_awal: {
    label: "Penawaran Awal",
    className: "bg-blue-100 text-blue-800",
  },
  penawaran_umum: {
    label: "Penawaran Umum",
    className: "bg-yellow-100 text-yellow-800",
  },
  penjatahan_efek: {
    label: "Penjatahan Efek",
    className: "bg-orange-100 text-orange-800",
  },
  distribusi_saham: {
    label: "Distribusi Saham",
    className: "bg-emerald-100 text-emerald-800",
  },
  tercatat: {
    label: "Tercatat di BEI",
    className: "bg-gray-100 text-gray-600",
  },
};

function formatHarga(min: number, max: number): string {
  const fmt = (n: number) =>
    new Intl.NumberFormat("id-ID").format(n);
  return min === max
    ? `Rp ${fmt(min)}`
    : `Rp ${fmt(min)} – ${fmt(max)}`;
}

function getStatusDate(ipo: IPOData): string | null {
  switch (ipo.status) {
    case "penawaran_awal":
      return ipo.jadwalIPO.penawaranAwal;
    case "offering":
      return ipo.jadwalIPO.penawaranUmum;
    case "penawaran_umum":
      return ipo.jadwalIPO.penawaranUmum;
    case "penjatahan_efek":
      return ipo.jadwalIPO.penjatahanEfek;
    case "distribusi_saham":
      return ipo.jadwalIPO.distribusiSaham;
    case "tercatat":
      return ipo.jadwalIPO.pencatatan;
    default:
      return null;
  }
}

function getIpoList(): IPOData[] {
  const filePath = path.join(process.cwd(), "src", "data", "ipo-list.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const data: IPOData[] = JSON.parse(raw);
  return data.sort(
    (a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status]
  );
}

export default function Home() {
  const ipoList = getIpoList();

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <header className="bg-primary text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Look at IPO
          </h1>
          <p className="mt-3 text-lg text-blue-200">
            Ringkasan prospektus IPO untuk investor pemula di Indonesia
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {ipoList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="text-5xl" role="img" aria-label="Kosong">📭</span>
            <p className="mt-4 text-lg font-medium text-text-secondary">
              Belum ada data IPO. Nantikan update berikutnya.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ipoList.map((ipo) => {
              const statusCfg = STATUS_CONFIG[ipo.status];
              const statusDate = getStatusDate(ipo);
              return (
                <article
                  key={ipo.id}
                  className="flex flex-col rounded-xl border border-border bg-card-bg shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="text-2xl font-bold text-primary">
                        {ipo.kodeSaham}
                      </h2>
                      <div className="flex flex-col items-end gap-1">
                        <span
                          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${statusCfg.className}`}
                        >
                          {statusCfg.label}
                        </span>
                        {statusDate && (
                          <span className="text-[11px] text-text-secondary">
                            {statusDate}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="mt-1 text-sm text-muted">
                      {ipo.namaPerusahaan}
                    </p>

                    <dl className="mt-5 space-y-3 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-muted">Harga IPO</dt>
                        <dd className="font-semibold text-primary">
                          {formatHarga(ipo.hargaIPO.min, ipo.hargaIPO.max)}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted">Pencatatan</dt>
                        <dd className="font-medium">{ipo.jadwalIPO.pencatatan}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-muted">Sektor</dt>
                        <dd className="font-medium">
                          {ipo.bisnisPerusahaan.sektorIndustri}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="border-t border-border px-6 py-4">
                    <Link
                      href={`/ipo/${ipo.id}`}
                      className="block w-full rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-primary-light"
                    >
                      Lihat Detail
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
