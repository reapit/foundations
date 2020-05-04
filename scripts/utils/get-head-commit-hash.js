const { execSync } = require('child_process')

const headCommitHashBuffer = execSync('git rev-parse HEAD')
exports.headCommitHash = headCommitHashBuffer.toString().trim()
