import { Test, TestingModule } from '@nestjs/testing'
import { EventDispatcher, PusherProvider } from '../../events'
import { S3 } from 'aws-sdk'
import { S3Provider } from '../../s3'
import { v4 as uuid } from 'uuid'
import { PipelineRunnerController } from '../pipeline-runner-controller'
import { PipelineRunnerProvider } from '../pipeline-runner-provider'
import { PipelineProvider } from '../../pipeline/pipeline-provider'
import { DeployProvider } from '../../deployment'
import { OwnershipProvider, CredGuard, CredsType } from '@reapit/utils-nest'
import { plainToInstance } from 'class-transformer'
import { PipelineEntity } from '../../entities/pipeline.entity'
import { UnprocessableEntityException } from '@nestjs/common'

const mockS3Provider = {
  upload: jest.fn(),
}

const mockPipelineRunnerProvider = {
  update: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  pipelineRunnerCountRunning: jest.fn(),
  save: jest.fn(),
  resetCurrentlyDeployed: jest.fn(),
}

const mockPusherProvider = {
  trigger: jest.fn(),
}

const mockPipelineProvider = {
  deleteMessage: jest.fn(),
  findById: jest.fn(),
}

const mockOwnershipProvider = {
  check: jest.fn(),
}

const mockEventDispatcher = {
  triggerCodebuildExecutor: jest.fn(),
}

const mockDeployProvider = {
  deployFromStore: jest.fn(),
}

const mockCredGuard = {}

