# CLI Command Parser - Command Platform

Command Parser mengubah input teks perintah string tunggal menjadi objek data terstruktur.

---

## Mekanisme Parsing

Parser membaca kata demi kata, mendeteksi opsi bendera (`--option` atau `-o`), serta menyatukan isi string di dalam tanda kutip ganda/tunggal.

### Contoh Pemrosesan

Input String:
`arsar new spa-BPKB --desc "Kredit Mobil Cepat"`

Hasil Output JSON Objek:
```json
{
  "commandId": "new",
  "args": ["spa-BPKB"],
  "options": {
    "desc": "Kredit Mobil Cepat"
  }
}
```
*Catatan: Prefiks binary `arsar` dilewati secara otomatis.*
