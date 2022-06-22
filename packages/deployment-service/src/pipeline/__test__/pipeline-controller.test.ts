import { Test, TestingModule } from '@nestjs/testing'
import { PipelineController } from '../pipeline-controller'
import { PipelineProvider } from '../pipeline-provider'
import { OwnershipProvider, CredGuard } from '@reapit/utils-nest'
import { EventDispatcher, PusherProvider } from '../../events'
import { v4 as uuid } from 'uuid'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions/deployment-schema'
import { PackageManagerEnum } from '../pipeline-dto'
import { plainToInstance } from 'class-transformer'
import { PipelineEntity } from '../../entities/pipeline.entity'

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

const mockCredGuard = {}

describe('PipelineController', () => {
  let app: TestingModule

  beforeAll(async () => {
    app = await Test.createTestingModule({
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
      ],
    })
      .overrideGuard(CredGuard)
      .useValue(mockCredGuard)
      .compile()
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
        },
        {
          developerId: 'developer-id',
          type: 'jwt',
        },
      )

      expect(mockEventDispatcher.triggerPipelineSetup).toHaveBeenCalled()
      expect(mockPusherProvider.trigger).not.toHaveBeenCalled()
    })

    it('Can result in pusher action with existing pipeline', async () => {
      const pipelineController = app.get<PipelineController>(PipelineController)

      mockPipelineProvider.findById.mockImplementationOnce(() => mockPipeline)
      mockPipelineProvider.create.mockImplementationOnce((params) => {
        return {
          ...mockPipeline,
          ...params,
        }
      })

      await pipelineController.create(
        {
          packageManager: PackageManagerEnum.YARN,
          outDir: 'build',
        },
        {
          developerId: 'developer-id',
          type: 'jwt',
        },
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
        },
        {
          packageManager: PackageManagerEnum.YARN,
          outDir: 'build',
          buildStatus: 'PROVISION_REQUEST',
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
        },
        {
          packageManager: PackageManagerEnum.YARN,
          outDir: 'build',
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
      })

      expect(mockEventDispatcher.triggerPipelineTearDownStart).toHaveBeenCalled()
      expect(mockPusherProvider.trigger).toHaveBeenCalled()
    })
  })
})
