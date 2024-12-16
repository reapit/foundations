import {
  App,
  aws_ec2,
  aws_iam,
  aws_lambda,
  aws_logs,
  aws_rds,
  aws_s3,
  aws_secretsmanager,
  custom_resources,
  CustomResource,
  Duration,
  Stack,
} from 'aws-cdk-lib'
import { databaseName } from './lib/cdk-stack'
import config from '../config.json'
import { BucketNames } from './lib/create-S3-bucket'

class TempCdkStack extends Stack {
  constructor(scope: App, id: string) {
    super(scope, id, {
      env: {
        account: config.AWS_ACCOUNT_ID,
        region: 'eu-west-2',
      },
    })

    const vpc = aws_ec2.Vpc.fromLookup(this, 'lookup-existing-vpc', {
      // vpcName: 'cloud-deployment-service/vpc',
      vpcId: config.VPC_ID,
    })

    const tempCluster = new aws_rds.DatabaseCluster(this, 'temp-database-cluster', {
      engine: aws_rds.DatabaseClusterEngine.auroraMysql({ version: aws_rds.AuroraMysqlEngineVersion.VER_3_05_2 }),
      defaultDatabaseName: databaseName,
      vpc,
      writer: aws_rds.ClusterInstance.provisioned('writer', {
        instanceType: aws_ec2.InstanceType.of(aws_ec2.InstanceClass.T3, aws_ec2.InstanceSize.MEDIUM),
        isFromLegacyInstanceProps: true,
      }),
      readers: [
        aws_rds.ClusterInstance.serverlessV2('reader1', {
          scaleWithWriter: true,
          isFromLegacyInstanceProps: true,
        }),
      ],
      cloudwatchLogsRetention: aws_logs.RetentionDays.ONE_MONTH,
      deletionProtection: true,
    })

    tempCluster.connections.allowFromAnyIpv4(aws_ec2.Port.allTcp())

    const tempMigrationHandler = new aws_lambda.Function(this, 'temp-migration-handler', {
      runtime: aws_lambda.Runtime.NODEJS_18_X,
      code: aws_lambda.Code.fromAsset('bundle/temp-migration.zip'),
      handler: 'dist/temp-migration.handler',
      vpc,
      environment: {
        DATABASE_SECRET_ARN: (tempCluster.secret as aws_secretsmanager.Secret).secretArn,
        MYSQL_DATABASE: 'deployment_service',
        REGION: 'eu-west-2',
        NODE_ENV: process.env.NODE_ENV || 'development',
      },
      memorySize: 1024,
      timeout: Duration.minutes(5),
    })

    tempMigrationHandler.addToRolePolicy(
      new aws_iam.PolicyStatement({
        effect: aws_iam.Effect.ALLOW,
        resources: [(tempCluster.secret as aws_secretsmanager.Secret).secretArn],
        actions: ['secretsmanager:GetSecretValue', 'secretsmanager:DescribeSecret'],
      }),
    )

    const bastion = new aws_ec2.BastionHostLinux(this, 'temp-cluster-bastion', {
      vpc,
    })

    const resourceProvider = new custom_resources.Provider(this, 'temp-cluster-resource-provider', {
      onEventHandler: tempMigrationHandler,
      logRetention: aws_logs.RetentionDays.ONE_DAY,
    })

    const customResource = new CustomResource(this, 'temp-custom-resource', {
      serviceToken: resourceProvider.serviceToken,
      properties: {
        // secret: tempCluster.secret,
      },
    })

    customResource.node.addDependency(tempCluster)
  }
}

class ProductionS3PolicyMatchStack extends Stack {
  constructor(scope: App, id: string) {
    super(scope, id, {
      env: {
        account: config.USERCODE_ACCOUNT_ID,
        region: 'eu-west-2',
      },
    })

    const envStage = process.env.APP_STAGE === 'production' ? 'prod' : 'dev'

    const liveBucket = aws_s3.Bucket.fromBucketName(this, 'lookup-live-bucket', `${BucketNames.LIVE}-${envStage}`)
    const logBucket = aws_s3.Bucket.fromBucketName(this, 'lookup-log-bucket', `${BucketNames.LOG}-${envStage}`)
    const repoBucket = aws_s3.Bucket.fromBucketName(this, 'lookup-repo-bucket', `${BucketNames.REPO_CACHE}-${envStage}`)
    const versionBucket = aws_s3.Bucket.fromBucketName(this, 'lookup-version-bucket', `${BucketNames.VERSION}-${envStage}`)

    const s3PolicyProductionMatchLambda = new aws_lambda.Function(this, 's3-policy-production-match', {
      runtime: aws_lambda.Runtime.NODEJS_18_X,
      code: aws_lambda.Code.fromAsset('bundle/temp-s3-production-policy-match.zip'),
      handler: 'dist/temp-s3-production-policy-match.handler',
      environment: {
        BUCKETS: [liveBucket.bucketName, logBucket.bucketName, repoBucket.bucketName, versionBucket.bucketName].join(','),
        BUCKET_Arns: [liveBucket.bucketArn, logBucket.bucketArn, repoBucket.bucketArn, versionBucket.bucketArn].join(','),
      },
      memorySize: 1024,
      timeout: Duration.minutes(5),
    })

    s3PolicyProductionMatchLambda.addToRolePolicy(
      new aws_iam.PolicyStatement({
        effect: aws_iam.Effect.ALLOW,
        resources: [liveBucket.bucketArn, logBucket.bucketArn, repoBucket.bucketArn, versionBucket.bucketArn],
        actions: [
          's3:DeleteBucketPolicy',
          's3:PutBucketPolicy',
          's3:PutBucketOwnershipControls',
          's3:PutBucketACL',
          's3:PutPublicAccessBlock',
          's3:PutBucketPublicAccessBlock',
        ],
      }),
    )

    const resourceProvider = new custom_resources.Provider(this, 's3-production-match-resource-provider', {
      onEventHandler: s3PolicyProductionMatchLambda,
      logRetention: aws_logs.RetentionDays.ONE_DAY,
    })

    new CustomResource(this, 's3-policy-production-match-custom-resource', {
      serviceToken: resourceProvider.serviceToken,
    })
  }
}

const bootstrap = () => {
  const app = new App()
  new TempCdkStack(app, 'temp-cdk-cluster')
  new ProductionS3PolicyMatchStack(app, 'production-s3-policy-match')
}

bootstrap()
