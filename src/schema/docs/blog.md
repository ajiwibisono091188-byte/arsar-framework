# Blog Schema Documentation

## Purpose
Mengatur batasan rendering seksi list berita/artikel di dalam blog.

## Structure
- `postsPerPage` (number)
- `rssEnabled` (boolean)
- `authorDefault` (string)
- `categories` (array of strings)

## Required Fields
- `postsPerPage`
- `rssEnabled`
- `categories`

## Validation Rules
- `postsPerPage` wajib berupa angka bulat positif (minimum: 1).
- `categories` wajib berisi daftar nama kategori teks unik.
