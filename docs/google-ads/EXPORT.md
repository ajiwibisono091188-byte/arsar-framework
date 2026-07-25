# Campaign Exporter Specification - Google Ads Generator

Modul Exporter memfasilitasi pengunduhan data aset kampanye Google Ads ke dalam berbagai format standar file pengembang.

---

## 1. Format yang Didukung

- **JSON**: Menyediakan struktur data hierarki utuh untuk integrasi API dasbor atau database.
- **CSV**: Menyediakan berkas rata dua kolom (Type & Content) untuk mempermudah pemindahan manual.

---

## 2. Rencana Integrasi Google Ads Editor

Di masa mendatang, modul Exporter dirancang mudah diperluas (*extensible*) untuk menghasilkan format CSV khusus Google Ads Editor yang memiliki kolom wajib import seperti:
- `Campaign`
- `Ad Group`
- `Headline 1` s.d `Headline 15`
- `Description 1` s.d `Description 4`
