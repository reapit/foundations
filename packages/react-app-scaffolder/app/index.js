const Generator = require('yeoman-generator')
const { promisify } = require('util')
const process = require('process')
const exec = promisify(require('child_process').exec)
const spawn = require('cross-spawn')
const path = require('path')
const fs = require('fs')
const yosay = require('yosay')

module.exports = class extends Generator {
  _installAndExport() {
    return new Promise(async (resolve, reject) => {
      this.log(yosay('Installing dependencies... this may take a minute!'))

      await exec(`yarn`)

      this.log(yosay('App installed successfully!'))

      this.log(
        yosay(`
          Compiling your app now - server shortly available at http://localhost:8080
        `),
      )

      spawn('yarn', ['start'], { maxBuffer: 1024 * 2048 })
        .stdout.on('data', (data) => this.log(data.toString()))
        .on('error', (err) => {
          this.log(err)
          reject(err)
        })
    })
  }

  constructor(args, opts) {
    super(args, opts)
    this.log(yosay('Welcome to Reapit App Scaffolder!'))
  }

  async writeBaseFiles() {
    return new Promise((resolve, reject) => {
      const { name, clientId, userPoolId } = this.answers

      this.fs.copyTpl(this.templatePath('./_config.json'), this.destinationPath('./config.json'), {
        clientId,
        userPoolId,
      })

      this.fs.copyTpl(this.templatePath('./_eslintrc.js'), this.destinationPath('./.eslintrc.js'))

      this.fs.copyTpl(this.templatePath('./_package.json'), this.destinationPath('./package.json'), {
        name,
      })

      this.fs.copyTpl(this.templatePath('_README.md'), this.destinationPath('./README.md'), {
        name,
      })

      this.fs.copyTpl(this.templatePath('_serverless.yml'), this.destinationPath('./serverless.yml'), {
        name,
      })

      this.fs.copyTpl(this.templatePath('_webpack.config.js'), this.destinationPath('./webpack.config.js'), {
        name,
      })

      this.fs.copyTpl(this.templatePath(this.projectPath), this.destinationPath('./'))

      this.fs.commit([], () => {
        this._installAndExport().then(resolve).catch(reject)
      })
    })
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Enter your React app name (kebab-case)',
        default: 'app-name',
      },
      {
        type: 'input',
        name: 'clientId',
        message: 'Enter the client id for your app',
        default: '',
      },
      {
        type: 'input',
        name: 'clientId',
        message: 'Enter the userpool for your app',
        default: 'userPoolId',
      },
    ])

    this.projectPath = './react-app'
    this.packagePath = path.resolve(__dirname, '../..', this.answers.name)
    /**
     * create directory if not
     */
    if (!fs.existsSync(this.packagePath)) {
      fs.mkdirSync(this.packagePath)
    }
    /**
     * change destination path, cwd to package path
     */
    process.chdir(this.packagePath)
    this.destinationRoot(this.packagePath)
  }
}
