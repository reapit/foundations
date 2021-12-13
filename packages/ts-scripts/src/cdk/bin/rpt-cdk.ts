import process from 'process'
import path from 'path'
import { execSync } from 'child_process'

const [command, scriptName = 'cdk-stack.ts'] = process.argv.slice(2)
const cwd = process.cwd()

if (command) {
  try {
    execSync(`yarn cdk ${command} -a "cd ${cwd} && yarn dlx ts-node ${scriptName}"`, {
      stdio: 'inherit',
      cwd: __dirname,
    })
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
} else {
  console.log(`
    Usage:
      rpt-cdk <command>

    Commands:
      synth - Generate a report of the CDK stack
        args: <scriptName> - The name of the script to run, defaults to cdk-stack.ts
      deploy - Deploy the CDK stack
        args: <scriptName> - The name of the script to run, defaults to cdk-stack.ts
  `)
}
