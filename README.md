<div align="center" style="text-align: center;">

# Waffle

<img src="./waffle_logo_round.svg" alt="Waffle Logo" width="150">

</div>

---

**All your self-hosted apps on one plate. Tasty as you love it. A dashboard that just works.**

Note: It's a fork of [Hywax's Mafl](https://github.com/hywax/mafl). Due to inactivity, the project seems unmaintained, so I decided to continue developing it on my own. I hope you like it!

## Table of Contents

- [Installation](#installation)
- [Credits & License](#credits--license)

## Installation

```YAML
services:
  waffle:
    image: ghcr.io/danielvici/waffle
    restart: unless-stopped
    container_name: Waffle
    ports:
      - "3000:3000"
    volumes:
      - ./config.yml:/app/data/config.yml
      # - /icons:/app/public/icons # Uncomment if you want to use your own icons.
      # - /favicons:/app/public/favicons # See Favicons for more information
```

> [!NOTE] 
> You can find a more detailed introduction in the [Docs]()


## Credits & License

Waffle is based on [Mafl](https://github.com/hywax/mafl) by [Hywax](https://github.com/hywax)

Licensed under MIT