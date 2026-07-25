# Stylesheets Directory

Direktori ini berisi modul stylesheet CSS modular untuk framework. Dikompilasi menggunakan PostCSS + TailwindCSS v4 di dalam build pipeline Vite.

## Struktur Berkas CSS
- `main.css`: Entrypoint utama CSS. Mengimpor TailwindCSS v4 dan modul-modul CSS lokal lainnya.
- `components.css`: Berisi custom class untuk komponen UI kompleks (seperti glassmorphism dan premium card glow).
- `forms.css`: Custom style untuk form input, text area, checkbox, dan states focus-nya.
- `animations.css`: Keyframes dan utility class untuk micro-interactions/animations.
- `utilities.css`: CSS utilities tambahan yang tidak didefinisikan secara bawaan di Tailwind.
