import { SqsProvider } from '../../events'
import { ParameterProvider } from '../../pipeline'
import { PipelineRunnerProvider, TaskProvider } from '../../pipeline-runner'
import { Test, TestingModule } from '@nestjs/testing'
import { SoruceProvider } from '../source-provider'
import { SQSRecord } from 'aws-lambda'
import { v4 as uuid } from 'uuid'
import { PusherProvider } from '../../events'
import { CodebuildDeployWorkflow } from '../codebuild-deploy-workflow'
import { DeployProvider } from '../../deployment'

const mockSourceProvider = {
  downloadGithubSourceToS3: jest.fn(),
}

const mockSqsProvider = {
  deleteMessage: jest.fn(),
}

const mockDeployProvider = {
  deployFromStore: jest.fn(),
}

const mockPipelineRunnerProvider = {
  save: jest.fn(),
  findById: jest.fn(),
  resetCurrentlyDeployed: jest.fn(),
}

const mockParameterProvider = {
  obtainParameters: jest.fn(),
}

const mockTaskProvider = {
  update: jest.fn(),
}

const mockPusherProvider = {
  trigger: jest.fn(),
}

describe('CodebuildDeployWorkflow', () => {
  let module: TestingModule
  beforeAll(async () => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'))

    module = await Test.createTestingModule({
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
          provide: DeployProvider,
          useValue: mockDeployProvider,
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
          provide: TaskProvider,
          useValue: mockTaskProvider,
        },
        {
          provide: PusherProvider,
          useValue: mockPusherProvider,
        },
        CodebuildDeployWorkflow,
      ],
    }).compile()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('Successfully deploy', async () => {
    const pipelineId = uuid()
    const pipelineRunnerId = uuid()
    const repository = 'https://github.com/reapit/foundations'
    const codebuildDeployWorkflow = module.get<CodebuildDeployWorkflow>(CodebuildDeployWorkflow)

    mockPipelineRunnerProvider.save.mockImplementationOnce((pipelineRunner) => pipelineRunner)
    mockPipelineRunnerProvider.findById.mockImplementationOnce(() => ({
      buildStatus: 'IN_PROGRESS',
      pipeline: {
        id: pipelineId,
        repository,
        installtionId: 'installationId',
        repositoryId: 'repositoryId',
      },
      id: pipelineRunnerId,
      tasks: [
        {
          functionName: 'DEPLOY',
          buildStatus: 'PENDING',
        },
      ],
    }))

    await codebuildDeployWorkflow.run({
      body: JSON.stringify({
        id: pipelineRunnerId,
      }),
      receiptHandle: '',
    } as SQSRecord)

    expect(mockPipelineRunnerProvider.save).toHaveBeenLastCalledWith({
      buildStatus: 'SUCCEEDED',
      id: pipelineRunnerId,
      currentlyDeployed: true,
      tasks: [
        {
          buildStatus: 'SUCCEEDED',
          functionName: 'DEPLOY',
          elapsedTime: '0',
          endTime: new Date(),
          startTime: new Date(),
        },
      ],
      pipeline: {
        id: pipelineId,
        repository,
        buildStatus: 'SUCCEEDED',
        installtionId: 'installationId',
        repositoryId: 'repositoryId',
      },
    })
  })

  it('Fail gracefully', async () => {
    const pipelineId = uuid()
    const pipelineRunnerId = uuid()
    const repository = 'https://github.com/reapit/foundations'
    const codebuildDeployWorkflow = module.get<CodebuildDeployWorkflow>(CodebuildDeployWorkflow)
    mockSourceProvider.downloadGithubSourceToS3.mockImplementationOnce(() => {
      throw new Error('failed to obtain github stuffs')
    })
    mockDeployProvider.deployFromStore.mockImplementationOnce(() => {
      throw new Error('failed to deploy')
    })
    mockPipelineRunnerProvider.save.mockImplementationOnce((pipelineRunner) => pipelineRunner)
    mockPipelineRunnerProvider.findById.mockImplementationOnce(() => ({
      buildStatus: 'IN_PROGRESS',
      pipeline: {
        id: pipelineId,
        repository,
        installtionId: 'installationId',
        repositoryId: 'repositoryId',
      },
      id: pipelineRunnerId,
      tasks: [
        {
          functionName: 'DEPLOY',
          buildStatus: 'PENDING',
        },
      ],
    }))

    await codebuildDeployWorkflow.run({
      body: JSON.stringify({
        id: pipelineRunnerId,
      }),
      receiptHandle: '',
    } as SQSRecord)

    expect(mockPipelineRunnerProvider.save).toHaveBeenLastCalledWith({
      buildStatus: 'FAILED',
      id: pipelineRunnerId,
      tasks: [
        {
          buildStatus: 'FAILED',
          functionName: 'DEPLOY',
          elapsedTime: '0',
          endTime: new Date(),
          startTime: new Date(),
        },
      ],
      pipeline: {
        id: pipelineId,
        repository,
        buildStatus: 'FAILED',
        installtionId: 'installationId',
        repositoryId: 'repositoryId',
      },
    })
  })

  it('Can be canceled', async () => {
    const pipelineId = uuid()
    const pipelineRunnerId = uuid()
    const repository = 'https://github.com/reapit/foundations'
    const codebuildDeployWorkflow = module.get<CodebuildDeployWorkflow>(CodebuildDeployWorkflow)
    mockSourceProvider.downloadGithubSourceToS3.mockImplementationOnce(() => {
      throw new Error('failed to obtain github stuffs')
    })
    mockPipelineRunnerProvider.save.mockImplementationOnce((pipelineRunner) => pipelineRunner)
    mockPipelineRunnerProvider.findById.mockImplementationOnce(() => ({
      buildStatus: 'CANCEL',
      pipeline: {
        id: pipelineId,
        repository,
        installtionId: 'installationId',
        repositoryId: 'repositoryId',
      },
      id: pipelineRunnerId,
      tasks: [
        {
          functionName: 'DEPLOY',
          buildStatus: 'PENDING',
        },
      ],
    }))

    await codebuildDeployWorkflow.run({
      body: JSON.stringify({
        id: pipelineRunnerId,
      }),
      receiptHandle: '',
    } as SQSRecord)

    expect(mockPipelineRunnerProvider.save).toHaveBeenLastCalledWith({
      buildStatus: 'CANCELED',
      id: pipelineRunnerId,
      tasks: [
        {
          buildStatus: 'PENDING',
          functionName: 'DEPLOY',
        },
      ],
      pipeline: {
        id: pipelineId,
        repository,
        installtionId: 'installationId',
        repositoryId: 'repositoryId',
      },
    })
  })
})
