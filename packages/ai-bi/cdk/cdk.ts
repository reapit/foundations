#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { execSync } from 'child_process'
import { getgid, getuid } from 'process'
import { Construct } from 'constructs'
import { resolve } from 'path'
import config from '../config.json'

class AiBiStack extends cdk.Stack {
  static readonly stackId = 'aiBiStack'
  private readonly FULL_DOMAIN: string
  static SUBDOMAIN_NAME = 'ai-bi'
  static PACKAGE_ROOT = resolve(__dirname, '..')
  private readonly certificate: cdk.aws_certificatemanager.ICertificate

  constructor(
    scope: Construct,
    options: cdk.StackProps,
  ) {
    super(scope, AiBiStack.stackId, {
      env: {},
      ...options,
    })

    this.FULL_DOMAIN = `${AiBiStack.SUBDOMAIN_NAME}.${config.ROOT_DOMAIN}`

    this.buildCode()

    const vpc = new cdk.aws_ec2.Vpc(this, 'vpc')
    this.certificate = cdk.aws_certificatemanager.Certificate.fromCertificateArn(
      this,
      'certificate',
      config.CERTIFICATE_ARN,
    )

    const http = new cdk.aws_lambda.Function(this, 'http-lambda', {
      runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
      code: cdk.aws_lambda.Code.fromAsset(resolve(AiBiStack.PACKAGE_ROOT, 'bundle.zip')),
      handler: 'packages/ai-bi/dist/http.handler',
      vpc,
      environment: {
        ...this.env(),
      },
      memorySize: 1024,
      timeout: cdk.Duration.minutes(10),
      logRetention: cdk.aws_logs.RetentionDays.ONE_MONTH,
    })

    // invokeLambda.grantInvoke(this.automationStack.taskIterationLambda)

    const api = new cdk.aws_apigateway.LambdaRestApi(this, 'ai-bi-api-gateway', {
      handler: http,
      defaultCorsPreflightOptions: {
        allowOrigins: ['*'],
        allowHeaders: [
          'Content-Type',
          'Authorization',
          'X-Api-Key',
          'api-version',
          'reapit-connect-token',
          'reapit-customer',
        ],
      },
      domainName: {
        domainName: this.FULL_DOMAIN,
        certificate: this.certificate,
        endpointType: cdk.aws_apigateway.EndpointType.EDGE,
      },
      deployOptions: {
        stageName: 'prod',
      },
    })
  }

  private env() {
    return {
      ...config,
    }
  }

  private buildCode() {
    execSync('yarn build', {
      cwd: AiBiStack.PACKAGE_ROOT,
      env: process.env,
      stdio: 'inherit',
      uid: getuid && getuid(),
      gid: getgid && getgid(),
    })

    console.log('Built dist')

    console.log('Bundling dist...')

    execSync('yarn bundle', {
      cwd: AiBiStack.PACKAGE_ROOT,
      env: process.env,
      stdio: 'inherit',
      uid: getuid && getuid(),
      gid: getgid && getgid(),
    })

    console.log('Bundled')
  }

}

const bootstrap = async () => {
  execSync('yarn build', {
    cwd: __dirname,
    stdio: 'inherit',
  })
  execSync('yarn bundle', {
    cwd: __dirname,
    stdio: 'inherit',
  })

  const app = new cdk.App()

  new AiBiStack(app, {})
}

bootstrap()
  .catch(error => console.error(error))