describe('PipelineRunnerController', () => {
  let module: TestingModule
  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        PipelineRunnerController,
        {
          provide: S3,
          useValue: {},
        },
        {
          provide: S3Provider,
          useValue: mockS3Provider,
        },
        {
          provide: PusherProvider,
          useValue: mockPusherProvider,
        },
        {
          provide: PipelineRunnerProvider,
          useValue: mockPipelineRunnerProvider,
        },
        {
          provide: PipelineProvider,
          useValue: mockPipelineProvider,
        },
        {
          provide: EventDispatcher,
          useValue: mockEventDispatcher,
        },
        {
          provide: DeployProvider,
          useValue: mockDeployProvider,
        },
        {
          provide: OwnershipProvider,
          useValue: mockOwnershipProvider,
        },
      ],
    })
      .overrideGuard(CredGuard)
      .useValue(mockCredGuard)
      .compile()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('Create PipelineRunner', () => {
    afterEach(() => {
      jest.resetAllMocks()
    })

    it('Successful creation', async () => {
      const pipelineRunnerController = module.get<PipelineRunnerController>(PipelineRunnerController)
      const pipelineRunnerId = uuid()
      const pipelineId = uuid()
      const developerId = uuid()

      mockPipelineProvider.findById.mockImplementationOnce(() =>
        plainToInstance(PipelineEntity, {
          id: pipelineId,
          buildStatus: 'FAILED',
        }),
      )

      mockPipelineRunnerProvider.findById.mockImplementationOnce(() => ({
        id: pipelineRunnerId,
      }))
      mockPipelineRunnerProvider.pipelineRunnerCountRunning.mockImplementationOnce(() => 0)
      mockPipelineRunnerProvider.create.mockImplementationOnce(() => ({
        pipelineRunnerId,
      }))

      mockOwnershipProvider.check.mockImplementationOnce(() => true)

      await pipelineRunnerController.create(pipelineId, {
        developerId,
        type: 'jwt',
      } as CredsType)

      expect(mockPipelineRunnerProvider.create).toHaveBeenCalled()
    })

    it('Can fail with already running deployment', async () => {
      const pipelineRunnerController = module.get<PipelineRunnerController>(PipelineRunnerController)
      const pipelineRunnerId = uuid()
      const pipelineId = uuid()
      const developerId = uuid()

      mockPipelineProvider.findById.mockImplementationOnce(() =>
        plainToInstance(PipelineEntity, {
          id: pipelineId,
          buildStatus: 'FAILED',
        }),
      )

      mockPipelineRunnerProvider.findById.mockImplementationOnce(() => ({
        id: pipelineRunnerId,
      }))
      mockPipelineRunnerProvider.pipelineRunnerCountRunning.mockImplementationOnce(() => 1)

      mockOwnershipProvider.check.mockImplementationOnce(() => true)

      try {
        await pipelineRunnerController.create(pipelineId, {
          developerId,
          type: 'jwt',
        } as CredsType)
        expect(false).toBeTruthy()
      } catch (e) {
        expect(e).toBeInstanceOf(UnprocessableEntityException)
      }

      expect(mockPipelineRunnerProvider.create).not.toHaveBeenCalled()
    })
  })

  describe('Update PipelineRunner', () => {
    it('Fail to update on status not IN_PROGRESS', async () => {
      const pipelineRunnerController = module.get<PipelineRunnerController>(PipelineRunnerController)
      const pipelineRunnerId = uuid()
      const developerId = uuid()

      mockPipelineRunnerProvider.findById.mockImplementationOnce(() => ({
        id: pipelineRunnerId,
        developerId,
        buildStatus: 'FAILED',
        pipeline: {},
      }))

      await pipelineRunnerController.update(
        pipelineRunnerId,
        {},
        {
          developerId,
          type: 'jwt',
        } as CredsType,
      )

      expect(mockPipelineRunnerProvider.update).not.toHaveBeenCalled()
    })

    it('Update on status IN_PROGRESS', async () => {
      const pipelineRunnerController = module.get<PipelineRunnerController>(PipelineRunnerController)
      const pipelineRunnerId = uuid()
      const developerId = uuid()

      mockPipelineRunnerProvider.findById.mockImplementationOnce(() => ({
        id: pipelineRunnerId,
        developerId,
        buildStatus: 'IN_PROGRESS',
        pipeline: {},
      }))

      await pipelineRunnerController.update(
        pipelineRunnerId,
        {},
        {
          developerId,
          type: 'jwt',
        } as CredsType,
      )

      expect(mockPipelineRunnerProvider.update).toHaveBeenCalled()
    })
  })

  describe('Release Version', () => {
    it('Manual Release success', async () => {
      const pipelineRunnerController = module.get<PipelineRunnerController>(PipelineRunnerController)
      const pipelineId = uuid()
      const pipelineRunnerId = uuid()
      const developerId = uuid()
      const version = 'v.2.0.0'

      mockPipelineProvider.findById.mockImplementationOnce(() => ({
        id: pipelineId,
        developerId,
        buildStatus: 'SUCCEEDED',
      }))
      mockPipelineRunnerProvider.create.mockImplementationOnce(() => ({
        id: pipelineRunnerId,
        version,
        pipeline: {
          developerId,
          id: pipelineId,
        },
      }))
      mockPipelineRunnerProvider.save.mockImplementationOnce((pipelineRunner) => pipelineRunner)
      mockPipelineRunnerProvider.resetCurrentlyDeployed.mockImplementationOnce(() => {})
      mockDeployProvider.deployFromStore.mockImplementationOnce(() => {})

      await pipelineRunnerController.release(
        pipelineRunnerId,
        version,
        {
          developerId,
          type: 'jwt',
        } as CredsType,
        {
          file: 'sdg',
        },
      )

      expect(mockDeployProvider.deployFromStore).toHaveBeenCalled()
      expect(mockPipelineRunnerProvider.save).toHaveBeenCalledWith({
        buildStatus: 'COMPLETED',
        currentlyDeployed: true,
        id: pipelineRunnerId,
        version,
        pipeline: {
          id: pipelineId,
          buildStatus: 'SUCCEEDED',
          developerId,
        },
      })
    })

    it('Failed to deploy', async () => {
      const pipelineRunnerController = module.get<PipelineRunnerController>(PipelineRunnerController)
      const pipelineId = uuid()
      const pipelineRunnerId = uuid()
      const developerId = uuid()
      const version = 'v.2.0.0'

      mockPipelineProvider.findById.mockImplementationOnce(() => ({
        id: pipelineId,
        developerId,
        buildStatus: 'SUCCEEDED',
      }))
      mockPipelineRunnerProvider.create.mockImplementationOnce(() => ({
        id: pipelineRunnerId,
        version,
        pipeline: {
          developerId,
          id: pipelineId,
        },
      }))
      mockPipelineRunnerProvider.save.mockImplementationOnce((pipelineRunner) => pipelineRunner)
      mockPipelineRunnerProvider.resetCurrentlyDeployed.mockImplementationOnce(() => {})
      mockDeployProvider.deployFromStore.mockImplementationOnce(() => {
        throw new Error('failed to do the things')
      })

      await pipelineRunnerController.release(
        pipelineRunnerId,
        version,
        {
          developerId,
          type: 'jwt',
        } as CredsType,
        {
          file: 'sdg',
        },
      )

      expect(mockDeployProvider.deployFromStore).toHaveBeenCalled()
      expect(mockPipelineRunnerProvider.save).toHaveBeenCalledWith({
        buildStatus: 'FAILED',
        id: pipelineRunnerId,
        version,
        pipeline: {
          id: pipelineId,
          buildStatus: 'FAILED',
          developerId,
        },
      })
    })
  })

  describe('Deploy Previous Version', () => {
    it('', async () => {
      const pipelineRunnerController = module.get<PipelineRunnerController>(PipelineRunnerController)
      const pipelineId = uuid()
      const pipelineRunnerId = uuid()
      const developerId = uuid()
      const version = 'v.2.0.0'

      mockPipelineProvider.findById.mockImplementationOnce(() => ({
        id: pipelineId,
        developerId,
        buildStatus: 'SUCCEEDED',
      }))
      mockPipelineRunnerProvider.create.mockImplementationOnce(() => ({
        id: pipelineRunnerId,
        version,
        pipeline: {
          developerId,
          id: pipelineId,
        },
      }))
      mockPipelineRunnerProvider.save.mockImplementationOnce((pipelineRunner) => pipelineRunner)
      mockPipelineRunnerProvider.resetCurrentlyDeployed.mockImplementationOnce(() => {})
      mockDeployProvider.deployFromStore.mockImplementationOnce(() => {})

      await pipelineRunnerController.release(
        pipelineRunnerId,
        version,
        {
          developerId,
          type: 'jwt',
        } as CredsType,
        {
          file: 'sdg',
        },
      )

      expect(mockDeployProvider.deployFromStore).toHaveBeenCalled()
      expect(mockPipelineRunnerProvider.save).toHaveBeenCalledWith({
        buildStatus: 'COMPLETED',
        id: pipelineRunnerId,
        version,
        currentlyDeployed: true,
        pipeline: {
          id: pipelineId,
          buildStatus: 'SUCCEEDED',
          developerId,
        },
      })
    })
  })
})
