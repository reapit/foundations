import { STS } from 'aws-sdk'

export const getRoleCredentials = async () => {
  const assumeRole = await new STS({
    region: process.env.REGION,
  })
    .assumeRole({
      RoleArn: process.env.USERCODE_ROLE_ARN as string,
      RoleSessionName: 'deployment-service',
    })
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
