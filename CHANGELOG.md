# Changelog

## v0.4.2

### Bug Fixes

- **update**: Use runtime config for version and correct release URL

[compare changes](https://github.com/danielvici/waffle/compare/v0.4.1...v0.4.2)

## v0.4.1

### Bug Fixes

- **server**: add background images server route to explicitly serve background images from `public/backgrounds` and fix 404 errors in docker environment

## v0.4.0

### Enhancements

- **Custom Background:** Add a custom background image.

### Chore

- **version:** Bump version to 0.4.0

## v0.3.0

### Enhancements

- **service:** Add date-and-time service widget with configurable timezone, format, and update interval ([176b1d6](https://github.com/danielvici/waffle/commit/176b1d6))

### Bug Fixes

- **theme:** Fix critical hydration race condition preventing the `light` theme from loading correctly.
- **theme:** Disable Tailwind's built-in sepia filter to prevent washed-out colors on custom themes.
- **config:** Improve live reload robustness by using filesystem polling and cleaning up WebSocket leaks.

### Chore

- **version:** Bump version to 0.3.0 ([413e2c4](https://github.com/danielvici/waffle/commit/413e2c4))
- **update-check:** Point update checker to `danielvici/waffle` repository

---

## v0.2.3

### What's Changed
* fix: icon serving from icons directory by @danielvici in https://github.com/danielvici/waffle/pull/5

**Full Changelog**: https://github.com/danielvici/waffle/compare/v0.2.2...v0.2.3

---

## v0.2.2

### What's Changed
* chore: cleanup, branding and docs by @danielvici in https://github.com/danielvici/waffle/pull/4

**Full Changelog**: https://github.com/danielvici/waffle/compare/v0.2.1...v0.2.2

---

## v0.2.1

### What's Changed
* chore: finalize Waffle branding and documentation migration by @danielvici in https://github.com/danielvici/waffle/pull/2
* fix: Replace incorrect favicons by @danielvici in https://github.com/danielvici/waffle/pull/3

**Full Changelog**: https://github.com/danielvici/waffle/compare/v0.2.0...v0.2.1

---

## v0.2.0

[compare changes](https://github.com/danielvici/waffle/compare/v0.15.4...v0.2.0)

### 🚀 Enhancements

- **rebrand:** Project migrated and rebranded to **Waffle** 🧇
- **stack:** Migrated from Node/Yarn to **Bun** for better performance ⚡
- **docker:** Optimized Dockerfile using Bun alpine images
- **ci/cd:** Updated workflows to use Bun and push exclusively to GitHub Container Registry (GHCR)
- **status:** Allow separate status URL from service link ([4202c7a](https://github.com/danielvici/waffle/commit/4202c7a))

### 📖 Documentation

- **rebrand:** Updated all documentation to reflect Waffle branding
- **structure:** Reorganized docs (moved `guide` to `introduction`)
- **pages:** Set up GitHub Pages deployment via GitHub Actions
- **polish:** Fixed numerous typos and grammatical errors across all docs

### 🏡 Chore

- **cleanup:** Removed Russian (ru) translations to focus on English
- **cleanup:** Removed Husky and some old GitHub workflows
- **dependencies:** Updated all dependencies to latest versions compatible with Bun

### ❤️ Contributors

- danielvici123 ([@danielvici](http://github.com/danielvici))

---

## v0.15.4

[compare changes](https://github.com/hywax/mafl/compare/v0.15.3...v0.15.4)

### 🚀 Enhancements

- Gr-GR locale ([#122](https://github.com/hywax/mafl/pull/122))
- De-DE locale ([#124](https://github.com/hywax/mafl/pull/124))

### 📖 Documentation

- **showcase:** By @crueber ([#116](https://github.com/hywax/mafl/pull/116))
- **showcase:** Crueber image ([a55b9d7](https://github.com/hywax/mafl/commit/a55b9d7))
- German and greek locale ([a2a761d](https://github.com/hywax/mafl/commit/a2a761d))

### 🏡 Chore

- Update CONTRIBUTORS ([2fc0498](https://github.com/hywax/mafl/commit/2fc0498))

### ❤️ Contributors

- Hywax ([@hywax](http://github.com/hywax))
- Gehno ([@gehno](http://github.com/gehno))
- Stratos ([@sthivaios](http://github.com/sthivaios))
- Bot ([@hywax-assistant](http://github.com/hywax-assistant))

... rest of the changelog ...
