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
import { aws_sqs as sqs } from 'aws-cdk-lib'

import { createLambda } from './create-lambda'
import { createS3Buckets } from './create-S3-bucket'
import { createSqsQueues, QueueNames } from './create-sqs'
import { createPolicies } from './create-policies'
import { Role } from 'aws-cdk-lib/aws-iam'
import config from '../../config.json'

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

  const createFileLoc = (file: string, func: string) => `packages/deployment-service/src/${file}.${func}`

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
    },
    appEvents: {
      handler: createFileLoc('sqs', 'handle'),
      policies: [...policies.commonBackendPolicies, policies.cloudFrontPolicy, policies.route53Policy],
      queues: [queues[QueueNames.APP_EVENTS]],
    },
    sns: {
      handler: createFileLoc('sns', 'handle'),
      policies: [...policies.commonBackendPolicies],
      topic: codebuildSnsTopic,
      timeout: 900,
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
    },
  }

  const MYSQL_DATABASE = databaseName

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
  }

  Object.values(QueueNames).forEach((queueKey) => {
    env[`${queueKey}_URL`] = queues[queueKey].queueUrl
    env[`${queueKey}_ARN`] = queues[queueKey].queueArn
  })

  env['CODEBUILD_PIPELINE_UPDATE_TOPIC_ARN'] = codebuildSnsTopic.topicArn

  for (const [name, options] of Object.entries(functionSetups)) {
    const lambda = createLambda({
      stack,
      name,
      entrypoint: path.resolve('bundle.zip'),
      handler: options.handler,
      env,
      vpc,
      duration: options.timeout,
      ram: options.RAM,
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
        // @ts-ignore
        options.api.authorizer ? (config.AUTHORIZER_ID as string) : undefined,
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
    entrypoint: path.resolve('bundle.zip'),
    handler: createFileLoc('migration-run', 'migrationRun'),
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
