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

      await exec(`npx prettier --write ./package.json`)

      this.log(yosay('App installed successfully!'))

      this.log(
        yosay(`
          Compiling your app now - server shortly available at http://localhost:8080
        `),
      )

      spawn('yarn', ['start:dev'], { maxBuffer: 1024 * 2048 })
        .stdout.on('data', data => this.log(data.toString()))
        .on('error', err => {
          this.log(err)
          reject(err)
        })
    })
  }

  _addPackageJson() {
    const { name, author, repo, description } = this.answers

    const local = require(this.templatePath('./_package.json'))
    const base = require(this.destinationPath('./package.json'))

    const merged = {
      ...local,
      ...base,
    }

    this.fs.delete(this.destinationPath('./package.json'))
    this.fs.commit([], () => {
      this.fs.write(this.destinationPath('./temp.package.json'), JSON.stringify(merged))
      this.fs.commit([], () => {
        this.fs.copyTpl(this.destinationPath('./temp.package.json'), this.destinationPath('./package.json'), {
          name,
          author,
          repo,
          description,
        })
        this.fs.delete(this.destinationPath('./temp.package.json'))
        this.fs.commit([], () => {})
      })
    })
  }

  constructor(args, opts) {
    super(args, opts)
    this.log(yosay('Welcome to Reapit App Scaffolder!'))
  }

  async writeBaseFiles() {
    return new Promise((resolve, reject) => {
      const { name, clientId } = this.answers

      this.fs.copyTpl(this.templatePath('./_config.json'), this.destinationPath('./config.json'), {
        clientId,
      })

      this.fs.copyTpl(this.templatePath('_README.md'), this.destinationPath('./README.md'), {
        name,
      })

      this.fs.copyTpl(this.templatePath(this.projectPath), this.destinationPath('./'))

      this.fs.commit([], () => {
        this._addPackageJson()

        this.fs.commit([], () => {
          this._installAndExport()
            .then(resolve)
            .catch(reject)
        })
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
        name: 'description',
        message: 'Enter a description for the project',
        default: 'Description',
      },
      {
        type: 'input',
        name: 'clientId',
        message: 'Enter the client id for your app (you will need to submit a template app to do this)',
        default: '',
      },
      {
        type: 'list',
        name: 'stateManagementStyle',
        message: 'How do you want to manage state?',
        choices: ['Redux', 'React Hooks & Context'],
      },
    ])

    const { stateManagementStyle } = this.answers
    if (stateManagementStyle === 'Redux') {
      this.projectPath = './redux'
    }

    if (stateManagementStyle === 'React Hooks & Context') {
      this.projectPath = './hooks'
    }
    /**
     * Destination path
     * isFoundations ->./package/{appName}
     * else current path/{appName}
     */

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
