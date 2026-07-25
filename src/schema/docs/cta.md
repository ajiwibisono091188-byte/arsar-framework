# CTA Schema Documentation

## Purpose
Menyediakan data teks pemicu aksi konversi pelanggan (Call to Action).

## Structure
- `title` (string)
- `description` (string)
- `whatsappText` (string)
- `emailEndpoint` (string, URL format)

## Required Fields
- `title`
- `description`

## Validation Rules
- `emailEndpoint` wajib berformat URL valid jika dilampirkan.
