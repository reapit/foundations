import AWS from 'aws-sdk'
import { getRoleCredentials } from './sts'

export const createParameterStoreClient = async () =>
  new AWS.SSM({
    credentials: await getRoleCredentials(),
  })
