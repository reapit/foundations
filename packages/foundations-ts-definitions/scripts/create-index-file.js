const fs = require('fs')
const path = require('path')
const { FOUNDATIONS_TYPES_FOLDER } = require('./constants')

const prettifyCode = require('./format-code')
const indexFilePath = path.resolve(FOUNDATIONS_TYPES_FOLDER, './index.ts')

module.exports = () => {
  const files = fs.readdirSync(FOUNDATIONS_TYPES_FOLDER)
  fs.writeFileSync(
    indexFilePath,
    prettifyCode(
      '// @ts-ignore\n' +
        'export * from "../traffic-schema/marketplace-traffic-event-schema"' +
        '// @ts-ignore\n' +
        files
          .filter(file => file !== 'index.ts')
          .map(file => file.replace('.ts', ''))
          .map(file => `export * from './${file}'`)
          .join('\n// @ts-ignore\n'),
    ),
  )
}
