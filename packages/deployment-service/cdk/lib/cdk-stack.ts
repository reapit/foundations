import { AssetCode } from '@aws-cdk/aws-lambda'
import * as cdk from '@aws-cdk/core'
import { createLambda } from './create-lambda'
import * as path from 'path'
import { PolicyStatement } from '@aws-cdk/aws-iam'
import { Queue } from '@aws-cdk/aws-sqs'
import { createS3Buckets } from './create-S3-bucket'
import { createSqsQueues, QueueNames } from './create-sqs'
import { createAurora, databaseName } from './create-aurora'
import { Port, Vpc } from '@aws-cdk/aws-ec2'
import { createCodeBuildProject } from './create-code-build'
import { createApigateway } from './create-apigateway'
import { SqsEventSource } from '@aws-cdk/aws-lambda-event-sources'
import { AuthorizationType, CognitoUserPoolsAuthorizer, LambdaIntegration } from '@aws-cdk/aws-apigateway'
import { createPolicies } from './create-policies'
import { Topic } from '@aws-cdk/aws-sns'
import { LambdaSubscription } from '@aws-cdk/aws-sns-subscriptions'
import { UserPool } from '@aws-cdk/aws-cognito'
import { Provider } from '@aws-cdk/custom-resources'
import { RetentionDays } from '@aws-cdk/aws-logs'
import { CustomResource } from '@aws-cdk/core'

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

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const vpc = new Vpc(this as any, 'deployment-service-vpc')
    const buckets = createS3Buckets(this)
    const queues = createSqsQueues(this)
    const [secretManager, aurora] = createAurora(this, vpc)
    const [codeBuild, topic] = createCodeBuildProject(this)
    const api = createApigateway(this)

    const policies = createPolicies({
      buckets,
      queues,
      secretManager,
      codeBuild,
      aurora,
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
        policies: [...policies.commonBackendPolicies],
        api: {
          method: 'POST',
          path: 'deploy/release/{project}/{version}',
          cors: {
            origin: '*',
          },
          headers: ['Content-Type', 'Authorization', 'api-version'],
          authorizer: true,
        },
      },
      apiDeployRelease: {
        handler: 'main.deployRelease',
        policies: [...policies.commonBackendPolicies],
        api: {
          method: 'POST',
          path: 'api/deploy/release/{project}/{version}',
          cors: {
            origin: '*',
          },
          headers: ['Content-Type', 'Authorization', 'X-Api-Key', 'api-version'],
        },
      },
      releasePaginate: {
        handler: 'main.releasePaginate',
        policies: [...policies.commonBackendPolicies],
        api: {
          method: 'GET',
          path: 'deploy/release/{project}',
          cors: {
            origin: '*',
          },
          headers: ['Content-Type', 'Authorization', 'api-version'],
          authorizer: true,
        },
      },
      apiReleasePaginate: {
        handler: 'main.releasePaginate',
        policies: [...policies.commonBackendPolicies],
        api: {
          method: 'GET',
          path: 'api/deploy/release/{project}',
          cors: {
            origin: '*',
          },
          headers: ['Content-Type', 'Authorization', 'X-Api-Key', 'api-version'],
        },
      },
      deployVersion: {
        handler: 'main.deployVersion',
        policies: [...policies.commonBackendPolicies],
        api: {
          method: 'POST',
          path: 'deploy/version/{projectName}/{version}',
          cors: {
            origin: '*',
          },
          headers: ['Content-Type', 'Authorization', 'api-version'],
          authorizer: true,
        },
      },
      apiDeployVersion: {
        handler: 'main.deployVersion',
        policies: [...policies.commonBackendPolicies],
        api: {
          method: 'POST',
          path: 'api/deploy/version/{projectName}/{version}',
          cors: {
            origin: '*',
          },
          headers: ['Content-Type', 'Authorization', 'X-Api-Key', 'api-version'],
        },
      },
      releaseProjectPagination: {
        handler: 'main.projectPaginate',
        policies: [...policies.commonBackendPolicies],
        api: {
          method: 'GET',
          path: 'deploy/project',
          cors: {
            origin: '*',
          },
          headers: ['Content-Type', 'Authorization', 'api-version'],
          authorizer: true,
        },
      },
      apiReleaseProjectPagination: {
        handler: 'main.projectPaginate',
        policies: [...policies.commonBackendPolicies],
        api: {
          method: 'GET',
          path: 'api/deploy/project',
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
        handler: 'main.codebuildUpdate',
        policies: [...policies.commonBackendPolicies],
        topic,
        timeout: 300,
      },
      codebuildDeploy: {
        handler: 'main.codebuildDeploy',
        policies: [...policies.commonBackendPolicies],
        timeout: 300,
        queue: queues[QueueNames.CODEBUILD_DEPLOY],
      },
      pipelineSetup: {
        handler: 'main.pipelineSetup',
        policies: [...policies.commonBackendPolicies],
        timeout: 300,
        queue: queues[QueueNames.PIPELINE_SETUP],
      },
      pipelineTearDownStart: {
        handler: 'main.pipelineTearDownStart',
        queue: queues[QueueNames.PIPELINE_TEAR_DOWN_START],
        timeout: 300,
        policies: [...policies.commonBackendPolicies],
      },
      pipelineTearDown: {
        handler: 'main.pipelineTearDown',
        queue: queues[QueueNames.PIPELINE_TEAR_DOWN],
        timeout: 300,
        policies: [...policies.commonBackendPolicies],
      },
      pusherAuth: {
        handler: 'main.pusherAuth',
        policies: [...policies.commonBackendPolicies],
        api: {
          method: 'GET',
          path: 'pusher/auth',
          cors: {
            origin: '*',
          },
          headers: ['Content-Type', 'Authorization', 'api-version'],
          authorizer: true,
        },
      },
    }

    const authorizer = new CognitoUserPoolsAuthorizer(this as any, 'cloud-deployment-service-authorizer', {
      cognitoUserPools: [UserPool.fromUserPoolId(this, 'user-pool-authorizer', 'kiftR4qFc')],
    })

    const MYSQL_USERNAME = secretManager.secretValueFromJson('username').toString()
    const MYSQL_PASSWORD = secretManager.secretValueFromJson('password').toString()
    const MYSQL_HOST = secretManager.secretValueFromJson('host').toString()
    const MYSQL_DATABASE = databaseName

    for (const [name, options] of Object.entries(functionSetups)) {
      const lambda = createLambda({
        stack: this,
        name: `${id}-cloud-deployment-${name}`,
        code: AssetCode.fromAsset(path.resolve('dist', 'main.zip')),
        vpc,
        handler: options.handler,
        env: {
          MYSQL_PASSWORD,
          MYSQL_USERNAME,
          MYSQL_HOST,
          MYSQL_DATABASE,
        },
      })
      options.policies.forEach((policy) => lambda.addToRolePolicy(policy))

      lambda.connections.allowTo(aurora.connections, Port.tcp(3306))
      aurora.connections.allowFrom(lambda.connections, Port.tcp(3306))

      if (options.queue) {
        lambda.addEventSource(new SqsEventSource(options.queue))
      } else if (options.api) {
        api.root.resourceForPath(options.api.path).addMethod(options.api.method, new LambdaIntegration(lambda), {
          authorizer: options.api.authorizer ? authorizer : undefined,
          authorizationType: options.api.authorizer ? AuthorizationType.COGNITO : undefined,
        })
      } else if (options.topic) {
        topic.addSubscription(new LambdaSubscription(lambda))
      }
    }

    const migrationHandler = createLambda({
      stack: this,
      name: 'cloud-deployment-migration',
      code: AssetCode.fromAsset(path.resolve('dist', 'main.zip')),
      vpc,
      handler: 'main.migrationRun',
      env: {
        MYSQL_PASSWORD,
        MYSQL_USERNAME,
        MYSQL_HOST,
        MYSQL_DATABASE,
      },
    })

    migrationHandler.connections.allowTo(aurora.connections, Port.tcp(3306))
    aurora.connections.allowFrom(migrationHandler.connections, Port.tcp(3306))

    Object.values(policies)
      .filter((policy) => policy instanceof PolicyStatement)
      .forEach((policy) => migrationHandler.addToRolePolicy(policy as PolicyStatement))

    const resourceProvider = new Provider(this, 'custom-resource', {
      onEventHandler: migrationHandler,
      logRetention: RetentionDays.ONE_DAY,
    })

    new CustomResource(this, 'migration-resource', {
      serviceToken: resourceProvider.serviceToken,
    })
  }
}
