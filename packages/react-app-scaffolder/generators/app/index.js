const Generator = require('yeoman-generator')
const { promisify } = require('util')
const exec = promisify(require('child_process').exec)
const path = require('path')
const fs = require('fs')
const mergePackageJson = require('merge-package-json')
const yosay = require('yosay')

module.exports = class extends Generator {
  // Private methods as denoted by an underscore do not get called by Yeoman in the genetator lifecycle

  _installAndExport() {
    this.fs.commit([], async () => {
      setTimeout(() => {
        this.log(yosay('Installing dependencies... this may take a minute!'))
      }, 100)

      const workingDir = path.resolve(process.cwd(), this.answers.name)

      await exec(`cd ../ && mv ${workingDir} ./`)
      await exec(`cd ../${this.answers.name} && yarn`)
      await exec(`cd ../${this.answers.name} && yarn prettier ./package.json --write`)

      this.log(yosay('App installed successfully!'))

      this._pushToGithub()

      this.log(
        yosay(`
        Compiling your app now - server shortly available at http://localhost:8080
        To run your app again in dev mode, exit this process and execute:
        cd ../${this.answers.name} && yarn dev
      `),
      )

      await exec(`cd ../${this.answers.name} && yarn dev`)
    })
  }

  async _pushToGithub() {
    const { repo, githubPush, name } = this.answers
    if (repo && githubPush) {
      this.log(yosay('Pushing your app to Github...'))

      await exec(`cd ../${name} && git init`)
      await exec(`cd ../${name} && git remote add origin ${repo}`)

      await exec(`cd ../${name} && git add . && git commit -m "Initial commit" && git push origin master`)

      this.log(yosay('Successfully pushed app to Github!'))
    }
    return true
  }

  _mergePackageJson(additionalPackages) {
    const current = this.destinationPath(`${this.answers.name}/package.json`)
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
        this.destinationPath(`${name}/src/scripts/webpack-dev.js`),
      )
      this.fs.copy(
        this.templatePath('sass/_webpack-prod.sass.js'),
        this.destinationPath(`${name}/src/scripts/webpack-prod.js`),
      )
    } else {
      this.fs.copy(this.templatePath('_webpack-dev.js'), this.destinationPath(`${name}/src/scripts/webpack-dev.js`))
      this.fs.copy(this.templatePath('_webpack-prod.js'), this.destinationPath(`${name}/src/scripts/webpack-prod.js`))
    }
  }

  _addSass() {
    const { sass, name } = this.answers
    if (sass) {
      this._mergePackageJson('sass/_package.sass.json')

      this.fs.copy(
        this.templatePath('sass/_purgecss-loader.js'),
        this.destinationPath(`${name}/src/scripts/purgecss-loader.js`),
      )
      this.fs.copy(
        this.templatePath('sass/_purgecss-loader.js'),
        this.destinationPath(`${name}/src/scripts/purgecss-loader.js`),
      )
      this.fs.copy(this.templatePath('sass/styles'), this.destinationPath(`${name}/src/styles`))
    }
  }

  _addStyledComponents() {
    const { styledComponents, name } = this.answers
    if (styledComponents) {
      this._mergePackageJson('styled-components/_package.styled-components.json')

      this.fs.copy(
        this.templatePath('styled-components/src/core/index.tsx'),
        this.destinationPath(`${name}/src/core/index.tsx`),
      )
      this.fs.copy(
        this.templatePath('styled-components/src/core/__tests__/__snapshots__/index.tsx.snap'),
        this.destinationPath(`${name}/src/core/__tests__/__snapshots__/index.tsx.snap`),
      )

        // pages that need a different styled-components version
        ;['login'].forEach(page => {
          this.fs.copyTpl(
            this.templatePath(`styled-components/src/components/pages/${page}.tsx`),
            this.destinationPath(`${name}/src/components/pages/${page}.tsx`),
            { name },
          )
          this.fs.copy(
            this.templatePath(`styled-components/src/components/pages/__styles__/${page}.ts`),
            this.destinationPath(`${name}/src/components/pages/__styles__/${page}.ts`),
          )
          this.fs.copyTpl(
            this.templatePath(`styled-components/src/components/pages/__tests__/__snapshots__/${page}.tsx.snap`),
            this.destinationPath(`${name}/src/components/pages/__tests__/__snapshots__/${page}.tsx.snap`),
            {
              name,
            },
          )
        })
    }
  }

  _addWebdriver() {
    const { webdriver, name } = this.answers
    if (webdriver) {
      this._mergePackageJson('webdriver/_package.webdriver.json')
      this.fs.copy(
        this.templatePath('webdriver/_wdio.conf.js'),
        this.destinationPath(`${name}/src/scripts/wdio.conf.js`),
      )

      this.fs.copy(this.templatePath('webdriver/tests'), this.destinationPath(`${name}/src/tests`))

      this.fs.commit([], () => {
        this.fs.copy(
          this.templatePath('webdriver/_tsconfig.webdriver.json'),
          this.destinationPath(`${name}/src/tests/webdriver/tsconfig.json`),
        )
      })
    }
  }

  _addAzure() {
    const { name, azure } = this.answers
    if (azure) {
      this.fs.copy(this.templatePath('azure/_azure-pipelines.yml'), this.destinationPath(`${name}/azure-pipelines.yml`))
    }
  }

  constructor(args, opts) {
    super(args, opts)
    this.log(yosay('Welcome to Reapit App Scaffolder!'))
  }

  writeBaseFiles() {
    const { name, repo, description, author, graphql } = this.answers
    const configFiles = ['jest.config.js']

    this.fs.copyTpl(this.templatePath('_README.md'), this.destinationPath(`${name}/README.md`), {
      name,
    })

    this.fs.copyTpl(this.templatePath('_package.base.json'), this.destinationPath(`${name}/package.json`), {
      name,
      repo,
      description,
      author,
    })
    this.fs.copyTpl(this.templatePath('_index.html'), this.destinationPath(`${name}/public/index.html`), {
      name,
    })

    this.fs.copyTpl(this.templatePath('_tsconfig.json'), this.destinationPath(`${name}/tsconfig.json`))

    if (graphql) {
      configFiles.forEach(item => {
        this.fs.copy(this.templatePath(`apollo/${item}`), this.destinationPath(`${name}/${item}`))
      })

      this.fs.copyTpl(this.templatePath('apollo'), this.destinationPath(`${name}`), { name })
    } else {
      configFiles.forEach(item => {
        this.fs.copy(this.templatePath(`base/${item}`), this.destinationPath(`${name}/${item}`))
      })

      this.fs.copyTpl(this.templatePath('base'), this.destinationPath(`${name}`), { name })
    }

    this.fs.commit([], () => {
      this._addWebpack()
      this._addStyledComponents()
      this._addSass()
      this._addWebdriver()
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
        name: 'webdriver',
        message: 'Would you like WebDriver Selenium Tests?',
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
  }
}
