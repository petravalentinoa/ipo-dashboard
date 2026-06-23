import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glossary | Look at IPO",
  description: "Istilah-istilah penting dan panduan membaca prospektus IPO untuk investor pemula",
};

interface GlossaryEntry {
  istilah: string;
  definisi: string;
  contoh?: string;
}

const TAHAPAN_IPO = [
  {
    emoji: "1️⃣",
    title: "Penawaran Awal (Book Building)",
    desc: "Tahap pertama di mana perusahaan dan penjamin emisi menawarkan saham ke investor institusi dalam rentang harga tertentu untuk mengukur minat pasar. Dari sini harga final IPO ditetapkan. Investor ritel belum bisa membeli di tahap ini.",
  },
  {
    emoji: "2️⃣",
    title: "Penawaran Umum (Public Offering)",
    desc: "Setelah harga ditetapkan, saham ditawarkan ke publik (termasuk investor ritel). Anda bisa memesan saham melalui sekuritas yang menjadi agen penjual. Masa penawaran biasanya berlangsung 1-5 hari kerja.",
  },
  {
    emoji: "3️⃣",
    title: "Penjatahan Efek (Allotment)",
    desc: "Jika permintaan melebihi ketersediaan (oversubscribed), saham dialokasikan secara proporsional. Artinya, Anda mungkin tidak mendapat jumlah penuh yang dipesan. Hasil penjatahan biasanya diumumkan 1-2 hari setelah penawaran umum ditutup.",
  },
  {
    emoji: "4️⃣",
    title: "Distribusi Saham",
    desc: "Saham yang sudah dijatahkan dikirimkan secara elektronik ke rekening efek investor melalui KSEI (Kustodian Sentral Efek Indonesia). Proses ini biasanya selesai 1-2 hari kerja setelah penjatahan.",
  },
  {
    emoji: "5️⃣",
    title: "Pencatatan di BEI (Listing)",
    desc: "Hari pertama saham diperdagangkan di Bursa Efek Indonesia. Harga bisa naik (biasanya disebut 'ARA' jika naik maksimal) atau turun dari harga IPO. Setelah tercatat, saham bisa dibeli dan dijual bebas oleh siapa saja di pasar sekunder.",
  },
];

const CARA_BACA_PROSPEKTUS = [
  {
    emoji: "👥",
    emojiLabel: "Orang",
    title: "Pemegang Saham",
    desc: "Siapa pemilik perusahaan dan berapa besar kepemilikannya berkurang setelah IPO?",
  },
  {
    emoji: "👔",
    emojiLabel: "Dasi",
    title: "Komisaris & Direksi",
    desc: "Siapa yang mengawasi dan menjalankan perusahaan? Apakah mereka berpengalaman?",
  },
  {
    emoji: "🏢",
    emojiLabel: "Gedung",
    title: "Bisnis Perusahaan",
    desc: "Apa yang dijual perusahaan? Siapa pelanggannya? Apa saja anak usahanya?",
  },
  {
    emoji: "📊",
    emojiLabel: "Grafik",
    title: "Tren Keuangan",
    desc: "Apakah pendapatan dan laba konsisten naik selama 3 tahun terakhir?",
  },
  {
    emoji: "💰",
    emojiLabel: "Uang",
    title: "Penggunaan Dana",
    desc: "Uang IPO mau dipakai untuk apa? Ekspansi atau bayar utang?",
  },
  {
    emoji: "📋",
    emojiLabel: "Papan",
    title: "Kebijakan Dividen",
    desc: "Apakah perusahaan berencana membagi keuntungan ke investor?",
  },
];

