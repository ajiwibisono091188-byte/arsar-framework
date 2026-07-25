# Pricing Schema Documentation

## Purpose
Menyusun skema data paket harga dan benefit yang diperoleh pelanggan.

## Structure
- `planName` (string)
- `price` (string)
- `priceInterval` (string)
- `description` (string)
- `featuresIncluded` (array of strings)
- `isPopular` (boolean)

## Required Fields
- `planName`
- `price`
- `featuresIncluded`

## Validation Rules
- `featuresIncluded` wajib berupa array berisi minimal 1 item teks benefit.
