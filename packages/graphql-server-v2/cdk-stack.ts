#!/usr/bin/env node
import 'source-map-support/register'
import path from 'path'
import { execSync } from 'child_process'
import { createBaseStack } from '@reapit/ts-scripts/src/cdk'
import config from './config.json'
import { aws_apigateway, aws_ec2, aws_lambda, aws_logs, Duration } from 'aws-cdk-lib'

const namespace = 'cloud'
const appName = 'foundations'
const component = 'graphql-server-v2'

const createStack = () => {
  console.log('bundling...')
  execSync('yarn bundle', {
    cwd: __dirname,
    stdio: 'inherit',
  })
  console.log('bundled')

  console.log('processing stack...')

  const stack = createBaseStack({
    namespace,
    appName,
    component,
    accountId: config.AWS_ACCOUNT_ID,
    region: 'eu-west-2',
  })

  const vpc = aws_ec2.Vpc.fromLookup(stack, 'vpc-lookup', {
    vpcId: config.VPC_ID,
    region: 'eu-west-2',
  })

  const securityGroup = new aws_ec2.SecurityGroup(stack, 'gql-security-group', {
    vpc,
  })

  securityGroup.addIngressRule(aws_ec2.Peer.anyIpv4(), aws_ec2.Port.tcp(80))
  securityGroup.addIngressRule(aws_ec2.Peer.anyIpv4(), aws_ec2.Port.tcp(433))

  const handler = 'packages/graphql-server-v2/src/index.handler'
  const entrypoint = path.resolve(__dirname, 'bundle.zip')

  const lambdaFunction = new aws_lambda.Function(stack, 'graphql', {
    timeout: Duration.seconds(30),
    environment: config,
    memorySize: 1024,
    handler,
    vpc,
    code: aws_lambda.Code.fromAsset(entrypoint),
    runtime: aws_lambda.Runtime.NODEJS_14_X,
    logRetention: aws_logs.RetentionDays.ONE_MONTH,
    securityGroups: [securityGroup],
  })

  const api = aws_apigateway.RestApi.fromRestApiAttributes(stack, 'existing-api-gateway-lookup', {
    restApiId: config.REST_API_ID,
    rootResourceId: config.ROOT_RESOURCE_ID,
  })

  const lambdaInt = new aws_apigateway.LambdaIntegration(lambdaFunction)
  const resource = api.root.resourceForPath('graphql')

  resource.addMethod('ANY', lambdaInt, {
    authorizer: {
      authorizationType: aws_apigateway.AuthorizationType.CUSTOM,
      authorizerId: config.AUTHORIZER_ID,
    },
  })

  resource.addMethod('OPTIONS', lambdaInt)
}

createStack()
