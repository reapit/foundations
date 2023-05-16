import * as cdk from 'aws-cdk-lib'
import { Distribution, DistributionProps } from 'aws-cdk-lib/aws-cloudfront'

export const createCloudfront = (stack: cdk.Stack, name: string, options: DistributionProps) => {
  return new Distribution(stack, name, options)
}
