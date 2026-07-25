# Company Schema Documentation

## Purpose
Menjamin integritas metadata korporat untuk data terstruktur Schema.org, serta menampilkan kontak resmi di footer / halaman kontak.

## Structure
- `name` (string)
- `legalName` (string)
- `tagline` (string)
- `email` (string, format email)
- `phone` (string)
- `whatsapp` (string)
- `address` (object)

## Required Fields
- `name`
- `legalName`
- `email`
- `phone`
- `address`

## Validation Rules
- `email` wajib divalidasi format penulisan regex standar email.
- `address.streetAddress`, `address.addressLocality`, dan `address.postalCode` merupakan field wajib di dalam sub-objek address.
