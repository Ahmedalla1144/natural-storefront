# جُذور / ROOTS — natural-storefront

An interactive static preview for an Egyptian natural-food storefront. **All prices, branding and descriptions are illustrative. No real orders or payments.**

## Run and verify

Requires Node.js 22+.

```sh
npm ci
npm run dev
npm test
npm run build
npm run preview
npx playwright install chromium
npm run test:e2e
```

Pages live beneath `/natural-storefront/`. For example: `product.html?lang=en&id=ajwa`. Arabic is the default; `lang=en` selects English. All three HTML files are Vite build entries and can be loaded directly on GitHub Pages.

## Deploy to GitHub Pages

Repository: https://github.com/Ahmedalla1144/natural-storefront

GitHub Pages: https://ahmedalla1144.github.io/natural-storefront/

Pages is configured to use GitHub Actions. Pushing to `main` or manually running the deployment workflow installs from the lockfile, tests, builds, uploads **dist/** and deploys with official Pages actions. The workflow deployment environment reports the published URL.

```sh
git push origin main
gh run list --repo Ahmedalla1144/natural-storefront
```

For another repository, update Vite's `base` to match its name and select **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Architecture and replacement points

- `src/data/products.js`: temporary product IDs, translated names, category, photos, options, fixed package sizes, integer EGP price matrix (`prices[variantIndex][sizeIndex]`). Regular/Extra are neutral option names with no quality claims.
- `src/i18n/translations.js`: complete Arabic and English copy.
- `src/components/shell.js`: shared layout and native dialog cart; reusable icons, product cards and cart lines live alongside it. HTML templates use Alpine directives and can move into Blade partials without adopting a client router.
- `src/pages/`: home, product and checkout templates; `store.js` holds Alpine page state and interactions.
- `src/utils/cart.js`: cart validation, storage and price calculations, independent from presentation.
- `src/style.css`: responsive design, automatic OS dark palette and Tailwind CSS 4 import.
- `public/images/`: locally served, optimized temporary photographs. Gallery view two is an enlarged detail of the same source, pending seller photography.

The visual system is transcribed from the supplied “Natural Pantry - Arabic Mini Store / Client Review v1” PNG exports: warm cream background, forest-green controls, rounded white cards, a split hero, featured products, and matching product/checkout panels. Desktop and mobile exports for both languages were used without any Figma API calls. Package-size controls, catalog prices, the cart flow and automatic OS dark mode are retained. The implementation adapts the exported layouts for accessible controls and intermediate screen sizes.

## Privacy and accessibility

Only product ID, option index, size index and package count are stored in localStorage. Saved data is validated against the catalog. Customer form values remain in memory, are cleared after simulation, and are never transmitted or persisted. Use fictional input. There is no backend, analytics, payment integration or order request. Fonts are loaded from Google Fonts with system fallbacks. Pages include noindex/nofollow and robots exclusion.

Native `<dialog>` supplies keyboard focus containment, Escape dismissal and focus restoration. Controls have labels, keyboard focus indicators and semantic landmarks. Both reduced motion and OS color scheme are supported. Every visible page shows a demo banner and pricing disclaimers. The confirmation explicitly states that no order was placed.

## Image credits and rights

The five illustrative photographs were supplied with the exported design as `Generated Image.png` and `Generated Image-1.png` through `Generated Image-4.png`. They replace the earlier placeholder photos. JPEGs are resized to 1000 pixels wide and compressed for delivery; CSS crops them for their placements. No photograph establishes an actual cultivar, packaging, ingredient or origin. Final seller assets and details can replace them before launch.

## Verification

`npm test` covers price calculation and rejecting invalid saved cart data. Playwright runs the browsing → configurable product → persistent cart → validation → simulated checkout flow across 8 combinations of Arabic/English, 390/1440-pixel viewport and light/dark. It checks language/product preservation, single-option selector omission, local assets, JavaScript errors, overflow and no personal data in storage. Tests use the production build and the real GitHub Pages base path.
