<h1 align="center">map.ustp.party</h1>
<h3 align="center" ><a href="https://map.ustp.party"><div align="center">map.ustp.party</div> <img src="/static/ustp.map.party-64x64.png" width="24px" ></a></h3>

## Tech Stack

- Frontend: [Svelte](https://svelte.dev/) with Github Pages
- Backend: None
- Development: [Node.js](https://github.com/nvm-sh/nvm) and [npm](https://www.npmjs.com/)

### Libraries

- [Leaflet.js](https://leafletjs.com/) for mapping and tiling. Special thanks to the [OpenStreetMap](https://www.openstreetmap.org/) community and [Carto](https://carto.com/).
- [Fuse.js](https://www.fusejs.io/) for the fuzzy search engine.

## Developing

Install dependencies with `npm install` (or `pnpm install` or `yarn`), then start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version to test how it might look on production.

1. Build and compile the app.

```bash
npm run build
```

2. Serve the app locally.

```bash
npm run preview
```
