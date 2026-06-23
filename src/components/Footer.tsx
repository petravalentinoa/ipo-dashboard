export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border/50">
      <div className="mx-auto max-w-[1100px] px-4 py-8 sm:px-6">
        <div className="rounded-lg bg-warning-light px-4 py-3.5">
          <p className="text-sm leading-relaxed text-foreground">
            <span className="font-semibold">⚠️ Disclaimer:</span> Website ini hanya untuk tujuan
            edukasi. Bukan merupakan rekomendasi atau ajakan untuk membeli saham. Selalu baca
            prospektus asli secara lengkap dan konsultasikan dengan penasihat keuangan Anda sebelum
            berinvestasi.
          </p>
        </div>
        <p className="mt-4 text-center text-xs text-muted">
          Data dirangkum dari prospektus resmi yang dipublikasikan di idx.co.id
        </p>
      </div>
    </footer>
  );
}
