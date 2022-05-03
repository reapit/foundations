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
  queue?: sqs.IQueue
  topic?: Topic
  role?: Role
}

export const createStack = () => {
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

  const fileLocPrefix = 'packages/deployment-service/src/index.'

  const functionSetups: { [s: string]: FunctionSetup } = {
    pipelineCreate: {
      handler: `${fileLocPrefix}pipelineCreate`,
      policies: [...policies.commonBackendPolicies],
      api: {
        routes: {
          method: 'POST',
          path: 'pipeline',
        },
        cors: {
          origin: '*',
        },
        headers: ['Content-Type', 'Authorization', 'api-version'],
        authorizer: true,
      },
    },
    apiPipelineCreate: {
      handler: `${fileLocPrefix}pipelineCreate`,
      policies: [...policies.commonBackendPolicies],
      api: {
        routes: {
          method: 'POST',
          path: 'api/pipeline',
        },
        cors: {
          origin: '*',
        },
        headers: ['Content-Type', 'Authorization', 'X-Api-Key', 'api-version'],
      },
    },
    pipelineUpdate: {
      handler: `${fileLocPrefix}pipelineUpdate`,
      policies: [...policies.commonBackendPolicies],
      api: {
        routes: {
          method: 'PUT',
          path: 'pipeline/{pipelineId}',
        },
        cors: {
          origin: '*',
        },
        headers: ['Content-Type', 'Authorization', 'api-version'],
        authorizer: true,
      },
    },
    apiPipelineUpdate: {
      handler: `${fileLocPrefix}pipelineUpdate`,
      policies: [...policies.commonBackendPolicies],
      api: {
        routes: {
          method: 'PUT',
          path: 'api/pipeline/{pipelineId}',
        },
        cors: {
          origin: '*',
        },
        headers: ['Content-Type', 'Authorization', 'X-Api-Key', 'api-version'],
      },
    },
    pipelineGet: {
      handler: `${fileLocPrefix}pipelineGet`,
      policies: [...policies.commonBackendPolicies],
      api: {
        routes: {
          method: 'GET',
          path: 'pipeline/{pipelineId}',
        },
        cors: {
          origin: '*',
        },
        headers: ['Content-Type', 'Authorization', 'api-version'],
        authorizer: true,
      },
    },
    apiPipelineGet: {
      handler: `${fileLocPrefix}pipelineGet`,
      policies: [...policies.commonBackendPolicies],
      api: {
        routes: {
          method: 'GET',
          path: 'api/pipeline/{pipelineId}',
        },
        cors: {
          origin: '*',
        },
        headers: ['Content-Type', 'Authorization', 'X-Api-Key', 'api-version'],
      },
    },
    pipelineDelete: {
      handler: `${fileLocPrefix}pipelineDelete`,
      policies: [...policies.commonBackendPolicies],
      api: {
        routes: {
          method: 'DELETE',
          path: 'pipeline/{pipelineId}',
        },
        cors: {
          origin: '*',
        },
        headers: ['Content-Type', 'Authorization', 'api-version'],
        authorizer: true,
      },
    },
    apiPipelineDelete: {
      handler: `${fileLocPrefix}pipelineDelete`,
      policies: [...policies.commonBackendPolicies],
      api: {
        routes: {
          method: 'DELETE',
          path: 'api/pipeline/{pipelineId}',
        },
        cors: {
          origin: '*',
        },
        headers: ['Content-Type', 'Authorization', 'X-Api-Key', 'api-version'],
      },
    },
    pipelinePaginate: {
      handler: `${fileLocPrefix}pipelinePaginate`,
      policies: [...policies.commonBackendPolicies],
      api: {
        routes: {
          method: 'GET',
          path: 'pipeline',
        },
        cors: {
          origin: '*',
        },
        headers: ['Content-Type', 'Authorization', 'api-version'],
        authorizer: true,
      },
    },
    apiPipelinePaginate: {
      handler: `${fileLocPrefix}pipelinePaginate`,
      policies: [...policies.commonBackendPolicies],
      api: {
        routes: {
          method: 'GET',
          path: 'api/pipeline',
        },
        cors: {
          origin: '*',
        },
        headers: ['Content-Type', 'Authorization', 'X-Api-Key', 'api-version'],
      },
    },
    pipelineRunnerCreate: {
      handler: `${fileLocPrefix}pipelineRunnerCreate`,
      policies: [...policies.commonBackendPolicies],
      api: {
        routes: {
          method: 'POST',
          path: 'pipeline/{pipelineId}/pipeline-runner',
        },
        cors: {
          origin: '*',
        },
        headers: ['Content-Type', 'Authorization', 'api-version'],
        authorizer: true,
      },
    },
    apiPipelineRunnerCreate: {
      handler: `${fileLocPrefix}pipelineRunnerCreate`,
      policies: [...policies.commonBackendPolicies],
      api: {
        routes: {
          method: 'POST',
          path: 'api/pipeline/{pipelineId}/pipeline-runner',
        },
        cors: {
          origin: '*',
        },
        headers: ['Content-Type', 'Authorization', 'X-Api-Key', 'api-version'],
      },
    },
    pipelineRunnerUpdate: {
      handler: `${fileLocPrefix}pipelineRunnerUpdate`,
      policies: [...policies.commonBackendPolicies],
      api: {
        routes: {
          method: 'PUT',
          path: 'pipeline/{pipelineId}/pipeline-runner',
        },
        cors: {
          origin: '*',
        },
        headers: ['Content-Type', 'Authorization', 'api-version'],
        authorizer: true,
      },
    },
    apiPipelineRunnerUpdate: {
      handler: `${fileLocPrefix}pipelineRunnerUpdate`,
      policies: [...policies.commonBackendPolicies],
      api: {
        routes: {
          method: 'PUT',
          path: 'api/pipeline/{pipelineId}/pipeline-runner',
        },
        cors: {
          origin: '*',
        },
        headers: ['Content-Type', 'Authorization', 'X-Api-Key', 'api-version'],
      },
    },
    pipelineRunnerPaginate: {
      handler: `${fileLocPrefix}pipelineRunnerPaginate`,
      policies: [...policies.commonBackendPolicies],
      api: {
        routes: {
          method: 'GET',
          path: 'pipeline/{pipelineId}/pipeline-runner',
        },
        cors: {
          origin: '*',
        },
        headers: ['Content-Type', 'Authorization', 'api-version'],
        authorizer: true,
      },
    },
    apiPipelineRunnerPaginate: {
      handler: `${fileLocPrefix}pipelineRunnerPaginate`,
      policies: [...policies.commonBackendPolicies],
      api: {
        routes: {
          method: 'GET',
          path: 'api/pipeline/{pipelineId}/pipeline-runner',
        },
        cors: {
          origin: '*',
        },
        headers: ['Content-Type', 'Authorization', 'X-Api-Key', 'api-version'],
      },
    },
    deployRelease: {
      handler: `${fileLocPrefix}deployRelease`,
      policies: [...policies.commonBackendPolicies, policies.cloudFrontPolicy],
      api: {
        routes: {
          method: 'POST',
          path: 'release/{pipelineId}/{version}',
        },
        cors: {
          origin: '*',
        },
        headers: ['Content-Type', 'Authorization', 'api-version'],
        authorizer: true,
      },
      timeout: 300,
    },
    apiDeployRelease: {
      handler: `${fileLocPrefix}deployRelease`,
      policies: [...policies.commonBackendPolicies, policies.cloudFrontPolicy],
      api: {
        routes: {
          method: 'POST',
          path: 'api/release/{pipelineId}/{version}',
        },
        cors: {
          origin: '*',
        },
        headers: ['Content-Type', 'Authorization', 'X-Api-Key', 'api-version'],
      },
      timeout: 300,
    },
    deployVersion: {
      handler: `${fileLocPrefix}deployVersion`,
      policies: [...policies.commonBackendPolicies, policies.cloudFrontPolicy],
      api: {
        routes: {
          method: 'POST',
          path: 'deploy/version/{pipelineRunnerId}',
        },
        cors: {
          origin: '*',
        },
        headers: ['Content-Type', 'Authorization', 'api-version'],
        authorizer: true,
      },
    },
    apiDeployVersion: {
      handler: `${fileLocPrefix}deployVersion`,
      policies: [...policies.commonBackendPolicies, policies.cloudFrontPolicy],
      api: {
        routes: {
          method: 'POST',
          path: 'api/deploy/version/{pipelineRunnerId}',
        },
        cors: {
          origin: '*',
        },
        headers: ['Content-Type', 'Authorization', 'X-Api-Key', 'api-version'],
      },
    },
    codebuildExecutor: {
      handler: `${fileLocPrefix}codebuildExecutor`,
      policies: [...policies.commonBackendPolicies],
      queue: queues[QueueNames.CODEBUILD_EXECUTOR],
    },
    codebuildUpdate: {
      handler: `${fileLocPrefix}codebuildPipelineUpdater`,
      policies: [...policies.commonBackendPolicies],
      topic: codebuildSnsTopic,
      timeout: 900,
    },
    codebuildDeploy: {
      handler: `${fileLocPrefix}codebuildDeploy`,
      policies: [...policies.commonBackendPolicies, policies.cloudFrontPolicy],
      timeout: 600,
      RAM: 2048,
      queue: queues[QueueNames.CODEBUILD_VERSION_DEPLOY],
    },
    pipelineSetup: {
      handler: `${fileLocPrefix}pipelineSetup`,
      policies: [...policies.commonBackendPolicies, policies.cloudFrontPolicy, policies.route53Policy],
      timeout: 900,
      queue: queues[QueueNames.PIPELINE_SETUP],
    },
    pipelineTearDownStart: {
      handler: `${fileLocPrefix}pipelineTearDownStart`,
      queue: queues[QueueNames.PIPELINE_TEAR_DOWN_START],
      timeout: 300,
      policies: [...policies.commonBackendPolicies, policies.cloudFrontPolicy],
    },
    pipelineTearDown: {
      handler: `${fileLocPrefix}pipelineTearDown`,
      queue: queues[QueueNames.PIPELINE_TEAR_DOWN],
      timeout: 600,
      policies: [...policies.commonBackendPolicies, policies.cloudFrontPolicy, policies.route53Policy],
    },
    pusherAuth: {
      handler: `${fileLocPrefix}pusherAuthentication`,
      policies: [...policies.commonBackendPolicies],
      api: {
        routes: {
          method: 'POST',
          path: 'pusher/auth',
        },
        cors: {
          origin: '*',
        },
        headers: ['Content-Type', 'Authorization', 'api-version'],
        authorizer: true,
      },
    },
    apiPusherAuth: {
      handler: `${fileLocPrefix}pusherAuthentication`,
      policies: [...policies.commonBackendPolicies],
      api: {
        routes: {
          method: 'POST',
          path: 'api/pusher/auth',
        },
        cors: {
          origin: '*',
        },
        headers: ['Content-Type', 'Authorization', 'api-version', 'X-Api-Key'],
      },
    },
    githubWebhook: {
      handler: `${fileLocPrefix}githubWebhook`,
      policies: [...policies.commonBackendPolicies],
      api: {
        routes: {
          method: 'POST',
          path: 'api/github',
        },
        cors: {
          origin: '*',
        },
        headers: ['Content-Type', 'Authorization', 'api-version', 'X-Api-Key'],
      },
    },
    bitbucketConfig: {
      handler: `${fileLocPrefix}bitbucketConfig`,
      policies: [...policies.commonBackendPolicies],
      api: {
        routes: {
          method: 'GET',
          path: 'api/bitbucket',
        },
        cors: {
          origin: '*',
        },
        headers: ['Content-Type', 'Authorization', 'api-version', 'X-Api-Key'],
      },
    },
    bitbucketWebhook: {
      handler: `${fileLocPrefix}bitbucketWebhook`,
      policies: [...policies.commonBackendPolicies],
      api: {
        routes: [
          {
            method: 'POST',
            path: 'api/bitbucket/{proxy+}',
          },
          {
            method: 'POST',
            path: 'api/bitbucket',
          },
        ],
        cors: {
          origin: '*',
        },
        headers: ['Content-Type', 'Authorization', 'api-version', 'X-Api-Key'],
      },
    },
    appEventsHandler: {
      handler: `${fileLocPrefix}appEventsHandler`,
      policies: [...policies.commonBackendPolicies],
      queue: queues[QueueNames.APP_EVENTS],
    },
    parameterStoreUpsert: {
      handler: `${fileLocPrefix}parameterUpsert`,
      policies: [...policies.commonBackendPolicies],
      api: {
        routes: [
          {
            method: 'PUT',
            path: '/pipeline/{pipelineId}/parameter',
          },
        ],
        cors: {
          origin: '*',
        },
        headers: ['Content-Type', 'Authorization', 'api-version'],
      },
    },
    apiParameterStoreUpsert: {
      handler: `${fileLocPrefix}parameterUpsert`,
      policies: [...policies.commonBackendPolicies],
      api: {
        routes: [
          {
            method: 'PUT',
            path: 'api/pipeline/{pipelineId}/parameter',
          },
        ],
        cors: {
          origin: '*',
        },
        headers: ['Content-Type', 'Authorization', 'api-version', 'X-Api-Key'],
      },
    },
    parameterKeys: {
      handler: `${fileLocPrefix}parameterKeys`,
      policies: [...policies.commonBackendPolicies],
      api: {
        routes: [
          {
            method: 'GET',
            path: '/pipeline/{pipelineId}/parameter',
          },
        ],
        cors: {
          origin: '*',
        },
        headers: ['Content-Type', 'Authorization', 'api-version'],
      },
    },
    apiParameterKeys: {
      handler: `${fileLocPrefix}parameterKeys`,
      policies: [...policies.commonBackendPolicies],
      api: {
        routes: [
          {
            method: 'GET',
            path: 'api/pipeline/{pipelineId}/parameter',
          },
        ],
        cors: {
          origin: '*',
        },
        headers: ['Content-Type', 'Authorization', 'api-version', 'X-Api-Key'],
      },
    },
  }

  const MYSQL_DATABASE = databaseName

  const env: any = {
    DATABASE_SECERT_ARN: secretManager.secretArn,
    MYSQL_DATABASE,
    DEPLOYMENT_LIVE_BUCKET_NAME: buckets['cloud-deployment-live'].bucketName,
    DEPLOYMENT_VERSION_BUCKET_NAME: buckets['cloud-deployment-version'].bucketName,
    DEPLOYMENT_LOG_BUCKET_NAME: buckets['cloud-deployment-log'].bucketName,
    DEPLOYMENT_REPO_CACHE_BUCKET_NAME: buckets['cloud-deployment-repo-cache'].bucketName,
    REGION: 'eu-west-2',
    CODE_BUILD_PROJECT_NAME: codeBuild.projectName,
    USERCODE_ROLE_ARN: policies.usercodeStackRoleArn,
    GITHUB_PEM_SECRET_ARN: githubPemSecret.ref,
    NODE_ENV: process.env.APP_STAGE,
  }

  Object.values(QueueNames).map((queueKey) => {
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

    if (options.queue) {
      addLambdaSQSTrigger(lambda, options.queue as Queue)
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
    handler: `${fileLocPrefix}migrationRun`,
    env,
    vpc,
  })

  Object.values(policies)
    .filter((policy) => policy instanceof PolicyStatement)
    .forEach((policy) => migrationHandler.addToRolePolicy(policy as PolicyStatement))

  createStackEventHandler(stack, 'migration-event', migrationHandler)
}
