# ARSAR Framework System Architecture - Release 0.1

Gambaran koordinasi antar sub-sistem setelah diintegrasikan pada Release 0.1:

```text
  ┌─────────────────────────────────────────────────────────────┐
  │                   CLI / GUI (App Shell)                     │
  └──────────────────────────────┬──────────────────────────────┘
                                 │ dispatch()
  ┌──────────────────────────────▼──────────────────────────────┐
  │                       Command Bus                           │
  └──────────────────────────────┬──────────────────────────────┘
                                 │ execute()
  ┌──────────────────────────────▼──────────────────────────────┐
  │                 Landing Generator (Epic 1.1)                │
  └──────┬───────────────────────┬───────────────────────┬──────┘
         │                       │                       │
  ┌──────▼──────┐         ┌──────▼──────┐         ┌──────▼──────┐
  │ Project     │         │ Knowledge   │         │ AI Content  │
  │ Engine      │         │ Engine      │         │ Engine      │
  │ (company/   │         │ (industry   │         │ (Gemini     │
  │ brand.json) │         │ data)       │         │ Providers)  │
  └──────┬──────┘         └──────┬──────┘         └──────┬──────┘
         │                       │                       │
         └───────────────┬───────┴───────────────────────┘
                         │
  ┌──────────────────────▼──────────────────────────────────────┐
  │                 Experience Composer (Blueprint)              │
  └──────────────────────────────┬──────────────────────────────┘
                                 │ resolve()
  ┌──────────────────────────────▼──────────────────────────────┐
  │                  Pipeline Engine (Renderer)                 │
  ├─────────────────────────────────────────────────────────────┤
  │ - compile HTML layouts (layout.html / head.html)            │
  │ - compile Brand Stylesheet (style.css variables hex)        │
  │ - compile robots.txt & sitemap.xml                          │
  │ - compile PWA manifest.json                                 │
  └──────────────────────────────┬──────────────────────────────┘
                                 │
                          [ Output /dist/ ]
```
