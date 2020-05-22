const path = require('path')
const fs = require('fs')

const { AWS_REGION } = require(path.resolve(__dirname, '../config.json'))

const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
}

fs.writeFileSync(path.resolve(__dirname, '../credentials.json'), JSON.stringify(credentials))
