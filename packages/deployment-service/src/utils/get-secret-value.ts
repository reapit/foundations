import { SecretsManager } from 'aws-sdk'

export const getSecretValue = async (secretArn: string): Promise<string> => {
  const secretManager = new SecretsManager({
    region: 'eu-west-2',
  })

  const secrets = await secretManager.getSecretValue({ SecretId: secretArn }).promise()

  if (!secrets.SecretString) {
    throw new Error('Failed to get secret')
  }

  return secrets.SecretString
}
