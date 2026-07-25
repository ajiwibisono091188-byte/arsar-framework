/**
 * KeywordPlanner Class
 */
export class KeywordPlanner {
  /**
   * Plan keywords and negative terms
   * @param {Object} input { company, offer, location }
   */
  static plan(input = {}) {
    const company = (input.company || 'ARSAR').toLowerCase();
    const offer = (input.offer || 'Gadai BPKB').toLowerCase();
    const location = (input.location || 'Surabaya').toLowerCase();

    return {
      brand: [
        `${company} ${offer}`,
        `kredit ${company}`,
        `pinjaman ${company}`
      ],
      generic: [
        `${offer}`,
        `gadai mobil`,
        `gadai motor`,
        `pinjaman jaminan bpkb`
      ],
      commercialIntent: [
        `${offer} bunga murah`,
        `gadai bpkb cepat cair`,
        `dana tunai jaminan bpkb`,
        `pinjaman bpkb tanpa potongan`
      ],
      localIntent: [
        `${offer} ${location}`,
        `gadai bpkb mobil ${location}`,
        `pinjaman dana tunai ${location}`,
        `kredit bpkb ${location}`
      ],
      competitor: [
        `adira ${location}`,
        `baf gadai`,
        `fif bpkb`
      ],
      negativeKeywords: [
        "lowongan kerja",
        "gratis",
        "penipuan",
        "saham",
        "berita",
        "cara merusak",
        "makalah"
      ]
    };
  }
}
