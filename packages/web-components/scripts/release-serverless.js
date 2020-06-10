const yargs = require('yargs')
const { spawn } = require('child_process')

const stage = yargs.argv.stage
const name = yargs.argv.name

// name of web-components package
const listServerless = ['search-widget', 'appointment-planner-component']

const deployServerlessList = () => {
  // This will run when run particular widget by yarn release:development --name <widget_name> in web-components folder
  if (name) {
    const deploy = spawn('serverless', ['deploy', '--config', `src/${name}/server/serverless.yml`, '--stage', stage])
    deploy.stdout.on('data', function(data) {
      console.info('stdout: ' + data.toString())
    })

    deploy.stderr.on('data', function(data) {
      console.error('stderr: ' + data.toString())
    })

    deploy.on('exit', function(code) {
      console.info(`Deploying ${name} exited with code ${code.toString()}`)
    })

    deploy.on('error', function(err) {
      console.error(`An error happened \n${err}`)
      process.exit(1)
    })
    return
  }

  listServerless.forEach(name => {
    const deploy = spawn('serverless', ['deploy', '--config', `src/${name}/server/serverless.yml`, '--stage', stage])
    deploy.stdout.on('data', function(data) {
      console.info('stdout: ' + data.toString())
    })

    deploy.stderr.on('data', function(data) {
      console.error('stderr: ' + data.toString())
    })

    deploy.on('exit', function(code) {
      console.info(`Deploying ${name} exited with code ${code.toString()}`)
    })

    deploy.on('error', function(err) {
      console.error(`An error happened \n${err}`)
      process.exit(1)
    })
  })
}

deployServerlessList()
