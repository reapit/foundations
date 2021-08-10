import { PipelineEntity, TaskEntity } from './../entities'
import { ExecutableType } from './executable'
import * as cdk from '@aws-cdk/core'
import { developerDir, cloneDir } from '../utils'
import { Bucket } from '@aws-cdk/aws-s3'
import * as bucketDeploy from '@aws-cdk/aws-s3-deployment'
import * as r53 from '@aws-cdk/aws-route53'
import { SdkProvider } from 'aws-cdk'
import { CloudFormationDeployments } from 'aws-cdk/lib/api/cloudformation-deployments'

const buildDir = 'build'
const hostingZone = {
  hostedZoneId: 'Z02367201ZA0CZPSM3N2H',
  zoneName: 'dev.paas.reapit.cloud',
}

export const deployReact: ExecutableType = async (
  task: TaskEntity,
  pipeline: PipelineEntity,
): Promise<true | never> => {
  console.log('deploying react...')
  console.log('executable', task)

  const repoName = pipeline.repository?.split('/').pop()
  const cdkDir = `${developerDir(pipeline)}/${repoName}/cdk`

  const cdkApp = new cdk.App({
    outdir: cdkDir,
  })

  const stack = new cdk.Stack(cdkApp, `${pipeline.developerId}-${repoName}`, {
    tags: {
      deploymentService: 'true',
    },
  })

  const bucket = new Bucket(stack, `${pipeline.developerId}-${repoName}`, {
    publicReadAccess: true,
    websiteIndexDocument: 'index.html',
  })

  new bucketDeploy.BucketDeployment(stack, 'DeployFiles', {
    sources: [bucketDeploy.Source.asset(`${cloneDir(pipeline)}/${buildDir}`)],
    destinationBucket: bucket,
  })

  const zone = r53.HostedZone.fromHostedZoneAttributes(stack, 'main-zone', hostingZone)

  new r53.CnameRecord(stack, `${repoName}-cname`, {
    zone: zone,
    recordName: repoName,
    domainName: bucket.bucketWebsiteDomainName,
  })

  const stackName = cdkApp.synth().getStackByName(stack.stackName)

  const sdkProvider = await SdkProvider.withAwsCliCompatibleDefaults()
  const cloudFormation = new CloudFormationDeployments({ sdkProvider })

  try {
    await cloudFormation.deployStack({
      stack: stackName,
    })
  } catch (e) {
    console.error(e)

    throw new Error('Deployment failed. CDK error')
  }

  return true
}
