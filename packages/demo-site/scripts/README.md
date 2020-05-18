# development
To start development, executing `yarn start-dev `, it will run script `start-dev.js (serve:demo-site)` located in `demos-site/script` folder. This script will:
- Start development server using `live-server`. It will reload the browser automatically when ever the content of public folder changes
- Start a watcher using `chokidar`. It will rebuild ejs to html to `public folder` with `CDN`=`http://localhost:5000` (address serving demo-site svelte component output assets) whenever the content of ejs files located on `script/tpls` folder. The HTML files will load JS files generated from `serve:web-components` command

And `serve:web-components` which is an alias for run `yarn start:dev demo-site` on `/packages/web-components/src/scripts/`. It will watch and buid required js for `demo-site` using `rollup` in `/packages/web-components/public/dist/`, and serve them using `sirv`. For me information, Checkout file `/packages/demo-site/scripts/start-dev`

# build:prod
To build production bundle. Run `yarn build:prod`. It will run script `build-prod.js` locationd in `demos-ite/script` folder. This script will: build ejs to html files in 'demo-site/public/dist' folder with `CDN_URL` setted to the one in `demo-site/config.json` file, and `NODE_ENV` = `undefined` which is production mode.
