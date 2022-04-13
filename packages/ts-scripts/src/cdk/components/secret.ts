import * as cdk from 'aws-cdk-lib'
import { aws_secretsmanager as secretsmanager } from 'aws-cdk-lib'

export const createSecret = (stack: cdk.Stack, name: string, value: string) => {
  const secret = new secretsmanager.Secret(stack, name, {
    generateSecretString: {
      secretStringTemplate: value,
    },
  })
  return secret
}
