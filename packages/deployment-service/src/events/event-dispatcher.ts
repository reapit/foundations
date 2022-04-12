import { QueueNamesEnum } from '../constants'
import { PipelineEntity } from '../entities/pipeline.entity'
import { Injectable } from '@nestjs/common'
import { SqsProvider } from './sqs-provider'
import { PipelineRunnerEntity } from '../entities/pipeline-runner.entity'

@Injectable()
export class EventDispatcher {
  constructor(private readonly sqsProvider: SqsProvider) {}

  async triggerPipelineSetup(pipeline: PipelineEntity): Promise<void> {
    this.sqsProvider.send(QueueNamesEnum.PIPELINE_SETUP, pipeline)
  }

  async triggerPipelineTearDownStart(pipeline: PipelineEntity): Promise<void> {
    this.sqsProvider.send(QueueNamesEnum.PIPELINE_TEAR_DOWN_START, pipeline)
  }

  async triggerPipelineTearDown(pipeline: PipelineEntity): Promise<void> {
    this.sqsProvider.send(QueueNamesEnum.PIPELINE_TEAR_DOWN, pipeline)
  }

  async triggerCodebuildExecutor(pipelineRunner: PipelineRunnerEntity): Promise<void> {
    return this.sqsProvider.send(QueueNamesEnum.CODEBUILD_EXECUTOR, pipelineRunner)
  }

  async triggerCodebuildVersionDeploy(pipelineRunner: PipelineRunnerEntity): Promise<void> {
    return this.sqsProvider.send(QueueNamesEnum.CODEBUILD_VERSION_DEPLOY, pipelineRunner)
  }
}
