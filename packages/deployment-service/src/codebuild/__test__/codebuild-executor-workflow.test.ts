import { SqsProvider } from '../../events'
import { ParameterProvider, PipelineProvider } from '../../pipeline'
import { PipelineRunnerProvider } from '../../pipeline-runner'
import { S3Provider } from '../../s3'
import { Test, TestingModule } from '@nestjs/testing'
import { CodebuildExecutorWorkflow } from '../codebuild-executor-workflow'
import { SoruceProvider } from '../source-provider'
import { CodeBuild } from 'aws-sdk'
import { SQSRecord } from 'aws-lambda'
import { v4 as uuid } from 'uuid'
import { PusherProvider } from '../../events'
import { plainToInstance } from 'class-transformer'
import { PipelineRunnerEntity } from '../../entities/pipeline-runner.entity'
import { TaskEntity } from '../../entities/task.entity'
import { INestApplication } from '@nestjs/common'

const mockSourceProvider = {
  downloadGithubSourceToS3: jest.fn(),
}

const mockSqsProvider = {
  deleteMessage: jest.fn(),
}

const signedUrl = 'signed-url'

const mockS3Provider = {
  getSignedUrlPromise: jest.fn(() => signedUrl),
}

const mockPipelineRunnerProvider = {
  save: jest.fn(),
}

const mockParameterProvider = {
  obtainParameters: jest.fn(),
}

const codebuildId = uuid()

const mockCodeBuild = {
  startBuild: jest.fn(() => ({
    send: jest.fn((callback) => {
      callback(undefined, {
        build: {
          id: codebuildId,
        },
      })
    }),
  })),
}

const mockPusherProvider = {
  trigger: jest.fn(),
}

const mockPipelineProvider = {
  saveAll: jest.fn(),
}

describe('CodebuildExecutorWorkflow', () => {
  let app: INestApplication
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: SoruceProvider,
          useValue: mockSourceProvider,
        },
        {
          provide: SqsProvider,
          useValue: mockSqsProvider,
        },
        {
          provide: S3Provider,
          useValue: mockS3Provider,
        },
        {
          provide: PipelineRunnerProvider,
          useValue: mockPipelineRunnerProvider,
        },
        {
          provide: ParameterProvider,
          useValue: mockParameterProvider,
        },
        {
          provide: CodeBuild,
          useValue: mockCodeBuild,
        },
        {
          provide: PusherProvider,
          useValue: mockPusherProvider,
        },
        {
          provide: PipelineProvider,
          useValue: mockPipelineProvider,
        },
        CodebuildExecutorWorkflow,
      ],
    }).compile()

    app = module.createNestApplication()
  })

  it('Failed to fetch github source', async () => {
    const pipelineId = uuid()
    const pipelineRunnerId = uuid()
    const repository = 'https://github.com/reapit/foundations'
    const codebuildExecutorWorkflow = app.get<CodebuildExecutorWorkflow>(CodebuildExecutorWorkflow)
    mockSourceProvider.downloadGithubSourceToS3.mockImplementationOnce(() => {
      throw new Error('failed to obtain github stuffs')
    })
    mockPipelineRunnerProvider.save.mockImplementationOnce((pipelineRunner) => pipelineRunner)

    await codebuildExecutorWorkflow.run({
      body: JSON.stringify({
        pipeline: {
          id: pipelineId,
          repository: {
            installtionId: 'installationId',
            repositoryId: 'repositoryId',
            repositoryUrl: repository,
          },
        },
        pipelineRunner: {
          id: pipelineRunnerId,
        },
      }),
      receiptHandle: '',
    } as SQSRecord)

    expect(mockPipelineRunnerProvider.save).toHaveBeenLastCalledWith(
      plainToInstance(PipelineRunnerEntity, {
        buildStatus: 'FAILED',
        id: pipelineRunnerId,
        currentlyDeployed: false,
        pipeline: {
          id: pipelineId,
          repository: {
            repositoryUrl: repository,
            installtionId: 'installationId',
            repositoryId: 'repositoryId',
          },
          buildStatus: 'FAILED',
        },
      }),
    )
  })

  it('Success to fetch github source', async () => {
    const pipelineId = uuid()
    const pipelineRunnerId = uuid()
    const repository = 'https://github.com/reapit/foundations'
    const codebuildExecutorWorkflow = app.get<CodebuildExecutorWorkflow>(CodebuildExecutorWorkflow)
    mockSourceProvider.downloadGithubSourceToS3.mockImplementationOnce(() => 'repos/location')
    mockPipelineRunnerProvider.save.mockImplementationOnce((pipelineRunner) => pipelineRunner)

    await codebuildExecutorWorkflow.run({
      body: JSON.stringify({
        pipeline: {
          id: pipelineId,
          repository: {
            installtionId: 'installationId',
            repositoryId: 'repositoryId',
            repositoryUrl: repository,
          },
        },
        pipelineRunner: {
          id: pipelineRunnerId,
          buildStatus: 'QUEUED',
        },
      }),
      receiptHandle: '',
    } as SQSRecord)

    expect(mockPipelineRunnerProvider.save).toHaveBeenLastCalledWith(
      plainToInstance(PipelineRunnerEntity, {
        buildStatus: 'QUEUED',
        id: pipelineRunnerId,
        currentlyDeployed: false,
        codebuildId,
        s3BuildLogsLocation: signedUrl,
        tasks: ['INSTALL', 'BUILD', 'DOWNLOAD_SOURCE', 'DEPLOY'].map((functionName) => {
          const task = new TaskEntity()
          task.functionName = functionName

          return task
        }),
      }),
    )
  })
})
