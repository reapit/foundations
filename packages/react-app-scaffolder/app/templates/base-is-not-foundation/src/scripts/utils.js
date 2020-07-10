const crypto = require('crypto')
const fs = require('fs')

function hashFile(file) {
  const content = fs.readFileSync(file)
  return crypto
    .createHash('md5')
    .update(content)
    .digest('hex')
}

function hashFiles(filesArray) {
  return filesArray.reduce((accumulator, file) => hashFile(file) + accumulator, '')
}
module.exports = hashFiles