const GLOSARIUM: GlossaryEntry[] = [
  {
    istilah: "Prospektus",
    definisi:
      "Dokumen resmi yang wajib diterbitkan perusahaan sebelum IPO. Isinya mencakup informasi lengkap tentang bisnis perusahaan, laporan keuangan, risiko, rencana penggunaan dana, susunan pemegang saham, dan manajemen. Ini adalah sumber informasi utama bagi calon investor.",
    contoh:
      "Sebelum membeli saham IPO, pastikan Anda sudah membaca prospektusnya yang bisa diunduh di situs IDX.",
  },
  {
    istilah: "IPO (Initial Public Offering)",
    definisi:
      "Penawaran saham perdana ke publik — yaitu saat pertama kalinya perusahaan menjual sahamnya kepada masyarakat umum melalui bursa efek. Setelah IPO, saham perusahaan bisa diperjualbelikan di pasar saham.",
    contoh:
      "PT ABC memutuskan untuk IPO agar mendapatkan dana segar untuk ekspansi pabrik baru.",
  },
  {
    istilah: "Penawaran Awal (Book Building)",
    definisi:
      "Proses penentuan harga saham IPO. Perusahaan dan penjamin emisi menawarkan saham ke investor besar (institusi) dalam rentang harga tertentu untuk mengukur minat pasar. Dari situ, harga final IPO ditetapkan.",
    contoh:
      "Rentang harga book building ABCD ditetapkan Rp 380–450 per lembar. Setelah book building, harga final ditetapkan Rp 420.",
  },
  {
    istilah: "Penjamin Emisi (Underwriter)",
    definisi:
      "Perusahaan sekuritas yang bertugas menjamin dan mengelola seluruh proses IPO. Mereka membantu menentukan harga, memasarkan saham ke investor, dan menjamin bahwa saham yang ditawarkan akan terserap pasar.",
    contoh:
      "PT Mandiri Sekuritas bertindak sebagai penjamin emisi untuk IPO perusahaan tersebut.",
  },
  {
    istilah: "Dilusi",
    definisi:
      "Berkurangnya persentase kepemilikan pemegang saham lama karena perusahaan menerbitkan saham baru saat IPO. Jumlah saham yang dimiliki tetap sama, tapi persentasenya mengecil karena total saham beredar bertambah. Ini hal yang wajar dalam IPO.",
    contoh:
      "Pendiri memiliki 70% saham sebelum IPO. Setelah 20% saham baru diterbitkan ke publik, kepemilikannya terdilusi menjadi 56%.",
  },
  {
    istilah: "Oversubscribed",
    definisi:
      "Kondisi ketika jumlah permintaan (pesanan) saham IPO melebihi jumlah saham yang tersedia. Ini biasanya menandakan minat investor yang tinggi. Jika oversubscribed, tidak semua investor akan mendapatkan jatah penuh.",
    contoh:
      "IPO saham XYZ oversubscribed 3,5 kali, artinya permintaan 3,5x lebih banyak dari saham yang ditawarkan.",
  },
  {
    istilah: "Lock-up Period",
    definisi:
      "Masa di mana pemegang saham lama (biasanya pendiri dan investor awal) tidak diperbolehkan menjual sahamnya setelah IPO. Biasanya berlangsung 6–12 bulan. Tujuannya agar harga saham tidak langsung jatuh karena aksi jual besar-besaran.",
    contoh:
      "Selama 8 bulan lock-up period, pendiri perusahaan tidak boleh menjual sahamnya di bursa.",
  },
  {
    istilah: "EPS (Earning Per Share)",
    definisi:
      "Laba bersih perusahaan dibagi dengan jumlah saham yang beredar. EPS menunjukkan berapa besar keuntungan yang dihasilkan untuk setiap lembar saham. Semakin tinggi EPS, semakin menguntungkan perusahaan bagi pemegang saham.",
    contoh:
      "Laba bersih Rp 500 miliar dengan 10 miliar saham beredar = EPS Rp 50 per saham.",
  },
  {
    istilah: "PER (Price to Earning Ratio)",
    definisi:
      'Rasio harga saham dibagi EPS. PER digunakan untuk mengukur apakah harga saham relatif mahal atau murah dibanding labanya. PER rendah bisa berarti saham murah, tapi perlu dibandingkan dengan PER perusahaan sejenis di sektor yang sama.',
    contoh:
      'Saham dihargai Rp 1.000 dengan EPS Rp 50, maka PER-nya 20x. Artinya investor "membayar" 20 tahun laba.',
  },
  {
    istilah: "Dividen",
    definisi:
      "Pembagian sebagian keuntungan (laba bersih) perusahaan kepada pemegang saham. Tidak semua perusahaan membagikan dividen — terutama perusahaan yang masih fokus bertumbuh. Dividen biasanya dibayarkan secara tunai per lembar saham.",
    contoh:
      "Perusahaan membagikan dividen Rp 25 per saham. Jika Anda punya 10.000 lembar, Anda mendapat Rp 250.000.",
  },
  {
    istilah: "Right Issue",
    definisi:
      "Penerbitan saham baru yang ditawarkan terlebih dahulu kepada pemegang saham lama secara proporsional. Tujuannya untuk menggalang dana tambahan. Pemegang saham bisa menggunakan hak-nya (exercise) atau mengabaikannya, namun jika diabaikan kepemilikannya akan terdilusi.",
    contoh:
      "Perusahaan melakukan right issue 1:5 — setiap pemilik 5 saham lama berhak membeli 1 saham baru.",
  },
  {
    istilah: "Waran",
    definisi:
      "Surat berharga yang memberikan hak kepada pemegangnya untuk membeli saham pada harga tertentu (harga exercise) dalam jangka waktu tertentu. Waran sering diberikan gratis sebagai pemanis saat IPO. Jika harga saham naik di atas harga exercise, waran menjadi bernilai.",
    contoh:
      "Setiap pembeli 2 saham IPO mendapat 1 waran gratis dengan harga exercise Rp 500, berlaku 3 tahun.",
  },
  {
    istilah: "Harga Penawaran",
    definisi:
      "Harga per lembar saham yang ditetapkan untuk dijual saat IPO. Harga ini ditentukan melalui proses book building dan merupakan harga yang dibayar investor saat membeli saham di pasar perdana (sebelum diperdagangkan di bursa).",
    contoh:
      "Harga penawaran IPO ditetapkan Rp 420 per lembar setelah proses book building selesai.",
  },
  {
    istilah: "Dana Hasil IPO",
    definisi:
      "Total uang yang diperoleh perusahaan dari penjualan saham baru saat IPO, setelah dikurangi biaya-biaya IPO. Di prospektus, perusahaan wajib menjelaskan rencana penggunaan dana ini secara detail — misalnya untuk ekspansi, bayar utang, atau modal kerja.",
    contoh:
      "Dari IPO, perusahaan mendapatkan dana Rp 1,05 triliun yang akan digunakan 45% untuk bangun pabrik baru.",
  },
];

