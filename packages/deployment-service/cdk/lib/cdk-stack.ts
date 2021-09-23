import { AssetCode } from '@aws-cdk/aws-lambda'
import * as cdk from '@aws-cdk/core'
import { createLambda } from './create-lambda'
import * as path from 'path'
import { PolicyStatement, Role, ServicePrincipal } from '@aws-cdk/aws-iam'
import { Queue } from '@aws-cdk/aws-sqs'
import { createS3Buckets } from './create-S3-bucket'
import { createSqsQueues } from './create-sqs'
import { createAurora } from './create-aurora'
import { Peer, Port, SecurityGroup, Subnet, Vpc } from '@aws-cdk/aws-ec2'
import { createCodeBuildProject } from './create-code-build'
import { createApigateway } from './create-apigateway'
import { SqsEventSource } from '@aws-cdk/aws-lambda-event-sources'
import { AuthorizationType, CognitoUserPoolsAuthorizer, Cors, HttpIntegration, IAuthorizer, LambdaRestApi } from '@aws-cdk/aws-apigateway'
import { createPolicies } from './create-policies'
import { Topic } from '@aws-cdk/aws-sns'
import { LambdaSubscription } from '@aws-cdk/aws-sns-subscriptions'

type FunctionSetup = {
  handler: string,
  policies: PolicyStatement[],
  timeout?: number,
  api?: {
    method: string,
    path: string,
    cors: {
      origin: string,
    },
    headers: string[],
    authorizer?: IAuthorizer,
  },
  queue?: Queue,
  topic?: Topic,
}
// TODO add authorizers here, api-key + cognito ^^^

