# Forms Schema Documentation

## Purpose
Menentukan parameter target pengiriman data formulir statis.

## Structure
- `contactForm` (object)
  - `submitEndpoint` (string, URL format)
  - `method` (string)
  - `fields` (array of strings)

## Required Fields
- `contactForm`

## Validation Rules
- `submitEndpoint` wajib berformat URL valid.
- `method` harus bertipe string huruf kapital (biasanya `"POST"` atau `"GET"`).
