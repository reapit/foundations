const path = require('path')
const fs = require('fs')

const { AWS_REGION } = require(path.resolve(__dirname, '../config.json'))

const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
}

// this will create a credentials.json file in src folder
fs.writeFileSync(path.resolve(__dirname, '../src/credentials.json'), JSON.stringify(credentials))
