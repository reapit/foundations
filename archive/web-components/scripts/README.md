# Build configurations
Svelete component's build configurations will reside on './script' folder. 
Build configuration (BC) will export default the required configurations to run on DEV, PROD based on `process.env.ROLLUP_WATCH`
BC may export named `baseConfigurationWithoutTheme`: this is the base configuration. It's used to be chained with other configurations. For example take a look of `rollup.config.demo-site.js`. It will contain configurations to build required components of demo-site

# development
To start development, executing `yarn start-dev {package-name}`, it will run script `start-dev.js` located in `/script` folder:
- Command `clientScript` runs roll-up in watch mode with configuration export default by package's rollup configuration file: this will only build development file
- Command `startClientServer` runs `sirv`, and development files buit using `clientScript`
- Command `serverScript`  runs serverless with development mode

After executing start develop command, you have to put the token printed in the terminal to the public html files which are `public/index.html` and `public/detail.html` in order to make the local APIs work correctly
![](https://user-images.githubusercontent.com/36730355/84357524-00ac1600-abf0-11ea-8c00-296b3b9e62fc.png)

# build:prod
To build production bundle. Run `yarn build:prod`. It will run script `build-prod.js` locationd in `/script` folder. This script will:
- Clear `public` folder
- Build all packages determined by variable `packages` using rollup
- Build ejs templates located in `tpls` folder, and minify them using `terser`. Those templates are: index file re-export cjs, esm, TypeScript declaration
All build script will run parallelly using `Promise.all`


