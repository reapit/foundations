const Generator = require('yeoman-generator')
const { promisify } = require('util')
const process = require('process')
const exec = promisify(require('child_process').exec)
const {execSync} = require('child_process')
const path = require('path')
const fs = require('fs')
const mergePackageJson = require('merge-package-json')
const yosay = require('yosay')

module.exports = class extends Generator {
  _installAndExport() {
    this.fs.commit([], async () => {
      setTimeout(() => {
        this.log(yosay('Installing dependencies... this may take a minute!'))
      }, 100)

      await exec(`yarn`)
      await exec(`yarn prettier ./package.json --write`)

      this.log(yosay('App installed successfully!'))

      this._pushToGithub()

      this.log(
        yosay(`
        Compiling your app now - server shortly available at http://localhost:8080
        To run your app again in dev mode, exit this process and execute:
        yarn dev
      `),
      )

      await exec(`yarn dev`)
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
    const { sass, name } = this.answers
    if (sass) {
      this.fs.copy(
        this.templatePath('sass/_webpack-dev.sass.js'),
        this.destinationPath('./src/scripts/webpack-dev.js'),
      )
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

    if (isFoundation) {
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
    this.fs.copy(this.templatePath('sass/styles'), this.destinationPath('./src/styles'))
  }

  _addStyledComponents() {
    const { styledComponents, name, isFoundation } = this.answers
    if (!styledComponents) {
      return;
    }

    if (isFoundation) {
      this._mergePackageJson('styled-components/_package.styled-components.json')
    }

    // pages that need a different styled-components version
    ;['login'].forEach(page => {
        this.fs.copyTpl(
        this.templatePath(`styled-components/src/components/pages/${page}.tsx`),
        this.destinationPath(`./src/components/pages/${page}.tsx`),
        { name },
      )
      this.fs.copy(
        this.templatePath(`styled-components/src/components/pages/__styles__/${page}.ts`),
        this.destinationPath(`./src/components/pages/__styles__/${page}.ts`),
      )
      this.fs.copyTpl(
        this.templatePath(`styled-components/src/components/pages/__tests__/__snapshots__/${page}.tsx.snap`),
        this.destinationPath(`./src/components/pages/__tests__/__snapshots__/${page}.tsx.snap`),
        {
          name,
        },
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

  writeBaseFiles() {
    const { name, repo, description, author, graphql, isFoundation, styledComponents, redux } = this.answers
    const configFiles = ['jest.config.js']

    /**
     * settings destination path
     * for non isFoundation: it will be the folder where the scaffolder is executed
     * for isFoundation: we have to deter
     */

    this.fs.copyTpl(this.templatePath('_README.md'), this.destinationPath('./README.md'), {
      name,
    })

    this.fs.copyTpl(this.templatePath('_package.base.json'), this.destinationPath('./package.json'), {
      name,
      repo,
      description,
      author,
    })

    this.fs.copyTpl(this.templatePath('_index.html'), this.destinationPath('./public/index.html'), {
      name,
    })

    this.fs.copyTpl(this.templatePath('_tsconfig.json'), this.destinationPath('./tsconfig.json'))

    if (graphql) {
      configFiles.forEach(item => {
        this.fs.copy(this.templatePath(`apollo/${item}`), this.destinationPath(`./${item}`))
      })

      this.fs.copyTpl(this.templatePath('apollo'), this.destinationPath('./'), { name })
    } else {
      configFiles.forEach(item => {
        this.fs.copy(this.templatePath(`base/${item}`), this.destinationPath(`./${item}`))
      })

      this.fs.copyTpl(this.templatePath('base'), this.destinationPath(`.`), { name })
    }

    this.fs.copyTpl(this.templatePath('index.tsx'), this.destinationPath(`./src/core/index.tsx`), { redux, graphql, styledComponents })

    this.fs.commit([], () => {
      this._addWebpack()
      this._addStyledComponents()
      this._addSass()
      this._addAzure()
      this._installAndExport()
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
        name: 'graphql',
        message: 'Would you like to use graphql?',
        default: false,
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
        type: 'confirm',
        name: 'redux',
        message: 'Would you like Redux?',
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

    /**
     * Destination path
     * isFoundation ->./package/{appName}
     * else current path
     */

    if (this.answers.isFoundation) {
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
