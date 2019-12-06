const release = require('./release')
release('dev').catch(err => {
  console.error(err.message)
  process.exit(1)
})