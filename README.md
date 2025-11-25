# Rick and Morty SPA

Single Page Application that consumes the public [Rick and Morty API](https://rickandmortyapi.com/) and showcases characters with search, filters, pagination, and responsive layouts. The project is entirely built with vanilla JavaScript, Webpack, and Babel.

## Features
- Character listing with status/species/gender filtering and live search
- Pagination with loading placeholders and error page fallbacks
- Responsive layout and modular styles
- Hash-based routing for Home, Character detail, and Error views

## Tech Stack
- JavaScript (ES6+)
- Webpack 5 + Babel
- HTML/CSS (SASS-friendly structure)
- Travis CI + GitHub Pages for automated deployments

## Requirements
- Node.js 12.x (matches the current Travis configuration)
- npm or yarn installed locally

## Getting Started
```bash
# install dependencies
npm install

# start local dev server
npm start

# build for production (outputs to dist/)
npm run build
```

## Deployment

### Automated CI (recommended)
This repository already ships with a `.travis.yml` file that builds the app and publishes the `dist/` folder to the `gh-pages` branch.

1. Enable Travis CI for this repository.
2. Generate a classic GitHub Personal Access Token with `repo` scope and add it to the Travis project settings as `GITHUB_TOKEN`.
3. Push to `main`. Travis will run `yarn build` (compatible with the existing `package-lock.json`) and deploy the bundled files to GitHub Pages using the token above.
4. In GitHub repository settings, point Pages to the `gh-pages` branch (root directory).

### Manual fallback
If you need to deploy manually, run `npm run build`, then push the contents of `dist/` to the `gh-pages` branch. An example flow:

```bash
npm run build
git subtree push --prefix dist origin gh-pages
```

> Note: Manual deploys should only be used when CI is unavailable; otherwise they can overwrite the history managed by Travis.

## Troubleshooting
- **OpenSSL errors on modern Node versions**: The project targets Node 12. If you must use Node 18+, start commands with `NODE_OPTIONS=--openssl-legacy-provider`.
- **Travis build fails because yarn is missing**: Install yarn locally (`npm install -g yarn`) or update `.travis.yml` to use `npm` instead.

## License
This project is released under the MIT License. See `LICENSE` for details.
