const fs = require('fs')
const path = require('path')
const { FOUNDATIONS_TYPES_FOLDER } = require('./constants')

const prettifyCode = require('./format-code')
const indexFilePath = path.resolve(FOUNDATIONS_TYPES_FOLDER, './index.ts')

module.exports = async () => {
  const files = fs.readdirSync(FOUNDATIONS_TYPES_FOLDER)
  const prettfiedFiles = await prettifyCode(
    '// @ts-ignore\n' +
      'export * from "../traffic-schema/marketplace-traffic-event-schema"' +
      '// @ts-ignore\n' +
      'export * from "../deployment-schema"' +
      '// @ts-ignore\n' +
      'export * from "../api-key-schema"' +
      '// @ts-ignore\n' +
      'export * from "../marketplace-cms"' +
      '// @ts-ignore\n' +
      'export * from "../webhook-schema"' +
      '// @ts-ignore\n' +
      files
        .filter((file) => file !== 'index.ts')
        .map((file) => file.replace('.ts', ''))
        .map((file) => `export * from './${file}'`)
        .join('\n// @ts-ignore\n'),
  )

  fs.writeFileSync(indexFilePath, prettfiedFiles)
}
