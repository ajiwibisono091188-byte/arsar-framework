# Unified Command Platform - ARSAR Studio

Command Platform menyatukan pengeksekusian seluruh instruksi studio sehingga pengembang, CLI, and antarmuka visual GUI memanggil endpoint API yang sama.

---

## 1. Arsitektur Komponen

### BaseCommand (`src/commands/core/base-command.js`)
Kelas dasar representasi perintah yang memiliki metadata argumen, opsi, validasi, dan handler `.execute()`.

### CommandRegistry (`src/commands/registry/command-registry.js`)
Pusat registrasi koleksi instruksi command bawaan default dan kustom.

### CommandBus (`src/commands/bus/command-bus.js`)
Pipa pengalir eksekusi asinkronus command melewati gerbang Middleware.

### CommandContext (`src/commands/context/command-context.js`)
Pembawa variabel runtime pendukung (seperti logger dan metadata environment).

### CommandParser (`src/commands/parser/command-parser.js`)
Pengurai string CLI mentah menjadi token parameter terstruktur.

---

## 2. Platform Event Signals

Platform memancarkan sinyal asinkronus ke bus peristiwa:
- `command.started`: Dipancarkan ketika perintah resmi masuk ke CommandBus.
- `command.completed`: Dipancarkan saat instruksi selesai tereksekusi tanpa crash.
- `command.failed`: Dipancarkan apabila middleware atau executor melempar exception error.
