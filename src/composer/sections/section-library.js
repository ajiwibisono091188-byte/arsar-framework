/**
 * Section Library Metadata Definitions
 */
export const sections = {
  hero: {
    id: "hero",
    name: "Hero Block",
    purpose: "Menarik perhatian awal pengunjung di atas lipatan layar (above the fold).",
    requiredInputs: ["title", "description", "ctaPrimary"],
    recommendedOrder: 10,
    compatiblePageTypes: ["landing", "homepage", "service", "product"]
  },
  benefits: {
    id: "benefits",
    name: "Benefits Block",
    purpose: "Menjelaskan manfaat solutif produk/layanan bagi pembeli.",
    requiredInputs: ["benefitsList"],
    recommendedOrder: 20,
    compatiblePageTypes: ["landing", "homepage", "service", "product"]
  },
  features: {
    id: "features",
    name: "Features Block",
    purpose: "Spesifikasi teknis produk.",
    requiredInputs: ["featuresList"],
    recommendedOrder: 30,
    compatiblePageTypes: ["product", "service"]
  },
  gallery: {
    id: "gallery",
    name: "Gallery Block",
    purpose: "Menampilkan portofolio foto/gambar hasil kerja.",
    requiredInputs: ["images"],
    recommendedOrder: 40,
    compatiblePageTypes: ["homepage", "service"]
  },
  testimonials: {
    id: "testimonials",
    name: "Testimonials Block",
    purpose: "Membangun bukti sosial (social proof) dari ulasan pelanggan.",
    requiredInputs: ["testimonialsList"],
    recommendedOrder: 50,
    compatiblePageTypes: ["landing", "homepage", "product"]
  },
  process: {
    id: "process",
    name: "Process Block",
    purpose: "Menunjukkan 3 langkah mudah cara kerja pemesanan.",
    requiredInputs: ["steps"],
    recommendedOrder: 60,
    compatiblePageTypes: ["landing", "service"]
  },
  comparison: {
    id: "comparison",
    name: "Comparison Block",
    purpose: "Tabel perbandingan keunggulan produk dibanding kompetitor.",
    requiredInputs: ["compareList"],
    recommendedOrder: 70,
    compatiblePageTypes: ["landing", "product"]
  },
  faq: {
    id: "faq",
    name: "FAQ Block",
    purpose: "Mengikis ragu dengan tanya jawab terarah.",
    requiredInputs: ["faqList"],
    recommendedOrder: 80,
    compatiblePageTypes: ["landing", "homepage", "faq"]
  },
  pricing: {
    id: "pricing",
    name: "Pricing Block",
    purpose: "Menampilkan rincian paket harga.",
    requiredInputs: ["pricingTiers"],
    recommendedOrder: 90,
    compatiblePageTypes: ["landing", "pricing", "product"]
  },
  cta: {
    id: "cta",
    name: "Call To Action Block",
    purpose: "Mendorong konversi Leads instan.",
    requiredInputs: ["ctaAction"],
    recommendedOrder: 100,
    compatiblePageTypes: ["landing", "homepage", "service", "product", "contact"]
  },
  footer: {
    id: "footer",
    name: "Footer Block",
    purpose: "Navigasi bawah, hak cipta, dan info alamat.",
    requiredInputs: ["copyrightText"],
    recommendedOrder: 200,
    compatiblePageTypes: ["landing", "homepage", "service", "product", "blog", "faq", "pricing", "contact", "thankyou"]
  }
};
