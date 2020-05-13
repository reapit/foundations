#!/usr/bin/env node
const getMoveHtmlScript = packageName => {
  switch (packageName) {
    case 'property-detail':
      return 'mkdir -p ./public && cp ./src/property-detail/client/detail.html ./public/index.html'
    case 'search-widget':
      // eslint-disable-next-line max-len
      return 'mkdir -p ./public && cp ./src/search-widget/client/index.html ./public/ && cp ./src/property-detail/client/detail.html ./public/'

    default:
      return `mkdir -p ./public && cp ./src/${packageName}/client/index.html ./public/`
  }
}

return (() => {
  const { execSync } = require('child_process')
  const [, , ...args] = process.argv

  if (args.length === 1 && args[0]) {
    try {
      const packageName = args[0]
      const clearPublic = 'rimraf ./public/dist && rimraf ./public/themes'
      const moveHtml = getMoveHtmlScript(packageName)
      // eslint-disable-next-line max-len
      const moveTheme = 'mkdir -p ./public/themes && cp ./src/common/styles/__themes__/themes.js ./public/themes'
      const clientScript = `rollup -w -c './src/scripts/rollup.config.${packageName}.js' --environment APP_ENV:local`
      const serverScript = 'serverless offline --out public/dist --stage local'
      const startClientServer = 'sirv public --dev -s --port 8080'
      const startDev = `
        ${clearPublic} &&
        ${moveHtml} &&
        ${moveTheme} &&
        concurrently "${startClientServer}" "${clientScript}" "${serverScript}"
      `
      const opts = {
        stdio: 'inherit',
      }
      execSync(startDev, opts)
    } catch (err) {
      console.error('Error in dev server', err)
      process.exit(1)
    }
  }

  console.error('You need to specify the package name as an arg to yarn start:dev')
  process.exit(1)
})()
