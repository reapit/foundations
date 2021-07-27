import * as cdk from '@aws-cdk/core'
import * as ec2 from '@aws-cdk/aws-ec2'
import * as lambda from '@aws-cdk/aws-lambda'
import * as api from '@aws-cdk/aws-apigatewayv2'
import * as awsAuthorizers from '@aws-cdk/aws-apigatewayv2-authorizers'
import * as cognito from '@aws-cdk/aws-cognito'
import { LambdaProxyIntegration } from '@aws-cdk/aws-apigatewayv2-integrations'
import { Bucket } from '@aws-cdk/aws-s3'
import * as rds from '@aws-cdk/aws-rds'
import { Peer, Port, SecurityGroup } from '@aws-cdk/aws-ec2'
import * as sqs from '@aws-cdk/aws-sqs'
import * as eventSource from '@aws-cdk/aws-lambda-event-sources'
import * as assets from '@aws-cdk/aws-s3-assets'
import * as config from '../../config.json'
import * as path from 'path'
import { Duration } from '@aws-cdk/core'

const maxAzs = 2

export class DeploymentStack extends cdk.Stack {
  constructor(app: cdk.App, name: string, stage: 'production' | 'staging') {
    super(app, `${name}deployment-service-${stage}`)

    const vpc = new ec2.Vpc(this, 'VPC', {
      cidr: '10.0.0.0/16',
		  maxAzs,
    })

    const ingressSecurityGroup = new SecurityGroup(this, `ingress-security-group-${stage}`, {
      vpc,
      allowAllOutbound: false,
      securityGroupName: `${name}IngressSecurityGroup-${stage}`,
    })
    ingressSecurityGroup.addIngressRule(Peer.ipv4('0.0.0.0/0'), Port.tcp(80))
    ingressSecurityGroup.addIngressRule(Peer.ipv4('0.0.0.0/0'), Port.tcp(443))

    new rds.ServerlessCluster(this, `${name}dev`, {
      vpc,
      engine: rds.DatabaseClusterEngine.AURORA_MYSQL,
      parameterGroup: rds.ParameterGroup.fromParameterGroupName(this, `${name}aurora-mysql-${stage}`, 'default.aurora-mysql5.7'),
      vpcSubnets: {
				subnetType: ec2.SubnetType.PRIVATE,
			},
      scaling: {
        autoPause: Duration.minutes(10),
        minCapacity: rds.AuroraCapacityUnit.ACU_8,
        maxCapacity: rds.AuroraCapacityUnit.ACU_32,
      },
    })

    const deployReleaseS3Bucket = new Bucket(this, `${name}deploy-release`)

    const httpApi = new api.HttpApi(this, `${name}http-api`)

    new api.HttpStage(this, 'Stage', {
      httpApi,
      stageName: 'dev',
    });

    // TODO resolve build context as docker-compose has context of entire monorepo
    const lith = new lambda.DockerImageFunction(this, `${name}lith`, {
      code: lambda.DockerImageCode.fromImageAsset(path.join(__dirname, '../../')),
      vpc,
    })
    const lithProxy = new LambdaProxyIntegration({
      handler: lith,
    })

    const userPoolClient = cognito.UserPoolClient.fromUserPoolClientId(this, `${name}poolClient-${stage}`, '4m6mr1t2d0si3pfl4rludmqei1')
    const userPool = cognito.UserPool.fromUserPoolId(this, `${name}userPool`, config.CONNECT_USER_POOL)

    const authorizer = new awsAuthorizers.HttpUserPoolAuthorizer({
      userPool,
      userPoolClient,
    })

    httpApi.addRoutes({
      path: '/{proxy+}',
      methods: [api.HttpMethod.ANY],
      integration: lithProxy,
      authorizer,
    })

    // api authorization for api-service interaction
    httpApi.addRoutes({
      path: '/api/{proxy+}',
      methods: [api.HttpMethod.ANY],
      integration: lithProxy,
    })

    // TODO grant access to created resources
    deployReleaseS3Bucket.grantReadWrite(lith)

    const taskPopulationAsset = new assets.Asset(this, `${name}taskPopulationAsset`, {
      path: path.resolve(__dirname, '..', '..', 'dist'),
    })

    const taskRunnerAsset = new assets.Asset(this, `${name}taskRunnerAsset`, {
      path: path.resolve(__dirname, '..', '..', 'dist'),
    })

    const taskPopulationLambda = new lambda.Function(this, `${name}taskPopulation-${stage}`, {
      code: lambda.Code.fromBucket(taskPopulationAsset.bucket, taskPopulationAsset.s3ObjectKey),
      handler: 'taskPopulation.taskPopulation',
      runtime: lambda.Runtime.NODEJS_14_X,
    })
    
    const taskRunnerLambda = new lambda.Function(this, `${name}taskRunner-${stage}`, {
      code: lambda.Code.fromBucket(taskRunnerAsset.bucket, taskRunnerAsset.s3ObjectKey),
      handler: 'taskRunner.taskRunner',
      runtime: lambda.Runtime.NODEJS_14_X,
    })

    const taskPopulationQueue = new sqs.Queue(this, `${name}TaskPopulation-${stage}`, {
      queueName: 'TaskPopulation',
    })

    const taskRunnerQueue = new sqs.Queue(this, `${name}TaskRunner-${stage}`, {
      queueName: 'TaskRunner',
    })

    taskPopulationLambda.addEventSource(new eventSource.SqsEventSource(taskPopulationQueue))
    taskRunnerLambda.addEventSource(new eventSource.SqsEventSource(taskRunnerQueue))
  }
}
