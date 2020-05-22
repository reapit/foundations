const yargs = require('yargs')
const { spawn } = require('child_process')

const stage = yargs.argv.stage

// relative to the root of web-components package
const listServerlessYmlFiles = ['src/search-widget/server/serverless.yml']

const buildServerlessList = () => {
  listServerlessYmlFiles.forEach(file => {
    const build = spawn('serverless', ['webpack', '--config', file, '--out', 'dist', '--stage', stage])
    build.stdout.on('data', function(data) {
      console.info('stdout: ' + data.toString())
    })

    build.stderr.on('data', function(data) {
      console.error('stderr: ' + data.toString())
    })

    build.on('exit', function(code) {
      console.info(`Building ${file} exited with code ${code.toString()}`)
    })

    build.on('error', function(err) {
      console.error(`An error happened \n${err}`)
      process.exit(1)
    })
  })
}

buildServerlessList()
