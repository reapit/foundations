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
          Compiling your app now - server shortly available at http://localhost:3000
        `),
      )

      spawn('yarn', ['start:dev'], { maxBuffer: 1024 * 2048 })
        .stdout.on('data', (data) => this.log(data.toString()))
        .on('error', (err) => {
          this.log(err)
          reject(err)
        })
    })
  }

  constructor(args, opts) {
    super(args, opts)
    this.log(yosay('Welcome to Reapit Node App Scaffolder!'))
  }

  async writeBaseFiles() {
    return new Promise((resolve, reject) => {
      const { name, type } = this.answers
      let files = {}
      let templatePath

      if (type === 'nestjs') {
        files = {
          '_README.md': 'README.md',
          '_config.json': 'config.json',
          '_package.json': 'package.json',
          '_.eslintrc.js': '.eslintrc.js',
        }
        templatePath = 'nestjs'
        yosay("Nestjs setup may require some refactoring for AWS + CDK setup")
      } else {
        files = {
          '_README.md': 'README.md',
          '_config.json': 'config.json',
          '_package.json': 'package.json',
          '_.eslintrc.js': '.eslintrc.js',
          '_nest-cli.json': '.nest-cli.json',
        }
        templatePath = 'express'
      }

      Object.keys(files).forEach(file => this.fs.copyTpl(
          this.templatePath(path.join(templatePath, file)),
          this.destinationPath(`./${files[file]}`),
          {
            ...this.answers,
          },
        )
      )

      this.fs.copyTpl(this.templatePath(this.projectPath), this.destinationPath('./'), {
        ...this.answers,
      })

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
        message: 'Enter your Node app name (kebab-case)',
        default: 'app-name',
      },
      {
        type: 'list',
        name: 'type',
        message: 'Select application type',
        choices: [
          'nestjs',
          'express',
        ],
        default: 'nestjs',
      },
    ])

    this.projectPath = this.answers.type === 'nestjs' ? './nestjs' : './express'
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