export class CdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    // TODO run webpack with exec

    // TODO create s3 buckets
    // TODO open s3 buckets for codebuild and cloudfront
    // TODO create codebuild
    // TODO create sns for codebuild
    // TODO make api gateway
    // TODO make sqs queues
    // TODO create lambda functions
    // TODO lambda policies
    // TODO create lambda triggers

    // TODO try to make components reusable

    const vpc = new Vpc(scope as any, `deployment-service-vpc`)
    const securityGroup = new SecurityGroup(scope as any, ``, {
      vpc,
    })
    securityGroup.addIngressRule(
      Peer.ipv4('0.0.0.0/0'),
      Port.tcp(443),
      'cloud-deployment-service',
    )

    // TODO add egress? outbound?

    const subnets = [
      new Subnet(scope as any, ``, {
        vpcId: vpc.vpcId,
        cidrBlock: '172.31.16.0/20',
        availabilityZone: 'eu-west-2a',
      }),
      new Subnet(scope as any, ``, {
        vpcId: vpc.vpcId,
        cidrBlock: '172.31.32.0/20',
        availabilityZone: 'eu-west-2b',
      }),
      new Subnet(scope as any, ``, {
        vpcId: vpc.vpcId,
        cidrBlock: '172.31.0.0/20',
        availabilityZone: 'eu-west-2c',
      }),
      new Subnet(scope as any, ``, {
        vpcId: vpc.vpcId,
        cidrBlock: '172.31.128.0/24',
        availabilityZone: 'eu-west-2d',
      })
    ]

    const buckets = createS3Buckets(scope)
    const queues = createSqsQueues(scope)
    const [secretManager, aurora] = createAurora(scope, vpc)
    const [codeBuild, topic] = createCodeBuildProject(scope)
    const apiGateway = createApigateway(scope) // add vpc for this?
    // TODO add apiGateway resource
    // TODO create sns trigger

    const policies = createPolicies({
      buckets,
      queues,
      secretManager,
      codeBuild,
      aurora,
    })

    const authorizer = new CognitoUserPoolsAuthorizer(scope as any, `cloud-deployment-authorizer`, {
      cognitoUserPools: [],
    })

    const functionSetups: { [s: string]: FunctionSetup } = {
      'pipelineCreate': {
        handler: 'src/index.pipelineCreate',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'POST',
          path: '/pipeline',
          cors: { 
            origin: '*',
          },
          headers: [
            'Content-Type',
            'Authorization',
            'api-version',
          ],
          authorizer,
        },
      },
      'apiPipelineCreate': {
        handler: 'src/index.pipelineCreate',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'POST',
          path: '/api/pipeline',
          cors: { 
            origin: '*',
          },
          headers: [
            'Content-Type',
            'Authorization',
            'X-Api-Key',
            'api-version',
          ],
        },
      },
      'pipelineUpdate': {
        handler: 'src/index.pipelineUpdate',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'PUT',
          path: '/api/pipeline/{pipelineId}',
          cors: { 
            origin: '*',
          },
          headers: [
            'Content-Type',
            'Authorization',
            'api-version',
          ],
          authorizer,
        },
      },
      'apiPipelineUpdate': {
        handler: 'src/index.pipelineUpdate',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'PUT',
          path: '/api/pipeline/{pipelineId}',
          cors: { 
            origin: '*',
          },
          headers: [
            'Content-Type',
            'Authorization',
            'X-Api-Key',
            'api-version',
          ],
        },
      },
      'pipelineGet': {
        handler: 'src/index.pipelineGet',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'GET',
          path: '/pipeline/{pipelineId}',
          cors: { 
            origin: '*',
          },
          headers: [
            'Content-Type',
            'Authorization',
            'api-version',
          ],
          authorizer,
        },
      },
      'apiPipelineGet': {
        handler: 'src/index.pipelineGet',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'GET',
          path: 'api/pipeline/{pipelineId}',
          cors: { 
            origin: '*',
          },
          headers: [
            'Content-Type',
            'Authorization',
            'X-Api-Key',
            'api-version',
          ],
        },
      },
      'pipelineDelete': {
        handler: 'src/index.pipelineDelete',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'DELETE',
          path: 'pipeline/{pipelineId}',
          cors: { 
            origin: '*',
          },
          headers: [
            'Content-Type',
            'Authorization',
            'api-version',
          ],
          authorizer,
        },
      },
      'apiPipelineDelete': {
        handler: 'src/index.pipelineDelete',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'DELETE',
          path: 'api/pipeline/{pipelineId}',
          cors: { 
            origin: '*',
          },
          headers: [
            'Content-Type',
            'Authorization',
            'X-Api-Key',
            'api-version',
          ],
        },
      },
      'pipelinePaginate': {
        handler: 'src/index.pipelinePaginate',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'GET',
          path: 'pipeline',
          cors: { 
            origin: '*',
          },
          headers: [
            'Content-Type',
            'Authorization',
            'api-version',
          ],
          authorizer,
        },
      },
      'apiPipelinePaginate': {
        handler: 'src/index.pipelinePaginate',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'GET',
          path: 'api/pipeline',
          cors: { 
            origin: '*',
          },
          headers: [
            'Content-Type',
            'Authorization',
            'X-Api-Key',
            'api-version',
          ],
        },
      },
      'pipelineRunnerCreate': {
        handler: 'src/index.pipelineRunnerCreate',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'POST',
          path: '/pipeline/{pipelineId}/pipeline-runner',
          cors: { 
            origin: '*',
          },
          headers: [
            'Content-Type',
            'Authorization',
            'api-version',
          ],
          authorizer,
        },
      },
      'apiPipelineRunnerCreate': {
        handler: 'src/index.pipelineRunnerCreate',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'POST',
          path: '/api/pipeline/{pipelineId}/pipeline-runner',
          cors: { 
            origin: '*',
          },
          headers: [
            'Content-Type',
            'Authorization',
            'X-Api-Key',
            'api-version',
          ],
        },
      },
      'pipelineRunnerUpdate': {
        handler: 'src/index.pipelineRunnerUpdate',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'PUT',
          path: '/pipeline/{pipelineId}/pipeline-runner',
          cors: { 
            origin: '*',
          },
          headers: [
            'Content-Type',
            'Authorization',
            'api-version',
          ],
          authorizer,
        },
      },
      'apiPipelineRunnerUpdate': {
        handler: 'src/index.pipelineRunnerUpdate',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'PUT',
          path: '/api/pipeline/{pipelineId}/pipeline-runner',
          cors: { 
            origin: '*',
          },
          headers: [
            'Content-Type',
            'Authorization',
            'X-Api-Key',
            'api-version',
          ],
        },
      },
      'pipelineRunnerPaginate': {
        handler: 'src/index.pipelineRunnerPaginate',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'GET',
          path: '/pipeline/{pipelineId}/pipeline-runner',
          cors: { 
            origin: '*',
          },
          headers: [
            'Content-Type',
            'Authorization',
            'api-version',
          ],
          authorizer,
        },
      },
      'apiPipelineRunnerPaginate': {
        handler: 'src/index.pipelineRunnerPaginate',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'GET',
          path: '/api/pipeline/{pipelineId}/pipeline-runner',
          cors: { 
            origin: '*',
          },
          headers: [
            'Content-Type',
            'Authorization',
            'X-Api-Key',
            'api-version',
          ],
        },
      },
      'deployRelease': {
        handler: 'src/index.deployRelease',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'POST',
          path: '/deploy/release/{project}/{version}',
          cors: { 
            origin: '*',
          },
          headers: [
            'Content-Type',
            'Authorization',
            'api-version',
          ],
          authorizer,
        },
      },
      'apiDeployRelease': {
        handler: 'src/index.deployRelease',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'POST',
          path: '/api/deploy/release/{project}/{version}',
          cors: { 
            origin: '*',
          },
          headers: [
            'Content-Type',
            'Authorization',
            'X-Api-Key',
            'api-version',
          ],
        },
      },
      'releasePaginate': {
        handler: 'src/index.releasePaginate',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'GET',
          path: '/deploy/release/{project}',
          cors: { 
            origin: '*',
          },
          headers: [
            'Content-Type',
            'Authorization',
            'api-version',
          ],
          authorizer,
        },
      },
      'apiReleasePaginate': {
        handler: 'src/index.releasePaginate',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'GET',
          path: '/api/deploy/release/{project}',
          cors: { 
            origin: '*',
          },
          headers: [
            'Content-Type',
            'Authorization',
            'X-Api-Key',
            'api-version',
          ],
        },
      },
      'deployVersion': {
        handler: 'src/index.deployVersion',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'POST',
          path: '/deploy/version/{projectName}/{version}',
          cors: { 
            origin: '*',
          },
          headers: [
            'Content-Type',
            'Authorization',
            'api-version',
          ],
          authorizer,
        },
      },
      'apiDeployVersion': {
        handler: 'src/index.deployVersion',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'POST',
          path: '/api/deploy/version/{projectName}/{version}',
          cors: { 
            origin: '*',
          },
          headers: [
            'Content-Type',
            'Authorization',
            'X-Api-Key',
            'api-version',
          ],
        },
      },
      'releaseProjectPagination': {
        handler: 'src/index.projectPaginate',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'GET',
          path: '/deploy/project',
          cors: { 
            origin: '*',
          },
          headers: [
            'Content-Type',
            'Authorization',
            'api-version',
          ],
          authorizer,
        },
      },
      'apiReleaseProjectPagination': {
        handler: 'src/index.projectPaginate',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'GET',
          path: '/api/deploy/project',
          cors: { 
            origin: '*',
          },
          headers: [
            'Content-Type',
            'Authorization',
            'X-Api-Key',
            'api-version',
          ],
        },
      },
      'codebuildExecutor': {
        handler: 'src/index.codebuildExecutor',
        policies: [
          ...policies.commonBackendPolicies,
          policies.codebuildExecPolicy,
        ],
        queue: queues['CodebuildExecutor'],
      },
      'codebuildUpdate': {
        handler: 'src/index.codebuildUpdate',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        topic,
        timeout: 300,
      },
      'codebuildDeploy': {
        handler: 'src/index.codebuildDeploy',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        timeout: 300,
        queue: queues['CodebuildDeploy'],
      },
      'pipelineSetup': {
        handler: 'src/index.pipelineSetup',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        timeout: 300,
        queue: queues['PipelineSetup'],
      },
      'pipelineTearDownStart': {
        handler: 'src/index.pipelineTearDownStart',
        queue: queues['PipelineTearDownStart'],
        timeout: 300,
        policies: [
          ...policies.commonBackendPolicies,
        ],
      },
      'pipelineTearDown': {
        handler: 'src/index.pipelineTearDown',
        queue: queues['pipelineTearDown'],
        timeout: 300,
        policies: [
          ...policies.commonBackendPolicies,
        ],
      },
      'pusherAuth': {
        handler: 'src/index.pusherAuth',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'GET',
          path: '/deploy/project',
          cors: { 
            origin: '*',
          },
          headers: [
            'Content-Type',
            'Authorization',
            'api-version',
          ],
          authorizer,
        },
      },
    }

    for (const [name, options] of Object.entries(functionSetups)) {
      const role = new Role(scope as any, 'Role', {
        assumedBy: new ServicePrincipal('ec2.amazonaws.com'),
      })

      options.policies.forEach(policy => role.addToPolicy(policy))
      const lambda = createLambda(scope, `cloud-deployment-${name}`, AssetCode.fromAsset(path.resolve('..', '..', 'dist', options.handler)), vpc)

      if (options.queue) {
        lambda.addEventSource(new SqsEventSource(options.queue))
      } else if (options.api) {
        const api = new LambdaRestApi(scope as any, `cloud-deployment-${name}`, {
          handler: lambda,
          defaultCorsPreflightOptions: {
            allowOrigins: Cors.ALL_ORIGINS,
            allowMethods: Cors.ALL_ORIGINS,
          },
        })
        const item = api.root.addResource(options.api.path)
        item.addMethod(options.api.method, new HttpIntegration('http://amazon.com'), {
          authorizer: options.api.authorizer ? authorizer : undefined,
          authorizationType: options.api.authorizer ? AuthorizationType.COGNITO : undefined,
        })
      } else if (options.topic) {
        topic.addSubscription(new LambdaSubscription(lambda))
      }

      // TODO add cors + headers
    }
  }
}
