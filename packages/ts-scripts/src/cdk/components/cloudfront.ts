import * as cdk from 'aws-cdk-lib'

export const createCloudfront = (stack: cdk.Stack, name: string, options: cdk.aws_cloudfront.CloudFrontWebDistributionProps) => {
  return new cdk.aws_cloudfront.CloudFrontWebDistribution(stack, name, options)
}
