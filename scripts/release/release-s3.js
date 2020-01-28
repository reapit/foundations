#!/usr/bin/env node
const path = require('path')
const { execSync } = require('child_process')

const [, , ...args] = process.argv
const packageName = args[0]
const bucketName = args[1]

if (!packageName) {
  console.error('No package name was specified for your deployment')
  process.exit(1)
}

if (!bucketName) {
  console.error('No bucket name was specified for your deployment')
  process.exit(1)
}

const distPath = path.resolve(__dirname, '../../', 'packages', packageName, 'public', 'dist')

execSync(
  `aws s3 cp ${distPath} s3://${bucketName} --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers --recursive`,
)
