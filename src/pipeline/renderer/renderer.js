import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

/**
 * Renderer Class
 */
export class Renderer {
  /**
   * Render Page Blueprint into static HTML
   * @param {Object} blueprint Page blueprint
   * @param {Object} projectData Config data dictionary (company, brand, landing, seo, etc.)
   * @returns {String} Compiled HTML string
   */
  static render(blueprint, projectData = {}) {
    console.log(`[Renderer] Compiling template layouts for page type: "${blueprint.pageType}"`);

    const templatesDir = path.join(__dirname, '../templates');
    
    // 1. Load layout components or fallbacks
    const loadTpl = (file, fallback) => {
      const p = path.join(templatesDir, file);
      return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : fallback;
    };

    let layout = loadTpl('layout.html', '<html><body><!-- INCLUDE_SECTIONS --></body></html>');
    let head = loadTpl('head.html', '<title>{{title}}</title>');
    let header = loadTpl('header.html', '<header>{{company_name}}</header>');
    let footer = loadTpl('footer.html', '<footer>&copy; {{year}}</footer>');

    // 2. Resolve global replacements
    const company = projectData.company || {};
    const seo = projectData.seo || {};

    const replacements = {
      title: seo.defaultTitle || company.name || 'ARSAR Pemasaran',
      description: seo.defaultDescription || 'Website instan berkinerja tinggi',
      robots: seo.robots || 'index, follow',
      company_name: company.name || 'Arsar Digital',
      company_legal: company.legalName || 'PT Arsar Digital Indonesia',
      year: new Date().getFullYear().toString()
    };

    const applyReplacements = (str) => {
      return str.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, key) => {
        return key in replacements ? replacements[key] : match;
      });
    };

    head = applyReplacements(head);
    header = applyReplacements(header);
    footer = applyReplacements(footer);

    // 3. Compile sections dynamically based on blueprint
    let sectionsHtml = '';
    const brand = projectData.brand || { primaryColor: '#8b5cf6', secondaryColor: '#10b981' };

    blueprint.sections.forEach((secId) => {
      if (secId === 'hero') {
        sectionsHtml += `
<section class="max-w-6xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center" id="hero">
  <div>
    <span class="bg-violet-100 text-violet-800 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">⚡ AI MARKETING OS</span>
    <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mt-6 leading-tight">Cicil Mobil Surabaya Cepat</h1>
    <p class="text-lg text-gray-600 mt-4">DP Ringan mulai 10% disesuaikan dengan gaji bulanan Anda. Proses cepat 24 jam berkas dijemput.</p>
    <div class="mt-8">
      <a href="#contact" class="bg-violet-600 text-white px-6 py-3 rounded-lg text-base font-semibold hover:bg-violet-700 transition shadow-lg shadow-violet-200">Ajukan Cicilan Sekarang</a>
    </div>
  </div>
  <div class="hidden md:block">
    <div class="w-full h-80 bg-violet-50 rounded-2xl border border-violet-100 flex items-center justify-between px-8">
      <span class="text-violet-400 font-medium">Visual Card Placeholder</span>
    </div>
  </div>
</section>
`;
      } else if (secId === 'benefits') {
        sectionsHtml += `
<section class="bg-gray-50 py-20 border-t border-gray-100" id="features">
  <div class="max-w-6xl mx-auto px-4">
    <div class="text-center max-w-2xl mx-auto mb-16">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900">Kenapa Memilih Kami?</h2>
      <p class="text-gray-500 mt-2">Dapatkan pembiayaan terpercaya dengan kemudahan maksimal.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h3 class="text-lg font-bold text-gray-900">DP Ringan 10%</h3>
        <p class="text-gray-500 mt-2">Uang muka terendah khusus pekerja muda pembeli mobil pertama.</p>
      </div>
      <div class="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h3 class="text-lg font-bold text-gray-900">Persetujuan Kilat 24 Jam</h3>
        <p class="text-gray-500 mt-2">Berkas kami jemput langsung ke rumah Anda tanpa ribet.</p>
      </div>
    </div>
  </div>
</section>
`;
      } else if (secId === 'testimonials') {
        sectionsHtml += `
<section class="bg-white py-20 border-t border-gray-100" id="testimonials">
  <div class="max-w-6xl mx-auto px-4">
    <div class="text-center max-w-2xl mx-auto mb-16">
      <h2 class="text-3xl font-bold tracking-tight text-gray-900">Ulasan Pelanggan</h2>
    </div>
    <div class="bg-gray-50 p-8 rounded-xl border border-gray-100">
      <p class="text-lg italic text-gray-600">"Sangat terbantu! Pengajuan kredit mobil saya disetujui dalam 1 hari. Staf sangat ramah dan menjemput berkas."</p>
      <span class="font-bold text-gray-900 block mt-4">- Budi Santoso, Pekerja Swasta</span>
    </div>
  </div>
</section>
`;
      } else if (secId === 'faq') {
        sectionsHtml += `
<section class="bg-gray-50 py-20 border-t border-gray-100" id="faq">
  <div class="max-w-6xl mx-auto px-4">
    <h2 class="text-3xl font-bold tracking-tight text-gray-900 text-center mb-12">Pertanyaan Populer</h2>
    <div class="max-w-3xl mx-auto space-y-6">
      <div class="bg-white p-6 rounded-lg border border-gray-100">
        <h4 class="font-bold text-gray-900">Apa saja syarat dokumen pengajuan?</h4>
        <p class="text-gray-500 mt-2">Cukup KTP, KK, Slip Gaji 3 bulan terakhir, dan Rekening Koran.</p>
      </div>
    </div>
  </div>
</section>
`;
      } else if (secId === 'cta') {
        sectionsHtml += `
<section class="bg-violet-900 py-16 text-center text-white" id="contact">
  <div class="max-w-4xl mx-auto px-4">
    <h2 class="text-3xl font-extrabold tracking-tight">Siap Mendapatkan Mobil Impian Anda?</h2>
    <p class="text-violet-200 mt-4 max-w-lg mx-auto">Ajukan simulasi angsuran gratis sekarang via chat langsung dengan staf finance kami.</p>
    <div class="mt-8">
      <a href="https://wa.me/6281234567890" class="bg-emerald-500 text-white px-8 py-3 rounded-lg text-base font-bold hover:bg-emerald-600 transition inline-flex items-center space-x-2">
        <span>Konsultasi Cicilan via WhatsApp</span>
      </a>
    </div>
  </div>
</section>
`;
      }
    });

    // 4. Inject sections and elements into layout
    let output = layout;
    output = output.replace('<!-- INCLUDE_HEAD -->', head);
    output = output.replace('<!-- INCLUDE_HEADER -->', header);
    output = output.replace('<!-- INCLUDE_SECTIONS -->', sectionsHtml);
    output = output.replace('<!-- INCLUDE_FOOTER -->', footer);
    output = output.replace('<!-- INCLUDE_SCRIPTS -->', '');

    console.log('[Renderer] Compile completed.');
    return output;
  }
}
