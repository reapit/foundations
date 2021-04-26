import { SSM } from 'aws-sdk'
import { CLIENT_KEY_PREFIX } from '../constants/ssm'

const ssm = new SSM()

export const createConfigValue = async (key: string, value: string) => {
  try {
    const options = {
      Name: `${CLIENT_KEY_PREFIX}${key}`,
      Value: value,
      Overwrite: true,
      Type: 'SecureString',
    }
    await ssm.putParameter(options).promise()
  } catch (error) {
    throw new Error(`Failed to create parameter ${error.message}`)
  }
}
