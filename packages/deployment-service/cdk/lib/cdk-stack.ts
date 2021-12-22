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
    component: 'service-josh',
  })
  const api = createApi(stack, 'apigateway', undefined, undefined, true)
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

  const functionSetups: { [s: string]: FunctionSetup } = {
    pipelineCreate: {
      handler: 'main.pipelineCreate',
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
      handler: 'main.pipelineCreate',
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
      handler: 'main.pipelineUpdate',
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
      handler: 'main.pipelineUpdate',
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
      handler: 'main.pipelineGet',
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
      handler: 'main.pipelineGet',
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
      handler: 'main.pipelineDelete',
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
      handler: 'main.pipelineDelete',
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
      handler: 'main.pipelinePaginate',
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
      handler: 'main.pipelinePaginate',
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
      handler: 'main.pipelineRunnerCreate',
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
      handler: 'main.pipelineRunnerCreate',
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
      handler: 'main.pipelineRunnerUpdate',
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
      handler: 'main.pipelineRunnerUpdate',
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
      handler: 'main.pipelineRunnerPaginate',
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
      handler: 'main.pipelineRunnerPaginate',
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
      handler: 'main.deployRelease',
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
    },
    apiDeployRelease: {
      handler: 'main.deployRelease',
      policies: [...policies.commonBackendPolicies, policies.cloudFrontPolicy],
      api: {
        method: 'POST',
        path: 'api/release/{pipelineId}/{version}',
        cors: {
          origin: '*',
        },
        headers: ['Content-Type', 'Authorization', 'X-Api-Key', 'api-version'],
      },
    },
    deployVersion: {
      handler: 'main.deployVersion',
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
      handler: 'main.deployVersion',
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
      handler: 'main.codebuildExecutor',
      policies: [...policies.commonBackendPolicies, policies.codebuildExecPolicy],
      queue: queues[QueueNames.CODEBUILD_EXECUTOR],
    },
    codebuildUpdate: {
      handler: 'main.codebuildPipelineUpdater',
      policies: [...policies.commonBackendPolicies],
      topic,
      timeout: 300,
    },
    codebuildDeploy: {
      handler: 'main.codebuildDeploy',
      policies: [...policies.commonBackendPolicies, policies.cloudFrontPolicy],
      timeout: 300,
      queue: queues[QueueNames.CODEBUILD_DEPLOY],
    },
    pipelineSetup: {
      handler: 'main.pipelineSetup',
      policies: [...policies.commonBackendPolicies, policies.cloudFrontPolicy, policies.route53Policy],
      timeout: 300,
      queue: queues[QueueNames.PIPELINE_SETUP],
    },
    pipelineTearDownStart: {
      handler: 'main.pipelineTearDownStart',
      queue: queues[QueueNames.PIPELINE_TEAR_DOWN_START],
      timeout: 300,
      policies: [...policies.commonBackendPolicies, policies.cloudFrontPolicy],
    },
    pipelineTearDown: {
      handler: 'main.pipelineTearDown',
      queue: queues[QueueNames.PIPELINE_TEAR_DOWN],
      timeout: 300,
      policies: [...policies.commonBackendPolicies],
    },
    pusherAuth: {
      handler: 'main.pusherAuthentication',
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
      handler: 'main.pusherAuthentication',
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
  }

  const MYSQL_DATABASE = databaseName

  const env = {
    DATABASE_SECERT_ARN: secretManager.secretArn,
    MYSQL_DATABASE,
    DEPLOYMENT_LIVE_BUCKET_NAME: buckets['cloud-deployment-live-dev'].bucketName,
    DEPLOYMENT_VERSION_BUCKET_NAME: buckets['cloud-deployment-version-dev'].bucketName,
    DEPLOYMENT_LOG_BUCKET_NAME: buckets['cloud-deployment-log-dev'].bucketName,
    REGION: 'eu-west-2',
    CODE_BUILD_PROJECT_NAME: codeBuild.projectName,
  }

  for (const [name, options] of Object.entries(functionSetups)) {
    const lambda = createLambda({
      stack,
      name,
      entrypoint: path.resolve('dist', 'main.zip'),
      handler: options.handler,
      env,
      vpc,
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

  const migrationHandler = createLambda({
    stack,
    name: 'cloud-deployment-migration',
    entrypoint: path.resolve('dist', 'main.zip'),
    handler: 'main.migrationRun',
    env,
    vpc,
  })

  Object.values(policies)
    .filter((policy) => policy instanceof PolicyStatement)
    .forEach((policy) => migrationHandler.addToRolePolicy(policy as PolicyStatement))

  createStackEventHandler(stack, 'migration-event', migrationHandler)
}
