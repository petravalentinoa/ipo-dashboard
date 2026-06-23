export interface HargaIPO {
  min: number;
  max: number;
}

export interface PemegangSaham {
  nama: string;
  jumlahSaham: string;
  persentaseSebelumIPO: string;
  persentaseSetelahIPO: string;
}

export interface Pejabat {
  nama: string;
  jabatan: string;
}

export interface KomisarisDanDireksi {
  komisaris: Pejabat[];
  direksi: Pejabat[];
}

export interface AnakUsaha {
  nama: string;
  bidangUsaha: string;
  kepemilikan: string;
}

export interface BisnisPerusahaan {
  deskripsiSingkat: string;
  sektorIndustri: string;
  produkUtama: string[];
  anakUsaha: AnakUsaha[];
}

export interface DataKeuanganItem {
  tahun: string;
  nilai: string;
}

export interface Keuangan {
  pendapatan: DataKeuanganItem[];
  labaBersih: DataKeuanganItem[];
  totalAset: DataKeuanganItem[];
}

export interface PenggunaanDanaIPO {
  keperluan: string;
  persentase: string;
  deskripsi: string;
}

export interface JadwalIPO {
  penawaranAwal: string;
  penawaranUmum: string;
  penjatahanEfek: string;
  distribusiSaham: string;
  pencatatan: string;
}

export type StatusIPO =
  | "penawaran_awal"
  | "penawaran_umum"
  | "penjatahan_efek"
  | "distribusi_saham"
  | "tercatat";

export interface IPOData {
  id: string;
  namaPerusahaan: string;
  kodeSaham: string;
  jadwalIPO: JadwalIPO;
  hargaIPO: HargaIPO;
  jumlahSahamDitawarkan: string;
  penjaminEmisi: string;
  status: StatusIPO;
  pemegangSaham: PemegangSaham[];
  komisarisDanDireksi: KomisarisDanDireksi;
  bisnisPerusahaan: BisnisPerusahaan;
  keuangan: Keuangan;
  penggunaanDanaIPO: PenggunaanDanaIPO[];
  kebijakanDividen: string;
}
