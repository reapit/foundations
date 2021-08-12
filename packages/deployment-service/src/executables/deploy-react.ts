import { PipelineEntity, TaskEntity } from './../entities'
import { ExecutableType } from './executable'
import * as cdk from '@aws-cdk/core'
import { developerDir } from '../utils'
import * as r53 from '@aws-cdk/aws-route53'
import { SdkProvider } from 'aws-cdk'
import { CloudFormationDeployments } from 'aws-cdk/lib/api/cloudformation-deployments'
import { storeVersion } from './store-version'
import { deployFromStore } from './deploy-from-store'

const hostingZone = {
  hostedZoneId: 'Z02367201ZA0CZPSM3N2H', // TODO env this
  zoneName: 'dev.paas.reapit.cloud', // TODO env this
}

const cdkProcess = async (pipeline: PipelineEntity): Promise<void> => {
  // create cloudfront entry with origin as singular bucket and path to index
  // create singular zip bucket for all repos built and zipped
  // create deployment bucket to transfer zipped repos for cloudfront
  // deadletter channels for failed deployments and handling retries
  // refresh cloudfront cache

  const repoName: string = (pipeline.repository as string).split('/').pop() as string
  const cdkDir = `${developerDir(pipeline)}/${repoName}/cdk`

  const cdkApp = new cdk.App({
    outdir: cdkDir,
  })

  const stack = new cdk.Stack(cdkApp, `deployment-${pipeline.developerId}-${repoName}`, {
    tags: {
      deploymentService: 'true',
    },
  })

  const stackName = cdkApp.synth().getStackByName(stack.stackName)

  const sdkProvider = await SdkProvider.withAwsCliCompatibleDefaults()
  const cloudFormation = new CloudFormationDeployments({ sdkProvider })

  const zone = r53.HostedZone.fromHostedZoneAttributes(stack, 'main-zone', hostingZone)

  // TODO add cloudfront and point cname to it

  new r53.CnameRecord(stack, `deployment-${pipeline.developerId}-${repoName}-cname`, {
    zone: zone,
    recordName: repoName,
    domainName: bucket.bucketWebsiteDomainName, // TODO resolve bucket name from deployment_live bucket to folder
  })

  try {
    await cloudFormation.deployStack({
      stack: stackName,
    })
  } catch (e) {
    console.error(e)

    throw new Error('Deployment failed. CDK error')
  }
}

export const deployReact: ExecutableType = async (
  task: TaskEntity,
  pipeline: PipelineEntity,
): Promise<true | never> => {
  console.log('deploying react...')
  console.log('executable', task)

  await storeVersion({
    pipeline,
  })

  await deployFromStore({
    pipeline,
  })

  await cdkProcess(pipeline)

  return true
}
