const yargs = require('yargs')
const { spawn } = require('child_process')

const stage = yargs.argv.stage

// relative to the root of web-components package
const listServerlessYmlFiles = ['src/search-widget/server/serverless.yml']

const deployServerlessList = () => {
  listServerlessYmlFiles.forEach(file => {
    const deploy = spawn('serverless', ['deploy', '--config', file, '--stage', stage])
    deploy.stdout.on('data', function(data) {
      console.info('stdout: ' + data.toString())
    })

    deploy.stderr.on('data', function(data) {
      console.error('stderr: ' + data.toString())
    })

    deploy.on('exit', function(code) {
      console.info(`Deploying ${file} exited with code ${code.toString()}`)
    })

    deploy.on('error', function(err) {
      console.error(`An error happened \n${err}`)
      process.exit(1)
    })
  })
}

deployServerlessList()
