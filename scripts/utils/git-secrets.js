#!/usr/bin/env node

const { resolve } = require('path')
const { writeFileSync, unlinkSync, existsSync, readFileSync } = require('fs')
const homedir = require('os').homedir()
const shell = require('shelljs')

const TEMP_CRED_FILE = resolve(process.cwd(), './.temp-credentials')
const AWS_CRED_FILE = resolve(homedir, './.aws/credentials')

/**
 * Used to build AWS credentials file using environment variable
 * https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-shared.html
 */
const buildTempCredFile = () => {
  const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID
  const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
  const contentFromEnv =
    awsAccessKeyId && awsSecretAccessKey
      ? `[env]
  aws_access_key_id = ${awsAccessKeyId}
  aws_secret_access_key = ${awsSecretAccessKey}

  `
      : ''
  const contentFromCredFile = existsSync(AWS_CRED_FILE) ? readFileSync(AWS_CRED_FILE, { encoding: 'utf-8' }) : ''
  const finalContent = contentFromEnv + contentFromCredFile
  writeFileSync(TEMP_CRED_FILE, finalContent)
  console.log(`Wrote temp credentials file to: ${TEMP_CRED_FILE}\n`)
}

const removeTempCredFile = () => {
  unlinkSync(TEMP_CRED_FILE)
  console.log(`Removed credentials file ${TEMP_CRED_FILE}\n`)
}

/**
 * FLOW:
 * 1. GET AWS secrets from environment variables and ~/.aws/credentials
 * 2. Merge those secrets into one file (temporary file)
 * 3. Register AWS provider for git-secrets using the file in step 2
 * 4. Scan for secrets in staged files using git secrets --scan
 * 5. Remove temporary file in step 2
 */
const run = () => {
  try {
    buildTempCredFile()
    // add AWS as a provider, with genereted credentials file
    const { error: errorAddProvider, stdout: stdoutAddProvider, stderr: stderrAddProvider } = shell.exec(
      `git secrets --add-provider -- git secrets --aws-provider ${TEMP_CRED_FILE}`,
      {
        stdio: 'inherit',
      },
    )
    if (errorAddProvider) throw errorAddProvider
    if (stderrAddProvider) throw stderrAddProvider
    console.log('Added AWS provider\n', stdoutAddProvider)

    // scan for secrets
    const { error: errorScan, stdout: stdoutScan, stderr: stderrScan } = shell.exec('git secrets --scan --cached', {
      stdio: 'inherit',
    })
    if (errorScan) throw errorScan
    if (stderrScan) throw stderrScan
    console.log('No secret found in staged files!\n', stdoutScan)
    removeTempCredFile()
  } catch (err) {
    console.error(err)
    removeTempCredFile()
    throw err
  }
}

run()
