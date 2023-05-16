import * as cdk from 'aws-cdk-lib'
import { CloudFrontWebDistribution, CloudFrontWebDistributionProps } from 'aws-cdk-lib/aws-cloudfront'

export const createCloudfront = (stack: cdk.Stack, name: string, options: CloudFrontWebDistributionProps) => {
  return new CloudFrontWebDistribution(stack, name, options)
}
