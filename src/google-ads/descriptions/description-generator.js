/**
 * DescriptionGenerator Class
 */
export class DescriptionGenerator {
  /**
   * Generate 15 Google Ads Search descriptions (<= 90 chars)
   * @param {Object} input { company, offer, usp, location }
   * @returns {Array} List of 15 descriptions
   */
  static generate(input = {}) {
    const company = input.company || 'ARSAR';
    const offer = input.offer || 'Gadai BPKB';
    const usp = input.usp || 'Bunga Rendah';
    const location = input.location || 'Surabaya';

    const templates = [
      `Butuh dana cepat? Ajukan ${offer} aman resmi OJK. Bunga mulai 0.8% flat. Berkas dijemput.`,
      `Pinjaman dana tunai jaminan ${offer} di ${location}. Plafon tinggi, cair hari ini juga.`,
      `Solusi kredit ${offer} resmi di ${company}. Tanpa potongan biaya besar, aman terpercaya.`,
      `Ajukan gadai ${offer} mobil/motor Anda sekarang. Bunga paling murah se-${location}.`,
      `Jaminan gadai ${offer} aman terlindungi. Plafon cair maksimal sampai 90% nilai taksasi.`,
      `Syarat mudah hanya KTP & KK saja. Proses kilat 24 jam selesai. Konsultasi gratis di sini.`,
      `Ingin simulasi kredit? Cek angsuran bulanan Anda gratis via WhatsApp. Ajukan hari ini.`,
      `Dapatkan penawaran bunga flat ${usp} terbaik hanya di ${company}. Bebas BI checking.`,
      `Gadai resmi BPKB proses transparan tanpa biaya siluman. Aman terpercaya berijin resmi.`,
      `Mobil tetap bisa Anda gunakan untuk kerja sehari-hari. BPKB aman tersimpan rapi.`,
      `Pilihan tenor fleksibel mulai dari 12 hingga 48 bulan. Sesuaikan kemampuan angsuran Anda.`,
      `Ajukan ${offer} online praktis tanpa ribet. Staf finance kami menjemput berkas ke rumah.`,
      `Solusi keuangan mendesak paling aman di ${location}. Jaminan BPKB resmi bunga super ringan.`,
      `Daftar simulasi pinjaman dana sekarang. Cs kami aktif melayani konsultasi online 24 jam.`,
      `Mitra pembiayaan ${offer} keluarga terpercaya sejak lama. Bunga bersaing dan berkas aman.`
    ];

    // Ensure length limits and format
    const cleanList = Array.from(new Set(templates))
      .map(item => item.substring(0, 90).trim());

    // Pad if not enough
    while (cleanList.length < 15) {
      cleanList.push(`Ajukan pembiayaan dana cepat jaminan ${offer} resmi aman di ${company} sekarang juga.`.substring(0, 90));
    }

    return cleanList.slice(0, 15);
  }
}
