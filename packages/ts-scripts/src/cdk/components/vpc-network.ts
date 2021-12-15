import * as ec2 from '@aws-cdk/aws-ec2'
import * as cdk from '@aws-cdk/core'

export const createVpc = (scope: cdk.Stack, name: string): ec2.Vpc => {
  const vpc = new ec2.Vpc(scope, name)

  return vpc
}

export type Vpc = ec2.Vpc