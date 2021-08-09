import { PipelineEntity, TaskEntity } from './../entities'
import { ExecutableType } from './executable'
import cdk from '@aws-cdk/core'
import { developerDir } from '../utils'
import { Bucket } from '@aws-cdk/aws-s3'

export const deployReact: ExecutableType = async (task: TaskEntity, pipeline: PipelineEntity): Promise<true | never> => {
  console.log('deploying react...')
  console.log('executable', task)

  const cdkApp = new cdk.App({
    outdir: `${developerDir(pipeline)}/cdk`,
  })

  const stack = new cdk.Stack(cdkApp, `${pipeline.developerId}-${pipeline.repository?.split('/').pop()}`, {
    tags: {
      deploymentService: 'true',
    },
  })

  const bucket = new Bucket(stack, `${pipeline.developerId}-${pipeline.repository?.split('/').pop()}`, {
    publicReadAccess: true,
  })

  cdkApp.synth()

  return Promise.resolve(true)
}

deployReact({}, {
  developerId: 'test',
  repository: 'test/test-repo',
} as PipelineEntity)
