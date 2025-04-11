import { QueueNamesEnum } from '../constants'
import { PipelineRunnerEntity } from '../entities/pipeline-runner.entity'
import { PipelineEntity } from '../entities/pipeline.entity'
import { AbstractWorkflow, PusherProvider, SqsProvider, Workflow } from '../events'
import { SoruceProvider } from './source-provider'
import { CodeBuild } from 'aws-sdk'
import yaml from 'yaml'
import { S3Provider } from '../s3'
import { TaskEntity } from '../entities/task.entity'
import { PipelineRunnerProvider } from '../pipeline-runner'
import { plainToClass } from 'class-transformer'
import { BitbucketClientData } from '../entities/bitbucket-client.entity'
import { BitBucketEvent } from '../bitbucket'
import { ParameterProvider, PipelineProvider } from '../pipeline'
import { PackageManagerEnum } from '@reapit/foundations-ts-definitions'

@Workflow(QueueNamesEnum.CODEBUILD_EXECUTOR)
export class CodebuildExecutorWorkflow extends AbstractWorkflow<{
  pipeline: PipelineEntity
  pipelineRunner: PipelineRunnerEntity
  client?: BitbucketClientData
  event?: BitBucketEvent
}> {
  readonly s3BuildLogsLocation = `arn:aws:s3:::${process.env.DEPLOYMENT_LOG_BUCKET_NAME}`

  constructor(
    private readonly sourceProvider: SoruceProvider,
    sqsProvider: SqsProvider,
    private readonly s3Provider: S3Provider,
    private readonly pipelineRunnerProvider: PipelineRunnerProvider,
    private readonly pusherProvider: PusherProvider,
    private readonly parameterProvider: ParameterProvider,
    private readonly codeBuild: CodeBuild,
    private readonly pipelineProvider: PipelineProvider,
  ) {
    super(sqsProvider)
  }

  protected deserialisePayload(payload: string) {
    const json = JSON.parse(payload)

    const pipeline = plainToClass(PipelineEntity, json.pipeline)
    const pipelineRunner = plainToClass(PipelineRunnerEntity, json.pipelineRunner)
    const client = json.client
    const event = json.event

    return { pipeline, pipelineRunner, client, event }
  }

  async execute({
    pipeline,
    pipelineRunner,
    client,
  }: {
    pipeline: PipelineEntity
    pipelineRunner: PipelineRunnerEntity
    client?: BitbucketClientData
    event?: BitBucketEvent
  }) {
    try {
      const repoLocation = pipeline.repository?.repositoryUrl?.includes('github')
        ? await this.sourceProvider.downloadGithubSourceToS3(pipeline, pipelineRunner)
        : await this.sourceProvider.downloadBitbucketSourceToS3({
            pipeline,
            pipelineRunner,
            client: client || pipeline.bitbucketClient?.data,
          })

      const codebuildId = await this.executeCodebuild({
        pipeline,
        pipelineRunner,
        repoLocation,
      })

      pipelineRunner.codebuildId = codebuildId

      const signedUrl = await this.s3Provider.getSignedUrlPromise('getObject', {
        Key: `${pipelineRunner.codebuildId}.gz`,
        Bucket: process.env.DEPLOYMENT_LOG_BUCKET_NAME,
        Expires: 60 * 60 * 24 * 7,
      })

      pipelineRunner.s3BuildLogsLocation = signedUrl

      pipelineRunner.tasks = ['INSTALL', 'BUILD', 'DOWNLOAD_SOURCE', 'DEPLOY'].map((phase) => {
        const task = new TaskEntity()

        task.functionName = phase

        return task
      })

      await this.pipelineRunnerProvider.save(pipelineRunner)
    } catch (error) {
      await this.handleFailure(error, pipeline, pipelineRunner)
    }
  }

  private async handleFailure(error, pipeline: PipelineEntity, pipelineRunner: PipelineRunnerEntity) {
    console.error(error)
    console.log('codebuild config failure')

    pipelineRunner.buildStatus = 'FAILED'
    pipeline.buildStatus = 'FAILED'
    pipelineRunner.pipeline = pipeline

    await Promise.all([
      this.deleteMessage(),
      this.pipelineRunnerProvider.save(pipelineRunner),
      this.pipelineProvider.saveAll([pipeline]),
      this.pusherProvider.trigger(
        `private-${pipelineRunner.pipeline?.developerId}`,
        'pipeline-runner-update',
        pipelineRunner,
      ),
    ])
  }

  private async executeCodebuild({
    pipeline,
    pipelineRunner,
    repoLocation,
  }: {
    pipeline: PipelineEntity
    pipelineRunner: PipelineRunnerEntity
    repoLocation: string
  }) {
    const params = await this.parameterProvider.obtainParameters(pipeline.id as string)

    const setupCommands = [
      'n install 18',
      'n use 18',
      'CACHE_FOLDER=$(find . -maxdepth 1 -mindepth 1 -type d)',
      'echo $CACHE_FOLDER',
      'mv $CACHE_FOLDER/* ./',
      'mv $CACHE_FOLDER/.[^.]* ./',
      'rm -rf $CACHE_FOLDER',
    ]

    if (pipeline.packageManager && pipeline.packageManager === PackageManagerEnum.YARN_BERRY) {
      setupCommands.push('yarn --version')
      setupCommands.push('yarn config set nodeLinker node-modules')
    }

    const start = this.codeBuild.startBuild({
      projectName: process.env.CODE_BUILD_PROJECT_NAME as string,
      buildspecOverride: yaml.stringify({
        version: 0.2,
        env: {
          variables: params,
        },
        phases: {
          install: {
            'runtime-versions': {
              nodejs: 16,
            },
            commands: [
              ...setupCommands,
              pipeline.packageManager === PackageManagerEnum.YARN_BERRY
                ? 'yarn'
                : pipeline.packageManager === PackageManagerEnum.YARN
                  ? PackageManagerEnum.YARN
                  : `${pipeline.packageManager} install`,
            ],
          },
          build: {
            commands: [
              `${
                pipeline.packageManager === PackageManagerEnum.NPM
                  ? `${pipeline.packageManager} run`
                  : pipeline.packageManager?.includes(PackageManagerEnum.YARN)
                    ? 'yarn'
                    : pipeline.packageManager
              } ${pipeline.buildCommand}`,
            ],
          },
        },
        artifacts: {
          files: '**/*',
          'base-directory': pipeline.outDir,
        },
      }),
      sourceTypeOverride: 'S3',
      sourceLocationOverride: repoLocation,
      artifactsOverride: {
        type: 'S3',
        packaging: 'ZIP',
        location: process.env.DEPLOYMENT_VERSION_BUCKET_NAME,
        name: `${pipelineRunner.id}.zip`,
        path: `pipeline/${pipeline.uniqueRepoName}/`,
      },
      logsConfigOverride: {
        s3Logs: {
          status: 'ENABLED',
          location: this.s3BuildLogsLocation,
        },
      },
    })

    const result = await new Promise<CodeBuild.StartBuildOutput>((resolve, reject) => {
      start.send((error, data) => {
        if (error) {
          reject(error)
        }

        resolve(data)
      })
    }).catch(async (error) => {
      console.error(error)
      throw error
    })

    return result.build?.id?.split(':').pop()
  }
}
