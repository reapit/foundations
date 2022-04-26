import * as cdk from 'aws-cdk-lib'
import { aws_secretsmanager as secretsmanager } from 'aws-cdk-lib'

export const createSecret = (stack: cdk.Stack, id: string, value: string) =>
  new secretsmanager.CfnSecret(stack, id, {
    secretString: value,
  })
