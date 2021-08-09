import { PipelineEntity, TaskEntity } from './../entities'
import { ExecutableType } from './executable'
import * as cdk from '@aws-cdk/core'
import { developerDir, cloneDir } from '../utils'
import { Bucket } from '@aws-cdk/aws-s3'
import * as bucketDeploy from '@aws-cdk/aws-s3-deployment'
import * as r53 from '@aws-cdk/aws-route53'

const buildDir = 'build'

export const deployReact: ExecutableType = async (task: TaskEntity, pipeline: PipelineEntity): Promise<true | never> => {
  console.log('deploying react...')
  console.log('executable', task)

  const repoName = pipeline.repository?.split('/').pop()

  const cdkApp = new cdk.App({
    outdir: `${developerDir(pipeline)}cdk`,
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

  const zone = r53.HostedZone.fromHostedZoneAttributes(stack, `main-zone`, {
    hostedZoneId: 'Z02367201ZA0CZPSM3N2H',
    zoneName: 'dev.paas.reapit.cloud',
  })

  const cName = new r53.CnameRecord(stack, `${repoName}-cname`, {
    zone: zone,
    recordName: repoName,
    domainName: bucket.bucketWebsiteDomainName
  })

  cdkApp.synth()

  return Promise.resolve(true)
}

deployReact({}, {
  developerId: 'test',
  repository: 'test/reapit-react-test',
} as PipelineEntity)
