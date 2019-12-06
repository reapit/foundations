const release = require('./release')
release('prod').catch(err => {
  console.error(err.message)
  process.exit(1)
})