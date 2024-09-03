import * as path from 'path'
import {
  Topic,
  addLambdaToApi,
  createApi,
  createBaseStack,
  createVpc,
  createDatabase,
  createCodeBuildProject,
  getCodebuildSnsTopic,
  PolicyStatement,
  createStackEventHandler,
  addLambdaSNSTrigger,
  addLambdaSQSTrigger,
  LambdaRoute,
  Queue,
  createSecret,
} from '@reapit/ts-scripts/src/cdk'
import fs from 'fs/promises'
import { aws_sqs as sqs, aws_lambda } from 'aws-cdk-lib'

import { createLambda } from './create-lambda'
import { createS3Buckets } from './create-S3-bucket'
import { createSqsQueues, QueueNames } from './create-sqs'
import { createPolicies } from './create-policies'
import { Role } from 'aws-cdk-lib/aws-iam'
import config from '../../config.json'
import * as cdk from 'aws-cdk-lib'

export const databaseName = 'deployment_service'

type FunctionSetup = {
  handler: string
  policies: PolicyStatement[]
  timeout?: number
  RAM?: number
  api?: {
    routes: LambdaRoute | LambdaRoute[]
    cors: {
      origin: string
    }
    headers: string[]
    authorizer?: boolean
  }
  queues?: sqs.IQueue[]
  topic?: Topic
  role?: Role
  entrypoint: string
}

const getNumberOfMigrations = async () => {
  const migrations = await fs.readdir(path.join(__dirname, '../../migrations'))
  return migrations.length
}

