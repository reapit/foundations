const fs = require('fs')
const { spawn, execSync } = require('child_process')
const path = require('path')

const templateFolder = path.resolve(__dirname, '../tpls/')

const buildScript = 'yarn cross-env NODE_ENV=DEV yarn build:prod'
const consolePrefix = '[demo-site]:'

fs.watch(templateFolder, () => {
  try {
    console.log(`${consolePrefix} changes detech. Proceed to rebuild html files from ejs file`)
    execSync(
      `
      ${buildScript}
    `,
      { stdio: 'inherit' },
    )
  } catch (err) {
    console.error(`${consolePrefix} error during executing script`)
    console.error(err)
    process.exit(1)
  }
})

// exec sync block event loop which is ^ thing
const spawnObject = spawn('yarn', ['live-server', './public/dist', '-p', '8080'], { stdio: 'inherit' })
spawnObject.on('error', err => {
  console.error(`${consolePrefix} error during executing live-reloading script`)
  console.error(err)
  process.exit(1)
})
