import * as fs from 'fs'
import * as AWS from 'aws-sdk'
import errorHandler from './error-handler'

const deployVersion = () => {
  const region = 'eu-west-2'

  const apiVersion = 'latest'
  const lambda = new AWS.Lambda({ apiVersion, region })
  const zipContents = fs.readFileSync(`${__dirname}/../public/app.zip`)

  const createFunctionParams = {
    ZipFile: zipContents,
    FunctionName: 'app',
    Publish: true
  }
  lambda.updateFunctionCode(createFunctionParams, errorHandler)
}

export default deployVersion()
