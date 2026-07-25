# Application Shell Specification - ARSAR Studio

Application Shell bertindak sebagai kerangka antarmuka utama (**Application Framework**) untuk **ARSAR Studio** yang mengoordinasikan interaksi antarmuka pengguna tanpa logika bisnis langsung.

---

## 1. Arsitektur Komponen

### ApplicationShell (`src/app/shell/application-shell.js`)
Lapisan bootstrapper utama. Mengatur inisialisasi Router, Theme, Shortcuts, Command Palette, dan memancarkan event.

### LayoutManager (`src/app/layout/layout-manager.js`)
Penyusun letak visual area window kontainer (Sidebar, Topbar, Main Workspace, Right Panel, Status Bar).

### CommandManager (`src/app/command/command-manager.js`)
Pusat registrasi eksekusi sinyal Command Palette studio (e.g. `save-project`, `new-project`).

### NotificationManager (`src/app/notifications/notification-manager.js`)
Penyimpan list record banner alert GUI (`info`, `success`, `warning`, `error`).

### ThemeManager (`src/app/theme/theme-manager.js`)
Penyimpan preferensi visual (`light`, `dark`, `system`) dan memanipulasi class root HTML document.

### ShortcutManager (`src/app/shortcuts/shortcut-manager.js`)
Pengikat sensor penekanan keyboard global (hotkeys listener).

### ShellRouter (`src/app/router/shell-router.js`)
Penyedia single-page-routing perpindahan area workspace (SPA router).

---

## 2. Shell Event Signals

Shell memancarkan sinyal peristiwa:
- `shell.initialized`: Dipancarkan setelah pemetaan menu dan hotkeys default selesai dimuat.
- `module.opened`: Dipancarkan saat modul workspace baru dibuka di workspace tengah.
- `command.executed`: Dipancarkan setelah instruksi command palette selesai dieksekusi.
- `theme.changed`: Dipancarkan sesaat setelah visual mode dirubah.
