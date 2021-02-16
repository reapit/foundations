const { spawn, execSync } = require('child_process')
const chokidar = require('chokidar')
const path = require('path')

const templateFolder = path.resolve(__dirname, '../tpls/')

const buildScript = 'yarn cross-env NODE_ENV=DEV yarn build:prod'
const consolePrefix = '[demo-site]:'

chokidar
  .watch(templateFolder)
  .on('all', (event, path) => {
    try {
      console.log(`${consolePrefix} changes detech.`)
      console.log({ event, path })
      console.log('Proceed to rebuild html files from ejs file')

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
  .on('error', err => {
    console.error(`${consolePrefix} Error happen during watch ejs files`)
    console.error(err)
    process.exit(1)
  })

// exec sync block event loop which is ^ thing
const spawnObject = spawn('yarn', ['live-server', './public/dist', '-p', '8080'], { stdio: 'inherit' })
spawnObject.on('error', err => {
  console.error(`${consolePrefix} error during executing live-reloading script`)
  console.error(err)
  process.exit(1)
})
