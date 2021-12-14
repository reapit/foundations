import child_process from 'child_process'

export const execSync = (cmd: string, cwd?: string) => {
  return child_process.execSync(cmd, { stdio: 'inherit', cwd })
}
