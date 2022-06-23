import process from 'process'
import { execSync } from 'child_process'
import path from 'path'

const [command, scriptName = 'cdk-stack.ts'] = process.argv.slice(2)
const cwd = process.cwd()
const templatesDir = path.join(cwd, 'cdk.out')

if (command) {
  try {
    execSync(
      `yarn cdk ${command} --require-approval never --output=${templatesDir} --all -a "cd ${cwd} && yarn dlx ts-node ${
        scriptName.split(' ')[0]
      }"`,
      {
        stdio: 'inherit',
        cwd: __dirname,
      },
    )
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
} else {
  console.log(`
    Usage:
      rpt-cdk <command> <scriptName>

      Args: <scriptName> - The name of the script to run, defaults to cdk-stack.ts

      Commands:
        synth - Generate a report of the CDK stack
        deploy - Deploy the CDK stack
        watch - Deploy the CDK stack and watch for changes
        destroy - Destroy the CDK stack
  `)
}
