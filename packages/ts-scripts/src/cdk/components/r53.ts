import * as cdk from 'aws-cdk-lib'

export const createRoute = (stack: any, name: string, options: cdk.aws_route53.ARecordProps) => {
  return new cdk.aws_route53.ARecord(stack, name, options)
}
