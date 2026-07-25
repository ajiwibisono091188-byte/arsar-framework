/**
 * ExtensionsGenerator Class
 */
export class ExtensionsGenerator {
  /**
   * Generate campaign extensions
   * @param {Object} input { company, offer }
   */
  static generate(input = {}) {
    const company = input.company || 'ARSAR';
    const offer = input.offer || 'Gadai BPKB';

    return {
      sitelinks: [
        {
          text: "Simulasi Kredit",
          description1: "Cek angsuran per bulan gratis",
          description2: "Plafon cair hingga 90% taksasi",
          url: "/simulasi"
        },
        {
          text: "Persyaratan Mudah",
          description1: "Hanya perlu KTP, KK & BPKB",
          description2: "Proses kilat langsung cair",
          url: "/syarat"
        },
        {
          text: "Hubungi Kami",
          description1: "Konsultasi gratis via WhatsApp",
          description2: "Staf menjemput berkas ke rumah",
          url: "/kontak"
        }
      ],
      callouts: [
        "Bunga Mulai 0.8%",
        "Proses Kilat 24 Jam",
        "Tanpa BI Checking",
        "Berkas Dijemput"
      ],
      structuredSnippets: {
        header: "Layanan",
        values: [
          `Gadai Mobil`,
          `Gadai Motor`,
          `Pinjaman Dana Tunai`,
          `Pembiayaan Syariah`
        ]
      }
    };
  }
}
