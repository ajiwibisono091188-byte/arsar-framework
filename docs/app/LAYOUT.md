# Layout System Spec - Application Shell

Layout System membagi layar monitor studio menjadi 5 area utama untuk kerapian tata letak antarmuka workspace:

---

## 1. Area Layout Grid

- **Topbar**: Bilah atas (tinggi `60px`) memuat nama proyek yang sedang aktif dibuka dan tombol Command Palette.
- **Sidebar**: Bilah kiri (lebar `240px`) memuat daftar navigasi utama dari menu Projects hingga Analytics.
- **Main Workspace**: Area tengah sisa yang menampilkan halaman input/preview visual aktif.
- **Right Panel (placeholder)**: Panel kanan (lebar `300px`) untuk meletakkan sidebar opsi inspektor variabel / properti seksi visual.
- **Status Bar**: Bilah bawah (tinggi `24px`) memuat info status loading kompilasi static build dan logging error.

---

## 2. Abstraksi CSS Grid Area Mappings

Layout disusun menggunakan pemetaan Grid Template Areas berikut:
```text
+-------------------------------------------------+
|                    topbar                       |
+-----------+-------------------------+-----------+
|           |                         |           |
|  sidebar  |        workspace        | rightpanel|
|           |                         |           |
+-----------+-------------------------+-----------+
|                  statusbar                      |
+-------------------------------------------------+
```
