# Site Schema Documentation

## Purpose
Mengatur properti global situs web pemasaran, termasuk URL, lokalisasi, dan pelacakan versi berkas aset.

## Structure
- `title` (string)
- `url` (string, format URL)
- `language` (string)
- `country` (string)
- `version` (string)
- `assetVersion` (string)
- `logo` (string)

## Required Fields
- `title`
- `url`
- `language`

## Validation Rules
- `url` wajib berformat URL valid (dimulai dengan `http://` atau `https://`).
- `language` disarankan kode ISO 2 digit huruf kecil (id, en).
