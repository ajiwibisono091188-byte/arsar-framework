/**
 * LayoutRegistry Class
 */
export class LayoutRegistry {
  constructor() {
    this.layouts = new Map();
    this.initDefaultLayouts();
  }

  initDefaultLayouts() {
    const defaults = [
      { id: "single-column", name: "Single Column Layout", description: "Satu kolom bersih memanjang kebawah." },
      { id: "split", name: "Split Layout", description: "Bagi dua kolom (kiri-kanan) ideal untuk Hero dan CTA." },
      { id: "card-grid", name: "Card Grid Layout", description: "Grid berbentuk kartu, ideal untuk Benefit dan Pricing." },
      { id: "alternating", name: "Alternating Layout", description: "Penataan selang-seling (gambar kiri teks kanan, lalu dibalik)." },
      { id: "minimal", name: "Minimal Layout", description: "Sangat sederhana untuk landing page berkecepatan ekstrim." }
    ];
    defaults.forEach((l) => this.layouts.set(l.id, l));
  }

  get(id) {
    return this.layouts.get(id) || null;
  }

  list() {
    return Array.from(this.layouts.values());
  }

  register(id, name, description) {
    this.layouts.set(id, { id, name, description });
  }
}
export const layoutRegistry = new LayoutRegistry();
