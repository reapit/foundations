#!/usr/bin/env node
return (() => {
  const { execSync } = require('child_process')
  const [, , ...args] = process.argv

  if (args.length === 1 && args[0]) {
    try {
      const packageName = args[0]
      const clearPublic = 'rimraf ./public/dist'
      const moveHtml = `cp ./src/${packageName}/client/index.html ./public`
      const clientScript = `rollup -w -c './src/scripts/rollup.config.${packageName}.js' --environment APP_ENV:local`
      const serverScript = 'serverless offline --out public/dist --stage local'
      const startClientServer = 'sirv public --dev --port 8080'
      const startDev = `
        ${clearPublic} &&
        ${moveHtml} &&
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
