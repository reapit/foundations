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

    const vpc = new Vpc(this as any, `deployment-service-vpc`)
    const securityGroup = new SecurityGroup(this as any, `deployment-service-security-group`, {
      vpc,
    })
    securityGroup.addIngressRule(
      Peer.ipv4('0.0.0.0/0'),
      Port.tcp(443),
      'cloud-deployment-service',
    )

    // TODO add egress? outbound?

    const subnets = [
      new Subnet(this as any, `deployment-service-subnet-a`, {
        vpcId: vpc.vpcId,
        cidrBlock: '172.31.16.0/20',
        availabilityZone: 'eu-west-2a',
      }),
      new Subnet(this as any, `deployment-service-subnet-b`, {
        vpcId: vpc.vpcId,
        cidrBlock: '172.31.32.0/20',
        availabilityZone: 'eu-west-2b',
      }),
      new Subnet(this as any, `deployment-service-subnet-c`, {
        vpcId: vpc.vpcId,
        cidrBlock: '172.31.0.0/20',
        availabilityZone: 'eu-west-2c',
      }),
      new Subnet(this as any, `deployment-service-subnet-d`, {
        vpcId: vpc.vpcId,
        cidrBlock: '172.31.128.0/24',
        availabilityZone: 'eu-west-2d',
      })
    ]

    const buckets = createS3Buckets(this)
    const queues = createSqsQueues(this)
    const [secretManager, aurora] = createAurora(this, vpc)
    const [codeBuild, topic] = createCodeBuildProject(this)
    const apiGateway = createApigateway(this) // add vpc for this?
    // TODO add apiGateway resource
    // TODO create sns trigger

    const policies = createPolicies({
      buckets,
      queues,
      secretManager,
      codeBuild,
      aurora,
    })

    const authorizer = new CognitoUserPoolsAuthorizer(this as any, `cloud-deployment-authorizer`, {
      cognitoUserPools: [],
    })

    const functionSetups: { [s: string]: FunctionSetup } = {
      'pipelineCreate': {
        handler: 'main.pipelineCreate',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'POST',
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
      'apiPipelineCreate': {
        handler: 'main.pipelineCreate',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'POST',
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
      'pipelineUpdate': {
        handler: 'main.pipelineUpdate',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'PUT',
          path: 'api/pipeline/{pipelineId}',
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
        handler: 'main.pipelineUpdate',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'PUT',
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
      'pipelineGet': {
        handler: 'main.pipelineGet',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'GET',
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
      'apiPipelineGet': {
        handler: 'main.pipelineGet',
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
        handler: 'main.pipelineDelete',
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
        handler: 'main.pipelineDelete',
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
        handler: 'main.pipelinePaginate',
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
        handler: 'main.pipelinePaginate',
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
        handler: 'main.pipelineRunnerCreate',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'POST',
          path: 'pipeline/{pipelineId}/pipeline-runner',
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
        handler: 'main.pipelineRunnerCreate',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'POST',
          path: 'api/pipeline/{pipelineId}/pipeline-runner',
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
        handler: 'main.pipelineRunnerUpdate',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'PUT',
          path: 'pipeline/{pipelineId}/pipeline-runner',
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
        handler: 'main.pipelineRunnerUpdate',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'PUT',
          path: 'api/pipeline/{pipelineId}/pipeline-runner',
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
        handler: 'main.pipelineRunnerPaginate',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'GET',
          path: 'pipeline/{pipelineId}/pipeline-runner',
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
        handler: 'main.pipelineRunnerPaginate',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'GET',
          path: 'api/pipeline/{pipelineId}/pipeline-runner',
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
        handler: 'main.deployRelease',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'POST',
          path: 'deploy/release/{project}/{version}',
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
        handler: 'main.deployRelease',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'POST',
          path: 'api/deploy/release/{project}/{version}',
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
        handler: 'main.releasePaginate',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'GET',
          path: 'deploy/release/{project}',
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
        handler: 'main.releasePaginate',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'GET',
          path: 'api/deploy/release/{project}',
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
        handler: 'main.deployVersion',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'POST',
          path: 'deploy/version/{projectName}/{version}',
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
        handler: 'main.deployVersion',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'POST',
          path: 'api/deploy/version/{projectName}/{version}',
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
        handler: 'main.projectPaginate',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'GET',
          path: 'deploy/project',
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
        handler: 'main.projectPaginate',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'GET',
          path: 'api/deploy/project',
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
        handler: 'main.codebuildExecutor',
        policies: [
          ...policies.commonBackendPolicies,
          policies.codebuildExecPolicy,
        ],
        queue: queues['CodebuildExecutor'],
      },
      'codebuildUpdate': {
        handler: 'main.codebuildUpdate',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        topic,
        timeout: 300,
      },
      'codebuildDeploy': {
        handler: 'main.codebuildDeploy',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        timeout: 300,
        queue: queues['CodebuildDeploy'],
      },
      'pipelineSetup': {
        handler: 'main.pipelineSetup',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        timeout: 300,
        queue: queues['PipelineSetup'],
      },
      'pipelineTearDownStart': {
        handler: 'main.pipelineTearDownStart',
        queue: queues['PipelineTearDownStart'],
        timeout: 300,
        policies: [
          ...policies.commonBackendPolicies,
        ],
      },
      'pipelineTearDown': {
        handler: 'main.pipelineTearDown',
        queue: queues['pipelineTearDown'],
        timeout: 300,
        policies: [
          ...policies.commonBackendPolicies,
        ],
      },
      'pusherAuth': {
        handler: 'main.pusherAuth',
        policies: [
          ...policies.commonBackendPolicies,
        ],
        api: {
          method: 'GET',
          path: 'deploy/project',
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
      const role = new Role(this as any, `deployment-service-${name}-role`, {
        assumedBy: new ServicePrincipal('ec2.amazonaws.com'),
      })

      options.policies.forEach(policy => role.addToPolicy(policy))
      const lambda = createLambda(this, `cloud-deployment-${name}`, AssetCode.fromAsset(path.resolve('dist', 'main.zip')), vpc)

      if (options.queue) {
        lambda.addEventSource(new SqsEventSource(options.queue))
      } else if (options.api) {
        const api = new LambdaRestApi(this as any, `cloud-deployment-${name}`, {
          handler: lambda,
          defaultCorsPreflightOptions: {
            allowHeaders: options.api.headers,
            allowOrigins: Cors.ALL_ORIGINS,
            allowMethods: Cors.ALL_ORIGINS,
          },
          proxy: false,
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