export const createStack = async () => {
  const envStage = process.env.APP_STAGE === 'production' ? 'prod' : 'dev'
  const stack = createBaseStack({
    namespace: 'cloud',
    appName: 'deployment',
    component: 'service',
    accountId: config.AWS_ACCOUNT_ID,
  })
  const usercodeStack = createBaseStack({
    namespace: 'cloud',
    appName: 'deployment',
    component: `usercode-${envStage}`,
    accountId: config.USERCODE_ACCOUNT_ID,
  })

  const api = createApi(stack, 'apigateway', undefined)
  const vpc = createVpc(stack, 'vpc')
  const buckets = createS3Buckets(stack, usercodeStack, envStage)
  const queues = createSqsQueues(stack)
  const database = createDatabase(stack, 'database', databaseName, vpc)
  const secretManager = database.secret

  if (!secretManager) {
    throw new Error('Failed to create rds secret')
  }

  const codeBuild = createCodeBuildProject(usercodeStack, `codebuild-${envStage}`)
  const codebuildSnsTopic = getCodebuildSnsTopic(usercodeStack, `codebuild-sns-topic-${envStage}`)

  const githubPemSecret = createSecret(stack, 'githubpem', config.GITHUB_PEM)

  const policies = createPolicies({
    buckets,
    queues,
    secretManager,
    codeBuild,
    usercodeStack: usercodeStack,
    codebuildSnsTopic,
    githubPemSecretArn: githubPemSecret.ref,
  })

  // ./bundle/... here?
  const createFileLoc = (file: string, func: string) => `packages/deployment-service/dist/${file}.${func}`

  const functionSetups: { [s: string]: FunctionSetup } = {
    sqs: {
      handler: createFileLoc('sqs', 'handle'),
      policies: [...policies.commonBackendPolicies, policies.cloudFrontPolicy, policies.route53Policy],
      queues: [
        queues[QueueNames.CODEBUILD_EXECUTOR],
        queues[QueueNames.CODEBUILD_VERSION_DEPLOY],
        queues[QueueNames.PIPELINE_SETUP],
        queues[QueueNames.PIPELINE_TEAR_DOWN_START],
        queues[QueueNames.PIPELINE_TEAR_DOWN],
      ],
      timeout: 900,
      RAM: 2048,
      entrypoint: 'bundle/sqs.zip',
    },
    appEvents: {
      handler: createFileLoc('sqs', 'handle'),
      policies: [...policies.commonBackendPolicies, policies.cloudFrontPolicy, policies.route53Policy],
      queues: [queues[QueueNames.APP_EVENTS]],
      entrypoint: 'bundle/sqs.zip',
    },
    sns: {
      handler: createFileLoc('sns', 'handle'),
      policies: [...policies.commonBackendPolicies],
      topic: codebuildSnsTopic,
      timeout: 900,
      entrypoint: 'bundle/sns.zip',
    },
    httpApi: {
      handler: createFileLoc('http', 'handler'),
      policies: [...policies.commonBackendPolicies, policies.cloudFrontPolicy, policies.route53Policy],
      api: {
        routes: [
          {
            method: 'ANY',
            path: 'api/{proxy+}',
          },
        ],
        cors: {
          origin: '*',
        },
        headers: ['Content-Type', 'api-version', 'X-Api-Key'],
      },
      entrypoint: 'bundle/http.zip',
    },
    http: {
      handler: createFileLoc('http', 'handler'),
      policies: [...policies.commonBackendPolicies, policies.cloudFrontPolicy, policies.route53Policy],
      api: {
        routes: [
          {
            method: 'ANY',
            path: '/{proxy+}',
          },
        ],
        cors: {
          origin: '*',
        },
        headers: ['Content-Type', 'Authorization', 'api-version'],
        authorizer: true,
      },
      entrypoint: 'bundle/http.zip',
    },
  }

  const MYSQL_DATABASE = databaseName

  const invokeApiKeyVerifyArn = cdk.Fn.importValue('cloud-api-key-service-invoke-arn')

  const env: any = {
    DATABASE_SECRET_ARN: secretManager.secretArn,
    MYSQL_DATABASE,
    DEPLOYMENT_LIVE_BUCKET_NAME: buckets['cloud-deployment-live'].bucketName,
    DEPLOYMENT_VERSION_BUCKET_NAME: buckets['cloud-deployment-version'].bucketName,
    DEPLOYMENT_LOG_BUCKET_NAME: buckets['cloud-deployment-log'].bucketName,
    DEPLOYMENT_REPO_CACHE_BUCKET_NAME: buckets['cloud-deployment-repo-cache'].bucketName,
    REGION: 'eu-west-2',
    CODE_BUILD_PROJECT_NAME: codeBuild.projectName,
    USERCODE_ROLE_ARN: policies.usercodeStackRoleArn,
    GITHUB_PEM_SECRET_ARN: githubPemSecret.ref,
    NODE_ENV: process.env.NODE_ENV || 'development',
    API_KEY_INVOKE_ARN: invokeApiKeyVerifyArn,
  }

  Object.values(QueueNames).forEach((queueKey) => {
    env[`${queueKey}_URL`] = queues[queueKey].queueUrl
    env[`${queueKey}_ARN`] = queues[queueKey].queueArn
  })

  env['CODEBUILD_PIPELINE_UPDATE_TOPIC_ARN'] = codebuildSnsTopic.topicArn

  // const authorizerLambda = createFunction(
  //   stack,
  //   'deployment-service-authorizer-lambda',
  //   path.resolve(__dirname, '..', '..', 'dist', 'authorizer'),
  //   'authorizer/index.handler',
  //   {
  //     ISSUERS: config.ISSUERS,
  //     CLIENT_ID: config.COGNITO_CLIENT_ID,
  //     CONNECT_USER_POOL: config.CONNECT_USER_POOL,
  //   },
  //   undefined,
  //   undefined,
  //   512,
  //   aws_lambda.Runtime.NODEJS_18_X,
  // )

  // const authorizer = new aws_apigateway.RequestAuthorizer(stack, 'deployment-service-authorizer', {
  //   handler: authorizerLambda,
  //   identitySources: [aws_apigateway.IdentitySource.header('authorization')],
  //   resultsCacheTtl: cdk.Duration.seconds(0),
  // })

  for (const [name, options] of Object.entries(functionSetups)) {
    const lambda = createLambda({
      entrypoint: options.entrypoint,
      stack,
      name,
      handler: options.handler,
      env,
      vpc,
      duration: options.timeout,
      ram: options.RAM,
      runtime: aws_lambda.Runtime.NODEJS_18_X,
    })
    options.policies.forEach((policy) => lambda.addToRolePolicy(policy))

    if (options.queues) {
      options.queues.forEach((queue) => addLambdaSQSTrigger(lambda, queue as Queue))
    } else if (options.api) {
      addLambdaToApi(
        stack,
        api,
        lambda,
        options.api.routes,
        options.api.authorizer ? config.CONNECT_USER_POOL : undefined,
        undefined,
      )
    } else if (options.topic) {
      addLambdaSNSTrigger(lambda, options.topic)
    }
  }

  /**
   * NOTE: In order to make a successful deployment, migrations must be removed for the first deloy
   * thereafter, the migration script can be added
   *
   * This seems to be because the db isn't avaiable when then migrations wants to run. Potential fix
   * is to add the migration script to a second stack which required the first stack
   */

  const migrationHandler = createLambda({
    stack,
    name: 'cloud-deployment-migration',
    entrypoint: 'bundle/migration-run.zip',
    handler: createFileLoc('migration-run', 'migrationRun'),
    runtime: aws_lambda.Runtime.NODEJS_18_X,
    env,
    vpc,
  })

  policies.commonBackendPolicies.forEach((policy) => migrationHandler.addToRolePolicy(policy))

  Object.values(policies)
    .filter((policy) => policy instanceof PolicyStatement)
    .forEach((policy) => migrationHandler.addToRolePolicy(policy as PolicyStatement))

  const numberOfMigrations = await getNumberOfMigrations()

  createStackEventHandler(stack, 'migration-event', migrationHandler, `${numberOfMigrations}`)
}
