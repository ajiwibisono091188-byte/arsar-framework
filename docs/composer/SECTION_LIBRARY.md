# Section Library Spec - Experience Composer

Section Library menyimpan kumpulan definisi metadata seksi visual makro. Setiap seksi memiliki aturan letak dan data input wajib.

---

## Katalog Seksi & Aturan Penggunaan

| ID Seksi | Nama Seksi | Input Wajib | Urutan Rekomendasi |
| :--- | :--- | :--- | :--- |
| **hero** | Hero Block | `title`, `description`, `ctaPrimary` | 10 (Selalu Teratas) |
| **benefits** | Benefits Block | `benefitsList` | 20 |
| **features** | Features Block | `featuresList` | 30 |
| **gallery** | Gallery Block | `images` | 40 |
| **testimonials** | Testimonials Block | `testimonialsList` | 50 |
| **process** | Process Block | `steps` | 60 |
| **comparison** | Comparison Block | `compareList` | 70 |
| **faq** | FAQ Block | `faqList` | 80 |
| **pricing** | Pricing Block | `pricingTiers` | 90 |
| **cta** | Call to Action | `ctaAction` | 100 |
| **footer** | Footer Block | `copyrightText` | 200 (Selalu Terbawah) |
