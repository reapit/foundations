#!/usr/bin/env node
const getMoveHtmlScript = packageName => {
  switch (packageName) {
    case 'property-detail':
      return 'mkdir -p ./public && cp ./src/property-detail/client/detail.html ./public/index.html'
    case 'search-widget':
      // eslint-disable-next-line max-len
      return 'mkdir -p ./public && cp ./src/search-widget/client/index.html ./public/ && cp ./src/property-detail/client/detail.html ./public/'
    case 'demo-site':
      return ''

    default:
      return `mkdir -p ./public && cp ./src/${packageName}/client/index.html ./public/`
  }
}

const getStartClientServer = packageName => {
  switch (packageName) {
    case 'demo-site':
      return 'sirv public/dist --dev -s --port 5000'

    default:
      return 'sirv public --dev -s --port 8080'
  }
}

return (() => {
  const { execSync } = require('child_process')
  const [, , ...args] = process.argv

  if (args.length === 1 && args[0]) {
    try {
      const packageName = args[0]
      const clearPublic = 'rimraf ./public'
      let moveHtml = getMoveHtmlScript(packageName)
      if (moveHtml) {
        moveHtml += ' &&'
      }
      // eslint-disable-next-line max-len
      const clientScript = `rollup -w -c './scripts/rollup.config.${packageName}.js' --environment APP_ENV:local`
      const serverScript = 'serverless offline --out public/dist --stage local'
      const startClientServer = getStartClientServer(packageName)

      const startDev = `
        ${clearPublic} &&
        ${moveHtml}
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
