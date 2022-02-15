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
  Queue,
} from '@reapit/ts-scripts/src/cdk'

import { createLambda } from './create-lambda'
import { createS3Buckets } from './create-S3-bucket'
import { createSqsQueues, QueueNames } from './create-sqs'
import { createPolicies } from './create-policies'

export const databaseName = 'deployment_service'

type FunctionSetup = {
  handler: string
  policies: PolicyStatement[]
  timeout?: number
  api?: {
    method: string
    path: string
    cors: {
      origin: string
    }
    headers: string[]
    authorizer?: boolean
  }
  queue?: Queue
  topic?: Topic
}

export const createStack = () => {
  const stack = createBaseStack({
    namespace: 'cloud',
    appName: 'deployment',
    component: 'service',
  })
  const api = createApi(stack, 'apigateway', undefined)
  const vpc = createVpc(stack, 'vpc')
  const buckets = createS3Buckets(stack)
  const queues = createSqsQueues(stack)
  const database = createDatabase(stack, 'database', databaseName, vpc)
  const secretManager = database.secret

  if (!secretManager) {
    throw new Error('Failed to create rds secret')
  }

  const codeBuild = createCodeBuildProject(stack, 'codebuild')
  const topic = getCodebuildSnsTopic(stack)

  const policies = createPolicies({
    buckets,
    queues,
    secretManager,
    codeBuild,
  })

  const fileLocPrefix = 'packages/deployment-service/src/index.'

  const functionSetups: { [s: string]: FunctionSetup } = {
    pipelineCreate: {
      handler: `${fileLocPrefix}pipelineCreate`,
      policies: [...policies.commonBackendPolicies],
      api: {
        method: 'POST',
        path: 'pipeline',
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
        method: 'POST',
        path: 'api/pipeline',
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
        method: 'PUT',
        path: 'pipeline/{pipelineId}',
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
        method: 'PUT',
        path: 'api/pipeline/{pipelineId}',
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
        method: 'GET',
        path: 'pipeline/{pipelineId}',
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
        method: 'GET',
        path: 'api/pipeline/{pipelineId}',
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
        method: 'DELETE',
        path: 'pipeline/{pipelineId}',
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
        method: 'DELETE',
        path: 'api/pipeline/{pipelineId}',
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
        method: 'GET',
        path: 'pipeline',
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
        method: 'GET',
        path: 'api/pipeline',
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
        method: 'POST',
        path: 'pipeline/{pipelineId}/pipeline-runner',
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
        method: 'POST',
        path: 'api/pipeline/{pipelineId}/pipeline-runner',
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
        method: 'PUT',
        path: 'pipeline/{pipelineId}/pipeline-runner',
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
        method: 'PUT',
        path: 'api/pipeline/{pipelineId}/pipeline-runner',
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
        method: 'GET',
        path: 'pipeline/{pipelineId}/pipeline-runner',
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
        method: 'GET',
        path: 'api/pipeline/{pipelineId}/pipeline-runner',
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
        method: 'POST',
        path: 'release/{pipelineId}/{version}',
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
        method: 'POST',
        path: 'api/release/{pipelineId}/{version}',
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
        method: 'POST',
        path: 'deploy/version/{pipelineRunnerId}',
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
        method: 'POST',
        path: 'api/deploy/version/{pipelineRunnerId}',
        cors: {
          origin: '*',
        },
        headers: ['Content-Type', 'Authorization', 'X-Api-Key', 'api-version'],
      },
    },
    codebuildExecutor: {
      handler: `${fileLocPrefix}codebuildExecutor`,
      policies: [...policies.commonBackendPolicies, policies.codebuildExecPolicy],
      queue: queues[QueueNames.CODEBUILD_EXECUTOR],
    },
    codebuildUpdate: {
      handler: `${fileLocPrefix}codebuildPipelineUpdater`,
      policies: [...policies.commonBackendPolicies],
      topic,
      timeout: 900,
    },
    codebuildDeploy: {
      handler: `${fileLocPrefix}codebuildDeploy`,
      policies: [...policies.commonBackendPolicies, policies.cloudFrontPolicy],
      timeout: 300,
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
      timeout: 300,
      policies: [...policies.commonBackendPolicies],
    },
    pusherAuth: {
      handler: `${fileLocPrefix}pusherAuthentication`,
      policies: [...policies.commonBackendPolicies],
      api: {
        method: 'POST',
        path: 'pusher/auth',
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
        method: 'POST',
        path: 'api/pusher/auth',
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
        method: 'POST',
        path: 'api/github',
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
    DEPLOYMENT_LIVE_BUCKET_NAME: buckets['cloud-deployment-live-dev'].bucketName,
    DEPLOYMENT_VERSION_BUCKET_NAME: buckets['cloud-deployment-version-dev'].bucketName,
    DEPLOYMENT_LOG_BUCKET_NAME: buckets['cloud-deployment-log-dev'].bucketName,
    DEPLOYMENT_REPO_CACHE_BUCKET_NAME: buckets['cloud-deployment-repo-cache-dev'].bucketName,
    REGION: 'eu-west-2',
    CODE_BUILD_PROJECT_NAME: codeBuild.projectName,
  }

  Object.values(QueueNames).map((queueKey) => {
    env[queueKey] = queues[queueKey].queueUrl
  })

  for (const [name, options] of Object.entries(functionSetups)) {
    const lambda = createLambda({
      stack,
      name,
      entrypoint: path.resolve('bundle.zip'),
      handler: options.handler,
      env,
      vpc,
      duration: options.timeout,
    })
    options.policies.forEach((policy) => lambda.addToRolePolicy(policy))

    if (options.queue) {
      addLambdaSQSTrigger(lambda, options.queue)
    } else if (options.api) {
      addLambdaToApi(
        stack,
        api,
        lambda,
        options.api.path,
        options.api.method,
        // TODO: env
        options.api.authorizer ? 'eu-west-2_kiftR4qFc' : undefined,
      )
    } else if (options.topic) {
      addLambdaSNSTrigger(lambda, topic)
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
    handler: `${fileLocPrefix}.migrationRun`,
    env,
    vpc,
  })

  Object.values(policies)
    .filter((policy) => policy instanceof PolicyStatement)
    .forEach((policy) => migrationHandler.addToRolePolicy(policy as PolicyStatement))

  createStackEventHandler(stack, 'migration-event', migrationHandler)
}
