const Generator = require('yeoman-generator')
const { promisify } = require('util')
const process = require('process')
const exec = promisify(require('child_process').exec)
const spawn = require('cross-spawn')
const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')
const yosay = require('yosay')
const { constantCase } = require('change-case')

module.exports = class extends Generator {
  _installAndExport() {
    return new Promise(async (resolve, reject) => {
      const { isFoundation } = this.answers

      this.log(yosay('Installing dependencies... this may take a minute!'))

      if (!isFoundation) {
        await exec(`yarn`)
      }

      const prettierConfigPath = path.resolve(__dirname, '../../../.prettierrc.js')
      await exec(`yarn prettier --write ./package.json`)
      await exec(`yarn prettier "**/*.ts" "**/*.tsx" --write`)
      this.log(yosay('App installed successfully!'))

      this._pushToGithub()

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

  async _pushToGithub() {
    const { repo, githubPush, name } = this.answers
    if (repo && githubPush) {
      this.log(yosay('Pushing your app to Github...'))

      await exec(`git init`)
      await exec(`git remote add origin ${repo}`)

      await exec(`git add . && git commit -m "Project . - Initial commit" && git push origin master`)

      this.log(yosay('Successfully pushed app to Github!'))
    }
    return true
  }

  _addPackageJson() {
    const { isFoundation, name, author, repo, description } = this.answers

    if (isFoundation) {
      return
    }

    if (this.redux) {
      this.fs.copyTpl(this.templatePath('./is-foundation-redux/**/*'), this.destinationPath('./'), {
        name, author, repo, description
      })
    }

    if (!this.redux) {
      this.fs.copyTpl(this.templatePath('./is-foundation-no-redux/**/*'), this.destinationPath('./'), {
        name, author, repo, description
      })
    }
  }

  _addPackageJson() {
    const { isFoundation, name, author, repo, description } = this.answers

    if (isFoundation) {
      return
    }

    if (this.redux) {
      this.fs.copyTpl(this.templatePath('./is-foundation-redux/**/*'), this.destinationPath('./'), {
        name, author, repo, description
      })
    }

    if (!this.redux) {
      this.fs.copyTpl(this.templatePath('./is-foundation-no-redux/**/*'), this.destinationPath('./'), {
        name, author, repo, description
      })
    }
  }


  _addAzure() {
    const { name, azure } = this.answers
    if (azure) {
      this.fs.copy(this.templatePath('redu'), this.destinationPath(`./azure-pipelines.yml`))
    }
  }

  _addStyleSolution() {
    const { sass, name, isFoundation } = this.answers


    if (sass) {
      this.fs.copyTpl(this.templatePath('./base-is-sass/**/*'), this.destinationPath('./'), { isFoundation })
    } else {
      this.fs.copyTpl(this.templatePath('./base-is-linaria/**/*'), this.destinationPath('./'), { isFoundation })
    }
  }

  constructor(args, opts) {
    super(args, opts)
    this.log(yosay('Welcome to Reapit App Scaffolder!'))
  }

  async writeBaseFiles() {
    return new Promise((resolve, reject) => {
      const { name, repo, description, author, isFoundation, stylesSolution, clientId } = this.answers
      const { redux, graphql } = this

      /**
       * settings destination path
       * for non isFoundation: it will be the folder where the scaffolder is executed
       * for isFoundation: we have to deter
       */

      this.fs.copyTpl(this.templatePath('_README.md'), this.destinationPath('./README.md'), {
        name,
      })

      this.fs.copyTpl(this.templatePath('_gitignore'), this.destinationPath('./.gitignore'), {
        name,
      })

      this.fs.copyTpl(this.templatePath('_eslintrc.js'), this.destinationPath('./.eslintrc.js'), {
        name,
      })

      this.fs.copyTpl(this.templatePath('_prettierrc.js'), this.destinationPath('./.prettierrc.js'), {
        name,
      })

      this.fs.copyTpl(this.templatePath('_config.json'), this.destinationPath('./config.json'), {
        clientId,
      })

      this.fs.copyTpl(this.templatePath('_config.example.json'), this.destinationPath('./config.example.json'), {
        clientId,
      })

      this.fs.copyTpl(this.templatePath('./base'), this.destinationPath('./'), {
        name,
        nameInConstantCase: constantCase(name),
        redux,
        graphql,
        stylesSolution,
        isFoundation
      })

      if (isFoundation) {
        // Any any additional base files specialized for non-foundation project will need to uncomment this like
        // Select recursively dot files
        // glob isn't really smart at the moment. In the future, when need to add non dot files, uncomment this
        // this.fs.copyTpl(this.templatePath('./base-is-foundation/**/.*'), this.destinationPath('./'), {
        //   name,
        //   repo,
        //   description,
        //   author,
        // })
        this.fs.copyTpl(this.templatePath('./base-is-foundation/*'), this.destinationPath('./'), {
          name,
          repo,
          description,
          author,
        })
      } else {
        this.fs.copyTpl(this.templatePath('./base-is-not-foundation/**/*'), this.destinationPath('./'), {
          name,
          nameInConstantCase: constantCase(name),
          repo,
          description,
          author,
          clientId,
        })
      }

      this.fs.copyTpl(this.templatePath(this.projectTypePath), this.destinationPath('./'), {
        name,
        nameInConstantCase: constantCase(name),
        redux,
        graphql,
        stylesSolution,
        graphql,
        stylesSolution,
      })

      this.fs.commit([], () => {
        this._addStyleSolution(),
          this._addPackageJson(),
          this._addAzure()
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
        name: 'repo',
        message: 'Enter the GitHub repo for your project',
        default: 'git@github.com:reapit/app-name.git',
      },
      {
        type: 'input',
        name: 'description',
        message: 'Enter a description for the project',
        default: 'Description',
      },
      {
        type: 'input',
        name: 'author',
        message: 'Enter the author of the project',
        default: 'Author',
      },
      {
        type: 'input',
        name: 'clientId',
        message: 'Enter the client id for your app (you will need to submit a template app to do this)',
        default: '',
      },
      {
        type: 'confirm',
        name: 'isFoundation',
        message: 'Is this project for internal use (mono-repo)',
        default: true,
      },
      {
        name: 'sass',
        message: 'Would you like to use Sass?',
        type: 'confirm',
        default: false,
      },
      {
        type: 'list',
        name: 'stateManagementStyle',
        message: 'Pick project type',
        choices: ['Redux', 'No Redux'],
      },
      {
        type: 'confirm',
        name: 'githubPush',
        message: 'Would you like your app immediately pushed to Github remote?',
        default: false,
      },
    ])

    const { stateManagementStyle, stylesSolution } = this.answers
    if (stateManagementStyle === 'Redux') {
      this.projectTypePath = 'redux'
      this.redux = true
    }

    if (stateManagementStyle === 'No Redux') {
      this.projectTypePath = 'no-redux'
      this.redux = false
    }

    if (stateManagementStyle === 'Apollo GraphQL') {
      this.projectTypePath = 'apollo'
      this.graphql = true
    }

    if (stylesSolution === 'Styled Components') {
      this.answers.stylesSolution = 'styledComponents'
    }

    if (stylesSolution === 'Sass/CSS') {
      this.answers.stylesSolution = 'sass'
    }

    /**
     * Destination path
     * isFoundation ->./package/{appName}
     * else current path
     */
    if (this.answers.isFoundation) {
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
}
