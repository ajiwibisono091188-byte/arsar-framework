/**
 * StrategyRegistry Class
 */
export class StrategyRegistry {
  constructor() {
    this.strategies = new Map();
    this.initDefaultStrategies();
  }

  initDefaultStrategies() {
    const defaults = [
      { id: "lead-generation", name: "Lead Generation", focus: "Mendapatkan kontak / leads calon pembeli." },
      { id: "conversion", name: "Conversion", focus: "Meningkatkan rasio penjualan langsung." },
      { id: "seo", name: "SEO", focus: "Mengoptimasi kata kunci lokal untuk mendominasi Google search." },
      { id: "brand-awareness", name: "Brand Awareness", focus: "Memperkenalkan profil legalitas instansi." },
      { id: "product-launch", name: "Product Launch", focus: "Peluncuran produk tunggal baru." },
      { id: "local-business", name: "Local Business", focus: "Konversi kunjungan/telepon pembeli terdekat." },
      { id: "ecommerce", name: "Ecommerce", focus: "Pembelian instan produk belanjaan." }
    ];
    defaults.forEach((s) => this.strategies.set(s.id, s));
  }

  get(id) {
    return this.strategies.get(id) || null;
  }

  list() {
    return Array.from(this.strategies.values());
  }

  register(id, name, focus) {
    this.strategies.set(id, { id, name, focus });
  }
}
export const strategyRegistry = new StrategyRegistry();
