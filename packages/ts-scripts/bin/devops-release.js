#! /usr/bin/env node
const path = require('path')
const fs = require('fs')

const tsConfigLocation = path.resolve(__dirname, '../tsconfig.json')
const config = JSON.parse(fs.readFileSync(tsConfigLocation, 'utf-8'))

require('ts-node').register(config)
require('../src/devops-release/bin/devops-release.ts')
