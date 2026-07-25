# Hero Schema Documentation

## Purpose
Menyusun data terstruktur untuk blok banner atas (hero) halaman pendaratan.

## Structure
- `badge` (string)
- `title` (string)
- `description` (string)
- `ctaPrimary` (object: `{ label, path }`)
- `ctaSecondary` (object: `{ label, path }`)

## Required Fields
- `title`
- `description`
- `ctaPrimary`

## Validation Rules
- `ctaPrimary.label` dan `ctaPrimary.path` wajib diisi jika `ctaPrimary` dilampirkan.
