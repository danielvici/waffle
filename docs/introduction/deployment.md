<!-- # Deployment

TODO

## Docker

The image is hosted on the GitHub Container Registry.

### Docker Compose

::: code-group
```yaml [docker-compose.yml]
services:
  waffle:
    image: ghcr.io/danielvici/waffle
    restart: unless-stopped
    container_name: Waffle
    ports:
      - '3000:3000'
    volumes:
      - ./config.yml:/app/data/config.yml # <path to your config>:<docker-path> (don't change the Docker path)
```
:::

### Docker run
```shell
docker run --name waffle -p 3000:3000 -v ./config.yml:/app/data/config.yml ghcr.io/danielvici/waffle:latest

```

### Build Locally

1. Clone the repo
```bash
git clone https://github.com/danielvici/waffle
cd waffle/
````
2. Prepare Config
```bash
touch ./config.yml # don't forget to fill it with data!
````
3. Build the image
```bash
docker build -t waffle-app .
```
4. Run container
```bash
docker run -d \
  -p 3000:3000 \
  -v $(pwd)/config.yml:/app/data/config.yml \
  waffle-app
```

### Docker volumes

All possible paths to the container. It is mandatory to specify the `config.yml` config file, everything else can be left by default.

| Path                   | Type   | Description                                            |
|------------------------|--------|--------------------------------------------------------|
| `/app/data/config.yml` | File   | App configuration - [more](../reference/configuration) |
| `/app/public/icons`    | Folder | Local icons - [more](../reference/icons)               |
| `/app/public/favicons` | Folder | Favicon icons - [more](../reference/favicons)          |

-->
