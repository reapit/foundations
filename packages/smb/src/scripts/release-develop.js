const path = require('path')
const { execSync } = require('child_process')

const distPath = path.resolve(__dirname, '../..', 'dist')
const packageName = path.basename(path.resolve(__dirname, '../..'))

// eslint-disable-next-line
execSync(`aws s3 cp ${distPath} s3://reapit-${packageName}-dev --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers --recursive`)
