const child_process = require('child_process')

const execSync = (cmd, cwd) => {
  return child_process.execSync(cmd, { stdio: 'inherit', cwd })
}

module.exports = {
  execSync,
}
