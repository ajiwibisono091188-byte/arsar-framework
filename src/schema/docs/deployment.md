# Deployment Schema Documentation

## Purpose
Menentukan target build folder dan konfigurasi hosting CDN (Cloudflare/Vercel).

## Structure
- `provider` (string)
- `buildDir` (string)
- `cleanUrls` (boolean)
- `cacheControlMaxAge` (number)

## Required Fields
- `provider`
- `buildDir`
- `cleanUrls`

## Validation Rules
- `cacheControlMaxAge` wajib berupa angka bulat positif (minimum: 0).
