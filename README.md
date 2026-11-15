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

The demo preserves the requested cream/olive direction. **Figma visual fidelity is not verified:** Figma MCP returned a Starter-plan rate-limit error before any screen could be inspected, and there were no supplied screenshots. The file itself was not edited.

## Privacy and accessibility

Only product ID, option index, size index and package count are stored in localStorage. Saved data is validated against the catalog. Customer form values remain in memory, are cleared after simulation, and are never transmitted or persisted. Use fictional input. There is no backend, analytics, payment integration or order request. Fonts are loaded from Google Fonts with system fallbacks. Pages include noindex/nofollow and robots exclusion.

Native `<dialog>` supplies keyboard focus containment, Escape dismissal and focus restoration. Controls have labels, keyboard focus indicators and semantic landmarks. Both reduced motion and OS color scheme are supported. Every visible page shows a demo banner and pricing disclaimers. The confirmation explicitly states that no order was placed.

## Image credits and rights

Photographs are representative and do not establish cultivar, packaging or origin. Image files were resized/compressed; CSS crops them for display. Wikimedia image derivatives remain under their respective share-alike licenses. Credits and links are also visible in the storefront footer.

- Olive oil: https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5 — [Unsplash License](https://unsplash.com/license).
- Dates: Shaharbano, [Mazafati-Dates.jpg](https://commons.wikimedia.org/wiki/File:Mazafati-Dates.jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Representative dates photo, not a claim that the pictured cultivar is Ajwa.
- Sage: Andrew Smith, [Sage Leaves (4135067049).jpg](https://commons.wikimedia.org/wiki/File:Sage_Leaves_(4135067049).jpg), [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).
- Pickles: Raimond Spekking, [Mixed Pickles (9370-72).jpg](https://commons.wikimedia.org/wiki/File:Mixed_Pickles_(9370-72).jpg), [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).

## Verification

`npm test` covers price calculation and rejecting invalid saved cart data. Playwright runs the browsing → configurable product → persistent cart → validation → simulated checkout flow across 8 combinations of Arabic/English, 390/1440-pixel viewport and light/dark. It checks language/product preservation, single-option selector omission, local assets, JavaScript errors, overflow and no personal data in storage. Tests use the production build and the real GitHub Pages base path.
