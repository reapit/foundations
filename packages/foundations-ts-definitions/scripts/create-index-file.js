const fs = require('fs')
const path = require('path')

const prettifyCode = require('./format-code')
const files = fs.readdirSync(path.resolve(__dirname, '../types'))
const indexFilePath = path.resolve(__dirname, '../types/index.ts')

fs.writeFileSync(
  indexFilePath,
  prettifyCode(
    '// @ts-ignore\n' +
      files
        .filter(file => file !== 'index.ts')
        .map(file => file.replace('.ts', ''))
        .map(file => `export * from './${file}'`)
        .join('\n// @ts-ignore\n'),
  ),
)
