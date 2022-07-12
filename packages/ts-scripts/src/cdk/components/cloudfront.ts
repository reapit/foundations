import * as cdk from 'aws-cdk-lib'

export const createCloudfront = (stack, name: string, options: cdk.aws_cloudfront.DistributionProps) => {
  return new cdk.aws_cloudfront.Distribution(stack, name, options)
}
