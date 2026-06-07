<div align="center">

<img src="./waffle_logo_round.svg" alt="Waffle Logo" width="150">

# Waffle

**All your self-hosted apps on one plate. Tasty as you love it. A dashboard that just works.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Docs](https://img.shields.io/badge/docs-available-brightgreen.svg)](https://danielvici.github.io/waffle/)

</div>

---

Waffle is a lightweight, clean dashboard for your homelab. It is a community-maintained fork of [Hywax's Mafl](https://github.com/hywax/mafl), created to keep development active and bring new features to the table.

## Quicklinks

* **[Documentation](https://danielvici.github.io/waffle/)**
* **[Getting Started](https://danielvici.github.io/waffle/introduction/getting-started.html)**
* **[What is Waffle?](https://danielvici.github.io/waffle/introduction/what-is.html)**
* **[Contact (@danielvici)](https://x.com/danielvici)**

## Installation

Easiest way to serve Waffle is via Docker Compose:

```yaml
services:
  waffle:
    image: ghcr.io/danielvici/waffle
    restart: unless-stopped
    container_name: Waffle
    ports:
      - "3000:3000"
    volumes:
      - ./config.yml:/app/data/config.yml
      # - ./icons:/app/public/icons # Uncomment for custom icons
      # - ./favicons:/app/public/favicons # See docs for favicons
```

> [!NOTE]
> Check full setup guide in the [Docs](https://danielvici.github.io/waffle/introduction/getting-started.html).

# Credits & License

Waffle is based on [Mafl](https://github.com/hywax/mafl) by [Hywax](https://github.com/hywax)

Licensed under MIT