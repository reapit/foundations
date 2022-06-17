import { Test, TestingModule } from '@nestjs/testing'
import { AwsModule } from '../../aws'
import { PipelineController } from '../pipeline-controller'
import { PipelineProvider } from '../pipeline-provider'
import { OwnershipProvider, CredGuard } from '../../auth'
import { EventDispatcher, PusherProvider } from '../../events'
import { v4 as uuid } from 'uuid'
import { PipelineModelInterface } from '@reapit/foundations-ts-definitions/deployment-schema'
import { PackageManagerEnum } from '../pipeline-dto'

process.env.NODE_ENV = 'local'

const mockPipelineProvider = {
  findById: jest.fn(),
  create: jest.fn(),
}

class MockOwnershipProvider {}

const mockPusherProvider = {
  trigger: jest.fn(),
}

const mockEventDispatcher = {
  triggerPipelineSetup: jest.fn(),
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
      imports: [AwsModule],
      controllers: [PipelineController],
      providers: [
        {
          provide: PipelineProvider,
          useValue: mockPipelineProvider,
        },
        {
          provide: OwnershipProvider,
          useClass: MockOwnershipProvider,
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
})
