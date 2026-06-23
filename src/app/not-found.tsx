import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center animate-fade-in">
      <span className="text-6xl" role="img" aria-label="Bingung">🔍</span>
      <h1 className="mt-6 font-jakarta text-2xl font-bold text-primary">
        Halaman tidak ditemukan
      </h1>
      <p className="mt-2 text-sm text-text-secondary">
        Maaf, halaman yang Anda cari tidak tersedia atau mungkin sudah dipindahkan.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        Kembali ke Beranda
      </Link>
    </div>
  );
}
