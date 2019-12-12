const merge = require('webpack-merge')
const commonWebpackConfigs = require('./webpack.config')
const path = require('path')
const fs = require('fs')

const cdnPath = path.resolve(__dirname, '../src/cdn')
const files = fs.readdirSync(cdnPath)

const entries = files.reduce(( entries, file ) => {
  const extName = path.extname(file)
  const fileWithoutExtName = file.replace(extName, '')
  
  entries[fileWithoutExtName] = path.resolve(cdnPath, file)
  return entries
}, {})

module.exports = merge(commonWebpackConfigs, {
  entry: entries,
  output: {
    path: path.resolve(__dirname, '../dist-cdn'),
    libraryTarget: 'umd'
  }
})
