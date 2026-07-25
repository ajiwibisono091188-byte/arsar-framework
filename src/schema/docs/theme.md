# Theme Schema Documentation

## Purpose
Menyediakan acuan token visual dan warna tema bagi generator aset.

## Structure
- `name` (string)
- `primaryColor` (string, HEX format)
- `secondaryColor` (string, HEX format)
- `darkMode` (boolean)
- `borderRadius` (string)
- `fontFamily` (string)

## Required Fields
- `primaryColor`
- `secondaryColor`
- `darkMode`

## Validation Rules
- `primaryColor` & `secondaryColor` wajib berupa kode warna HEX yang valid diawali tanda `#` (contoh: `#ffffff` atau `#fff`).
