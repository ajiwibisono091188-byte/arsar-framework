# Modal Component

Komponen dialog pop-up (Modal) serbaguna.

## Fitur & Event Listeners
- **Global Event Triggers**: Mendengarkan event kustom `@open-modal.window` untuk membuka modal dari tombol mana pun di seluruh halaman.
- **Escape Key Listener**: Mendengarkan penekanan tombol keyboard `@keydown.escape.window` untuk menutup dialog secara otomatis.
- **Backdrop Dismissal**: Mengetuk area redup di luar kontainer modal (`@click="open = false"`) akan otomatis menutup dialog.
