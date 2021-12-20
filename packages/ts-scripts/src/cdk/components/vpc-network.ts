import * as cdk from 'aws-cdk-lib'
import {
  aws_ec2 as ec2,
} from 'aws-cdk-lib'

export const createVpc = (scope: cdk.Stack, name: string): ec2.Vpc => {
  const vpc = new ec2.Vpc(scope, name)

  return vpc
}

export type Vpc = ec2.Vpc