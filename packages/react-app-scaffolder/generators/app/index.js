const Generator = require('yeoman-generator')
const { promisify } = require('util')
const process = require('process')
const exec = promisify(require('child_process').exec)
const spawn = require('child_process').spawn
const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')
const mergePackageJson = require('merge-package-json')
const yosay = require('yosay')

module.exports = class extends Generator {
  _installAndExport() {
    return new Promise(async (resolve, reject) => {
      const { isFoundation } = this.answers

      this.log(yosay('Installing dependencies... this may take a minute!'))

      if (!isFoundation) {
        await exec(`yarn`)
      }

      const prettierConfigPath = path.resolve(__dirname, '././../../../.prettierrc.js')
      await exec(`yarn prettier --write ./package.json`)
      await exec(`yarn prettier '**/*.ts' '**/*.tsx' --write`)
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

  _mergePackageJson(additionalPackages) {
    const current = this.destinationPath(`./package.json`)
    const dst = fs.readFileSync(current)
    const src = fs.readFileSync(this.templatePath(additionalPackages))

    const output = mergePackageJson(dst, src)
    fs.writeFileSync(current, output)
  }

  _addWebpack() {
    const { sass, name, isFoundation } = this.answers

    if (isFoundation) {
      return
    }

    if (sass) {
      this.fs.copy(this.templatePath('sass/_webpack-dev.sass.js'), this.destinationPath('./src/scripts/webpack-dev.js'))
      this.fs.copy(
        this.templatePath('sass/_webpack-prod.sass.js'),
        this.destinationPath('./src/scripts/webpack-prod.js'),
      )
    } else {
      this.fs.copy(this.templatePath('_webpack-dev.js'), this.destinationPath('./src/scripts/webpack-dev.js'))
      this.fs.copy(this.templatePath('_webpack-prod.js'), this.destinationPath('./src/scripts/webpack-prod.js'))
    }
  }

  _addSass() {
    const { sass, name, isFoundation } = this.answers

    if (!sass) {
      return
    }

    if (!isFoundation) {
      this._mergePackageJson('sass/_package.sass.json')
    }

    this.fs.copy(
      this.templatePath('sass/_purgecss-loader.js'),
      this.destinationPath(`./src/scripts/purgecss-loader.js`),
    )
    this.fs.copy(
      this.templatePath('sass/_purgecss-loader.js'),
      this.destinationPath(`./src/scripts/purgecss-loader.js`),
    )
  }

  _addStyleSolution() {
    const { styledComponents, name, isFoundation } = this.answers

    if (styledComponents) {
      if (!isFoundation) {
        this._mergePackageJson('styled-components/_package.styled-components.json')
      }

      this.fs.copy(this.templatePath('styled-components/**/src/**/*'), this.destinationPath())
    }

    /**
     * Copy base styles
     */
    if (!styledComponents) {
      this.fs.copy(this.templatePath('./css'), this.destinationPath())
    }

    /**
     * interpolate by styling solution
     * pages that need a different styled-components version
     */
    ;['login'].forEach(page => {
      /**
       * Delete the file to be interpolated
       * Else we will get a conflict message which is annoying
       */
      this.fs.delete(this.destinationPath(`/src/components/pages/${page}.tsx`))

      this.fs.copyTpl(
        this.templatePath(`${this.projectTypePath}/src/components/pages/${page}.tsx`),
        this.destinationPath(`./src/components/pages/${page}.tsx`),
        { styledComponents, name },
      )
    })
  }

  _addAzure() {
    const { name, azure } = this.answers
    if (azure) {
      this.fs.copy(this.templatePath('azure/_azure-pipelines.yml'), this.destinationPath(`./azure-pipelines.yml`))
    }
  }

  constructor(args, opts) {
    super(args, opts)
    this.log(yosay('Welcome to Reapit App Scaffolder!'))
  }

  async writeBaseFiles() {
    return new Promise((resolve, reject) => {
      const { name, repo, description, author, isFoundation, styledComponents } = this.answers
      const { redux, graphql } = this
      const configFiles = ['jest.config.js']

      /**
       * settings destination path
       * for non isFoundation: it will be the folder where the scaffolder is executed
       * for isFoundation: we have to deter
       */

      this.fs.copyTpl(this.templatePath('_README.md'), this.destinationPath('./README.md'), {
        name,
      })

      if (!isFoundation) {
        this.fs.copyTpl(this.templatePath('_package.base.json'), this.destinationPath('./package.json'), {
          name,
          repo,
          description,
          author,
        })
      } else {
        this.fs.copyTpl(this.templatePath('_package.base.isFoundation.json'), this.destinationPath('./package.json'), {
          name,
          repo,
          description,
          author,
        })
      }

      this.fs.copyTpl(this.templatePath('_index.html'), this.destinationPath('./public/index.html'), {
        name,
      })

      this.fs.copyTpl(this.templatePath('_tsconfig.json'), this.destinationPath('./tsconfig.json'))

      configFiles.forEach(item => {
        this.fs.copy(this.templatePath(`${this.projectTypePath}/${item}`), this.destinationPath(`./${item}`))
      })

      this.fs.copyTpl(this.templatePath('./base'), this.destinationPath('./'), {
        name,
      })

      if (isFoundation) {
        // Any any additional base files specialized for non-foundation project will need to uncomment this like
        // Select recursively dot files
        // glob isn't really smart at the moment. In the future, when need to add non dot files, uncomment this
        // this.fs.copy(this.templatePath('./base-is-foundation/**/.*'), this.destinationPath('./'))
        // this.fs.copy(this.templatePath('./base-is-foundation/**/*'), this.destinationPath('./'))
      } else {
        this.fs.copy(this.templatePath('./base-is-not-foundation/**/.*'), this.destinationPath('./'))
        this.fs.copy(this.templatePath('./base-is-not-foundation/**/*'), this.destinationPath('./'))
      }

      this.log({
        name,
        redux,
        graphql,
        styledComponents,
      })
      this.fs.copyTpl(this.templatePath(this.projectTypePath), this.destinationPath('./'), {
        name,
        redux,
        graphql,
        styledComponents,
      })

      this.fs.copyTpl(this.templatePath('./index.tsx'), this.destinationPath('./src/core/index.tsx'), {
        redux,
        graphql,
        styledComponents,
      })

      this.fs.commit([], () => {
        this._addWebpack()
        this._addStyleSolution()
        this._addSass()
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
        type: 'confirm',
        name: 'isFoundation',
        message: 'Is this project for internal use (mono-repo)',
        default: true,
      },
      {
        type: 'confirm',
        name: 'styledComponents',
        message: 'Would you like Styled Components?',
      },
      {
        type: 'confirm',
        name: 'sass',
        message: 'Would you like Sass/CSS?',
      },
      {
        type: 'list',
        name: 'stateManagementStyle',
        message: 'Pick project type',
        choices: ['Redux', 'No Redux', 'Apollo GraphQL'],
      },
      {
        type: 'confirm',
        name: 'azure',
        message: 'Would you like an Azure Pipeline?',
        default: false,
      },
      {
        type: 'confirm',
        name: 'githubPush',
        message: 'Would you like your app immediately pushed to Github remote?',
        default: false,
      },
    ])

    const { stateManagementStyle } = this.answers
    if (stateManagementStyle === 'Redux') {
      this.projectTypePath = 'redux'
      this.redux = true
    }

    if (stateManagementStyle === 'No Redux') {
      this.projectTypePath = 'no-redux'
    }

    if (stateManagementStyle === 'Apollo GraphQL') {
      this.projectTypePath = 'apollo'
      this.graphql = true
    }

    /**
     * Destination path
     * isFoundation ->./package/{appName}
     * else current path
     */
    if (true) {
      this.packagePath = path.resolve(__dirname, `../../../${this.answers.name}`)
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
