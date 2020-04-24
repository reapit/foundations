const ejs = require('ejs')
const fs = require('fs')
const path = require('path')

const generateServerlessYml = async ({ templateName, appName }) => {
  const ejsFileDir = path.resolve(__dirname, `${templateName}.ejs`)
  const destDir = path.resolve(__dirname, '..', '..', 'packages', appName)
  const serverlessDir = path.resolve(destDir, 'serverless.yml')
  const ejsTemplate = await fs.readFileSync(ejsFileDir, { encoding: 'utf8' })
  const template = ejs.compile(ejsTemplate)
  const tmpl = template({ appName })
  fs.mkdirSync(destDir, { recursive: true })
  fs.writeFileSync(serverlessDir, tmpl)
}

const generateWebpackConfigForLambda = async ({ templateName, appName }) => {
  const isLambda = templateName === 'lambda'
  const isFullStack = templateName === 'fullstack'
  if (!isLambda && !isFullStack) {
    return null
  }
  const ejsFileDir = path.resolve(__dirname, 'webpack.config.ejs')
  const destDir = path.resolve(__dirname, '..', '..', 'packages', appName)
  const webpackDir = path.resolve(destDir, 'webpack.config.js')
  const ejsTemplate = await fs.readFileSync(ejsFileDir, { encoding: 'utf8' })
  const template = ejs.compile(ejsTemplate)
  const tmpl = template({ appName })
  fs.mkdirSync(destDir, { recursive: true })
  fs.writeFileSync(webpackDir, tmpl)
}

const compileTemplate = async () => {
  try {
    const [, , ...args] = process.argv
    if (args.length >= 2 && args[0] && args[1]) {
      const templateName = args[0]
      const appName = args[1]
      await generateServerlessYml({ templateName, appName })
      await generateWebpackConfigForLambda({ templateName, appName })
    }
  } catch (err) {
    console.error(err)
  }
  process.exit(1)
}

compileTemplate()
