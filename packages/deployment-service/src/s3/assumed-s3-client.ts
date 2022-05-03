import { RoleCredentialsType } from '../config/role-credentials'
import { STS } from 'aws-sdk'

export const getRoleCredentials = async (config: RoleCredentialsType) => {
  const assumeRole = await new STS({
    region: process.env.REGION,
  })
    .assumeRole(config)
    .promise()

  // AWS with their amazing consistency once again (both types are called Credentials too but they are different)
  const credentials = {
    accessKeyId: assumeRole.Credentials?.AccessKeyId,
    secretAccessKey: assumeRole.Credentials?.SecretAccessKey,
    sessionToken: assumeRole.Credentials?.SessionToken,
  }

  if (!credentials.accessKeyId || !credentials.secretAccessKey) {
    throw new Error('Could not assume role')
  }

  return credentials as {
    accessKeyId: string
    secretAccessKey: string
    sessionToken?: string
  }
}
