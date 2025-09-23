import { Test } from '@nestjs/testing'
import { PipelineController } from '../pipeline-controller'
import { PipelineProvider } from '../pipeline-provider'
import { OwnershipProvider, IdTokenGuard, CredsType } from '@reapit/utils-nest'
import { EventDispatcher, PusherProvider } from '../../events'
import { v4 as uuid } from 'uuid'
import { PackageManagerEnum, PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import { plainToInstance } from 'class-transformer'
import { PipelineEntity, RuntimeNodeVersionEnum } from '../../entities/pipeline.entity'
import { RepositoryProvider } from '../repository.provider'
import { INestApplication } from '@nestjs/common'

process.env.NODE_ENV = 'local'

const mockPipelineProvider = {
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
}

const mockOwnershipProvider = {
  check: jest.fn(),
}

const mockPusherProvider = {
  trigger: jest.fn(),
}

const mockEventDispatcher = {
  triggerPipelineSetup: jest.fn(),
  triggerPipelineTearDownStart: jest.fn(),
}

const mockPipeline: Partial<PipelineModelInterface> = {
  id: uuid(),
  buildStatus: 'CREATED',
}

const mockRepositoryProvider = {
  findOrCreate: jest.fn((repositoryUrl) =>
    Promise.resolve({
      repositoryUrl,
    }),
  ),
}

const mockCredGuard = {}

describe('PipelineController', () => {
  let app: INestApplication

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [PipelineController],
      providers: [
        {
          provide: PipelineProvider,
          useValue: mockPipelineProvider,
        },
        {
          provide: OwnershipProvider,
          useValue: mockOwnershipProvider,
        },
        {
          provide: PusherProvider,
          useValue: mockPusherProvider,
        },
        {
          provide: EventDispatcher,
          useValue: mockEventDispatcher,
        },
        {
          provide: RepositoryProvider,
          useValue: mockRepositoryProvider,
        },
      ],
    })
      .overrideGuard(IdTokenGuard)
      .useValue(mockCredGuard)
      .compile()

    app = module.createNestApplication()
  })

  describe('Create Pipeline', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    it('Can result in creation with pipeline setup being initiated', async () => {
      const pipelineController = app.get<PipelineController>(PipelineController)

      mockPipelineProvider.findById.mockImplementationOnce(() => undefined)
      mockPipelineProvider.create.mockImplementationOnce((params) => {
        return {
          id: uuid(),
          ...mockPipeline,
          ...params,
        }
      })

      await pipelineController.create(
        {
          packageManager: PackageManagerEnum.YARN,
          outDir: 'build',
          runtime: RuntimeNodeVersionEnum.NODE_16,
        },
        {
          developerId: 'developer-id',
          type: 'jwt',
        } as CredsType,
      )

      expect(mockEventDispatcher.triggerPipelineSetup).toHaveBeenCalled()
      expect(mockPusherProvider.trigger).not.toHaveBeenCalled()
    })

    it('Can result in pusher action with existing pipeline', async () => {
      const pipelineController = app.get<PipelineController>(PipelineController)

      mockPipelineProvider.findById.mockImplementationOnce(() => ({
        ...mockPipeline,
        buildStatus: 'READY_FOR_DEPLOYMENT',
      }))
      mockPipelineProvider.create.mockImplementationOnce((params) => {
        return {
          ...mockPipeline,
          ...params,
        }
      })

      await pipelineController.create(
        {
          packageManager: PackageManagerEnum.YARN,
          runtime: RuntimeNodeVersionEnum.NODE_16,
          outDir: 'build',
        },
        {
          developerId: 'developer-id',
          type: 'jwt',
        } as CredsType,
      )

      expect(mockEventDispatcher.triggerPipelineSetup).not.toHaveBeenCalled()
      expect(mockPusherProvider.trigger).toHaveBeenCalled()
    })
  })

  describe('Update Pipeline', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    it('Can trigger pipleine setup on update with infra condition to meet', async () => {
      const pipelineController = app.get<PipelineController>(PipelineController)
      const pipelineId = uuid()

      mockPipelineProvider.findById.mockImplementationOnce(() => ({
        ...mockPipeline,
        id: pipelineId,
        buildStatus: 'PRE_PROVISIONED',
      }))
      mockPipelineProvider.update.mockImplementationOnce((params) => {
        return {
          ...mockPipeline,
          ...params,
        }
      })
      mockOwnershipProvider.check.mockImplementationOnce(() => true)

      await pipelineController.edit(
        pipelineId,
        {
          developerId: 'developer-id',
          type: 'jwt',
        } as CredsType,
        {
          packageManager: PackageManagerEnum.YARN,
          outDir: 'build',
          buildStatus: 'PROVISION_REQUEST',
          runtime: RuntimeNodeVersionEnum.NODE_16,
        },
      )

      expect(mockEventDispatcher.triggerPipelineSetup).toHaveBeenCalled()
      expect(mockPusherProvider.trigger).toHaveBeenCalled()
    })

    it('Standard update with no infra condition', async () => {
      const pipelineController = app.get<PipelineController>(PipelineController)
      const pipelineId = uuid()

      mockPipelineProvider.findById.mockImplementationOnce(() => ({
        ...mockPipeline,
        id: pipelineId,
        buildStatus: 'SUCCEEDED',
      }))
      mockPipelineProvider.update.mockImplementationOnce((params) => {
        return {
          ...mockPipeline,
          ...params,
        }
      })
      mockOwnershipProvider.check.mockImplementationOnce(() => true)

      await pipelineController.edit(
        pipelineId,
        {
          developerId: 'developer-id',
          type: 'jwt',
        } as CredsType,
        {
          packageManager: PackageManagerEnum.YARN,
          outDir: 'build',
          runtime: RuntimeNodeVersionEnum.NODE_16,
        },
      )

      expect(mockEventDispatcher.triggerPipelineSetup).not.toHaveBeenCalled()
      expect(mockPusherProvider.trigger).toHaveBeenCalled()
    })
  })

  describe('Pipeline Delete', () => {
    it('Delete will trigger teardown', async () => {
      const pipelineController = app.get<PipelineController>(PipelineController)
      const pipelineId = uuid()

      mockPipelineProvider.findById.mockImplementationOnce(() =>
        plainToInstance(PipelineEntity, {
          ...mockPipeline,
          id: pipelineId,
          buildStatus: 'SUCCEEDED',
        }),
      )
      mockPipelineProvider.update.mockImplementationOnce((params) => {
        return {
          ...mockPipeline,
          ...params,
        }
      })
      mockOwnershipProvider.check.mockImplementationOnce(() => true)

      await pipelineController.deletePipeline(pipelineId, {
        developerId: 'developerId',
        type: 'jwt',
      } as CredsType)

      expect(mockEventDispatcher.triggerPipelineTearDownStart).toHaveBeenCalled()
      expect(mockPusherProvider.trigger).toHaveBeenCalled()
    })
  })
})
