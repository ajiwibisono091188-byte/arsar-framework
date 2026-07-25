/**
 * HeadlineGenerator Class
 */
export class HeadlineGenerator {
  /**
   * Generate 30 Google Ads Search headlines (<= 30 chars)
   * @param {Object} input { company, offer, usp, location, goal }
   * @returns {Array} List of 30 headlines
   */
  static generate(input = {}) {
    const company = input.company || 'ARSAR';
    const offer = input.offer || 'Gadai BPKB';
    const usp = input.usp || 'Bunga Rendah';
    const location = input.location || 'Surabaya';

    const templates = [
      // Keyword & Offer matching
      `${offer} Resmi`,
      `${offer} Terpercaya`,
      `Pinjaman ${offer}`,
      `Butuh ${offer}?`,
      `Kredit ${offer}`,
      
      // USP & Benefits matching
      `${usp} Murah`,
      `Proses Cepat 24 Jam`,
      `Bunga Mulai 0.8%`,
      `Syarat Sangat Mudah`,
      `Tanpa BI Checking`,
      `Plafon Cair Maksimal`,
      `Jaminan Aman 100%`,
      `Bunga Paling Rendah`,
      `Berkas Dijemput`,
      `Cair Langsung Hari Ini`,
      
      // Local Intent
      `${offer} ${location}`,
      `Kredit Mobil ${location}`,
      `Gadai Cepat ${location}`,
      `Gadai Resmi ${location}`,
      `BPKB Mobil ${location}`,
      
      // Call to Actions (CTA)
      `Ajukan Sekarang`,
      `Hubungi Kami`,
      `Daftar Online Saja`,
      `Cek Angsuran Gratis`,
      `Dapatkan Brosur`,
      `Simulasi Kredit Free`,
      `Konsultasi Gratis WA`,
      
      // Company brand matching
      `Solusi Resmi ${company}`,
      `Ajukan di ${company}`,
      `Mitra Terpercaya ${company}`
    ];

    // Guarantee uniqueness, filter length <= 30, and pad to exactly 30 entries
    const cleanList = Array.from(new Set(templates))
      .map(item => item.substring(0, 30).trim());

    // Fallback padding if not enough entries
    while (cleanList.length < 30) {
      cleanList.push(`Ajukan Mudah Ke ${company} ${cleanList.length}`.substring(0, 30));
    }

    return cleanList.slice(0, 30);
  }
}
