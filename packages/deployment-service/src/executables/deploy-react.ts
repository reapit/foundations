import { PipelineEntity, TaskEntity } from './../entities'
import { ExecutableType } from './executable'
import * as cdk from '@aws-cdk/core'
import { cloneDir, developerDir } from '../utils'
import { Bucket } from '@aws-cdk/aws-s3'
import * as r53 from '@aws-cdk/aws-route53'
import { SdkProvider } from 'aws-cdk'
import { CloudFormationDeployments } from 'aws-cdk/lib/api/cloudformation-deployments'
import { s3Client } from '../services'
import fs from 'fs'
import path from 'path'

const buildDir = 'build'
const hostingZone = {
  hostedZoneId: 'Z02367201ZA0CZPSM3N2H', // TODO env this
  zoneName: 'dev.paas.reapit.cloud', // TODO env this
}
const bucketName = (pipeline: PipelineEntity, repoName: string): string =>
  `deployment-${pipeline.developerId}-${repoName}`

type SendToS3Params = {
  filePath: string
  pipeline: PipelineEntity
  repoName: string
  buildLocation: string
}

const sendToS3 = async ({ filePath, repoName, pipeline, buildLocation }: SendToS3Params): Promise<void> =>
  new Promise<void>((resolve, reject) =>
    s3Client.upload(
      {
        Bucket: bucketName(pipeline, repoName), // bucket.bucketName?
        Key: filePath.substring(buildLocation.length), // /path/filename?
        Body: fs.readFileSync(filePath),
        ACL: 'public-read',
      },
      (error) => {
        if (error) {
          console.error(error)
          reject(error)
        }

        resolve()
      },
    ),
  )

export const deployReact: ExecutableType = async (
  task: TaskEntity,
  pipeline: PipelineEntity,
): Promise<true | never> => {
  console.log('deploying react...')
  console.log('executable', task)

  const repoName: string = (pipeline.repository as string).split('/').pop() as string
  const cdkDir = `${developerDir(pipeline)}/${repoName}/cdk`
  const buildLocation = `${cloneDir(pipeline)}/${buildDir}/`

  const cdkApp = new cdk.App({
    outdir: cdkDir,
  })

  const stack = new cdk.Stack(cdkApp, `deployment-${pipeline.developerId}-${repoName}`, {
    tags: {
      deploymentService: 'true',
    },
  })

  const bucket = new Bucket(stack, `deployment-${pipeline.developerId}-${repoName}`, {
    publicReadAccess: true,
    websiteIndexDocument: 'index.html',
    bucketName: `deployment-${pipeline.developerId}-${repoName}`,
  })

  const zone = r53.HostedZone.fromHostedZoneAttributes(stack, 'main-zone', hostingZone)

  new r53.CnameRecord(stack, `deployment-${pipeline.developerId}-${repoName}-cname`, {
    zone: zone,
    recordName: repoName,
    domainName: bucket.bucketWebsiteDomainName,
  })

  // create cloudfront entry with origin as singular bucket and path to index
  // create singular zip bucket for all repos built and zipped
  // create deployment bucket to transfer zipped repos for cloudfront
  // deadletter channels for failed deployments and handling retries

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

  const recurseDir = async (currentDirPath: string, callback: (params: SendToS3Params) => Promise<void>) => {
    const entries = fs.readdirSync(currentDirPath)
    await Promise.all(
      entries.map((name) => {
        // [Promise<[Promise<[Promise<[] | void>] | void>] | void>] | void>... or Promise<void>
        const filePath = path.join(currentDirPath, name)
        const stat = fs.statSync(filePath)
        if (stat.isFile()) {
          return callback({ filePath, buildLocation, pipeline, repoName })
        } else if (stat.isDirectory()) {
          return recurseDir(filePath, callback)
        }
      }),
    )
  }

  await recurseDir(buildLocation, sendToS3)

  return true
}
