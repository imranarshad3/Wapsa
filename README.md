# MORROW — clothing & accessory archive

A minimal fashion storefront built with **Next.js 14** and **GSAP**.

- **Clothing** — garments hang on an angled rail; arrows, thumbnails, scroll wheel, arrow keys or swipe pull the next one forward.
- **Product detail** — size picker, add to bag, and Product / On body / Fabric views.
- **Accessory** — grid of silver pieces with a detail side panel.
- **Journal** and **About** pages, live search, menu drawer, and a bag that remembers its contents in the browser.

Brand and products are sample content. Product photos are AI-generated studio shots in `public/photos/`; replace a file with the same name to swap in your own photo.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build    # static site in ./out
```

The `out` folder can be deployed to Vercel, Netlify, GitHub Pages or any static host.

## Where things live

| Path | What it holds |
| --- | --- |
| `app/page.js` | Renders the page and starts the site script |
| `app/globals.css` | All styles |
| `lib/markup.js` | Page markup (header, views, drawers, footer) |
| `lib/site.js` | Product data, rendering, routing, GSAP animation |
| `public/photos/` | Product photos, one per product id |
