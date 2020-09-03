const yargs = require('yargs')
const { spawn } = require('child_process')
const { runCommand } = require('../../../scripts/release/utils')

const stage = yargs.argv.stage
const name = yargs.argv.name

/**
 * name: serverless file configuration
 * sentry project
 */
const listServerless = [
  {
    configName: 'search-widget',
    sentryProjectName: 'search-widget-server',
  },
  {
    configName: 'appointment-planner-component',
    sentryProjectName: 'appointment-planner-component-',
  },
]

const deployServerlessList = async () => {
  // This will run when run particular widget by yarn release:development --name <widget_name> in web-components folder
  if (name) {
    await runCommand('serverless', ['deploy', '--config', `src/${name}/server/serverless.yml`, '--stage', stage])
    return
  }

  listServerless.forEach(({ configName, sentryProjectName }) => {
    var env = Object.create(process.env)
    env.SENTRY_PROJECT = sentryProjectName

    const deploy = spawn(
      'serverless',
      ['deploy', '--config', `src/${configName}/server/serverless.yml`, '--stage', stage],
      { env },
    )

    deploy.stderr.on('data', function(data) {
      console.error('stderr: ' + data.toString())
    })

    deploy.on('exit', function(code) {
      console.info(`Deploying ${name} exited with code ${code.toString()}`)
    })

    deploy.on('exit', function(code) {
      console.info(`Deploying ${configName} exited with code ${code.toString()}`)
    })

    deploy.on('error', function(err) {
      console.error(`An error happened \n${err}`)
      process.exit(1)
    })
  })
}

deployServerlessList()