export default function GlossaryPage() {
  return (
    <div className="min-h-screen bg-surface animate-fade-in">
      <div className="mx-auto max-w-[800px] px-4 py-10 sm:px-6">
        <h1 className="font-jakarta text-3xl font-bold text-primary sm:text-4xl">
          Glossary
        </h1>
        <p className="mt-2 text-lg text-text-secondary">
          Panduan lengkap istilah dan proses IPO untuk investor pemula
        </p>

        {/* Tahapan IPO */}
        <section className="mt-10" aria-labelledby="tahapan-heading">
          <h2 id="tahapan-heading" className="font-jakarta text-xl font-bold text-primary">
            Tahapan Proses IPO
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            Dari awal hingga saham bisa diperdagangkan di bursa
          </p>
          <div className="mt-5 space-y-3">
            {TAHAPAN_IPO.map((step) => (
              <div
                key={step.title}
                className="rounded-xl border border-border bg-white p-5"
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl shrink-0" role="img" aria-hidden="true">{step.emoji}</span>
                  <div>
                    <h3 className="font-jakarta text-[15px] font-semibold text-primary">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-[1.7] text-foreground">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cara Baca Prospektus */}
        <section className="mt-12" aria-labelledby="cara-heading">
          <h2 id="cara-heading" className="font-jakarta text-xl font-bold text-primary">
            Cara Membaca Prospektus IPO
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            6 bagian penting yang perlu Anda perhatikan
          </p>
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {CARA_BACA_PROSPEKTUS.map((card) => (
              <div
                key={card.title}
                className="rounded-xl border border-border bg-white p-5 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-sm"
              >
                <span className="text-2xl" role="img" aria-label={card.emojiLabel}>{card.emoji}</span>
                <h3 className="mt-2 text-[15px] font-semibold text-foreground">
                  {card.title}
                </h3>
                <p className="mt-1 text-[13px] leading-relaxed text-text-secondary">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Glosarium */}
        <section className="mt-12" aria-labelledby="glosarium-heading">
          <h2 id="glosarium-heading" className="font-jakarta text-xl font-bold text-primary">
            Istilah-Istilah IPO
          </h2>
          <p className="mt-1 text-sm text-text-secondary">
            Kamus lengkap istilah yang sering muncul di prospektus
          </p>
          <div className="mt-5 space-y-4">
            {GLOSARIUM.map((item) => (
              <div
                key={item.istilah}
                className="rounded-xl border border-border bg-white p-5"
              >
                <h3 className="font-jakarta text-base font-semibold text-primary">
                  {item.istilah}
                </h3>
                <p className="mt-2 text-sm leading-[1.7] text-foreground">
                  {item.definisi}
                </p>
                {item.contoh && (
                  <p className="mt-2 text-[13px] italic leading-relaxed text-text-secondary">
                    Contoh: {item.contoh}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
