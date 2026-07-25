# Tracking Schema Documentation

## Purpose
Mengatur status keaktifan analitik pengunjung dan periklanan berbayar Google/Facebook.

## Structure
- `googleAnalytics` (object: `{ enabled, measurementId }`)
- `facebookPixel` (object: `{ enabled, pixelId }`)
- `googleTagManager` (object: `{ enabled, containerId }`)

## Required Fields
- `googleAnalytics`
- `facebookPixel`

## Validation Rules
- Jika properti `enabled` bernilai true, maka `measurementId` (GA4) atau `pixelId` (FB Ads) tidak boleh kosong (mengeluarkan warning).
