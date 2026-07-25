# Navigation Schema Documentation

## Purpose
Menyusun menu tautan navigasi di area atas (header) dan area kaki (footer) website.

## Structure
- `header` (array of objects: `{ label, path }`)
- `footer` (array of objects: `{ label, path }`)

## Required Fields
- `header`
- `footer`

## Validation Rules
- Setiap item menu di dalam `header` dan `footer` wajib memiliki label tulisan dan path target tautan yang tidak boleh kosong.
