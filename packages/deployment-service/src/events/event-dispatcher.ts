import { QueueDetails, QueueNamesEnum } from '../constants'
import { PipelineEntity } from '../entities/pipeline.entity'
import { Injectable } from '@nestjs/common'
import { SqsProvider } from './sqs-provider'
import { PipelineRunnerEntity } from '../entities/pipeline-runner.entity'
import { BitbucketClientData } from '../entities/bitbucket-client.entity'
import { BitBucketEvent } from '../bitbucket'

@Injectable()
export class EventDispatcher {
  constructor(private readonly sqsProvider: SqsProvider) {}

  async triggerPipelineSetup(pipeline: PipelineEntity): Promise<void> {
    return this.sqsProvider.send(QueueDetails[QueueNamesEnum.PIPELINE_SETUP].url, pipeline)
  }

  async triggerPipelineTearDownStart(pipeline: PipelineEntity): Promise<void> {
    return this.sqsProvider.send(QueueDetails[QueueNamesEnum.PIPELINE_TEAR_DOWN_START].url, pipeline)
  }

  async triggerPipelineTearDown(pipeline: PipelineEntity): Promise<void> {
    return this.sqsProvider.send(QueueDetails[QueueNamesEnum.PIPELINE_TEAR_DOWN].url, pipeline)
  }

  async triggerCodebuildExecutor(
    pipelineRunner:
      | PipelineRunnerEntity
      | {
          pipelineRunner: PipelineRunnerEntity
          client: BitbucketClientData
          event: BitBucketEvent
        },
  ): Promise<void> {
    return this.sqsProvider.send(
      QueueDetails[QueueNamesEnum.CODEBUILD_EXECUTOR].url,
      pipelineRunner instanceof PipelineRunnerEntity
        ? { pipelineRunner, pipeline: pipelineRunner.pipeline }
        : pipelineRunner,
    )
  }

  async triggerCodebuildVersionDeploy(pipelineRunner: PipelineRunnerEntity): Promise<void> {
    return this.sqsProvider.send(QueueDetails[QueueNamesEnum.CODEBUILD_VERSION_DEPLOY].url, pipelineRunner)
  }
}
