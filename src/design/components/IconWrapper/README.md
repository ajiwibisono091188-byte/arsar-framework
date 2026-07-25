# IconWrapper Component

Komponen pembungkus ikon (Icon Wrapper) modular untuk standarisasi rasio ukuran, margin, border, dan latar belakang ornamen visual / ikon SVG.

## Variants
- `square`: Pembungkus dengan sudut membulat standar (`rounded-[var(--radius-md)]`).
- `circle`: Pembungkus bulat penuh (`rounded-full`).
- `glass`: Desain ornamen kaca (glassmorphism) transparan dengan efek blur tipis.

## Props
| Nama | Tipe | Default | Deskripsi |
| :--- | :--- | :--- | :--- |
| `variant` | `String` | `"square"` | `"square"`, `"circle"`, `"glass"` |
| `size` | `String` | `"medium"` | `"small"`, `"medium"`, `"large"` |
| `customClass` | `String` | `""` | Kelas CSS tambahan. |

## Contoh Penggunaan
```nunjucks
{% import "design/components/IconWrapper/IconWrapper.njk" as wrp %}

<!-- Circle Icon Wrapper containing custom SVG -->
{% call wrp.IconWrapper(variant="circle", size="large") %}
  <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
  </svg>
{% endcall %}
```
