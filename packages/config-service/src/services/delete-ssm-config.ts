import { SSM } from 'aws-sdk'
import { CLIENT_KEY_PREFIX } from '../constants/ssm'

const ssm = new SSM()

export const deleteConfigValue = async (key: string) => {
  try {
    const params = {
      Name: `${CLIENT_KEY_PREFIX}${key}`,
    }
    await ssm.deleteParameter(params).promise()
  } catch (error) {
    throw new Error(`Failed to delete parameter ${error.message}`)
  }
}
