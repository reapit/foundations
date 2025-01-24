import { EventDispatcher, PusherProvider } from '../../events'
import { PipelineProvider } from '../../pipeline'
import { PipelineRunnerProvider } from '../../pipeline-runner'
import { Test, TestingModule } from '@nestjs/testing'
import { BitbucketProvider } from '../bitbucket-provider'
import { BitBucketWebhookController } from '../bitbucket-webhook-controller'
import { plainToInstance } from 'class-transformer'
import { PipelineEntity } from '../../entities/pipeline.entity'
import { PipelineRunnerEntity } from '../../entities/pipeline-runner.entity'
import { INestApplication } from '@nestjs/common'

const successfulClientKey = 'successful-client-key'

const mockBitbucketProvider = {
  installClient: jest.fn(),
  findByClientKey: jest.fn(),
}

const mockEventDispatcher = {
  triggerCodebuildExecutor: jest.fn(),
}

const mockPipelineProvider = {
  findByRepo: jest.fn(),
}

const mockPipelineRunnerProvider = {
  create: jest.fn(),
  pipelineRunnerCountRunning: jest.fn(),
}

const mockPusherProvider = {
  triggerArray: jest.fn(),
  trigger: jest.fn(),
}

const successfulToken = 'Bearer authed-token'

jest.mock('atlassian-jwt', () => ({
  decodeSymmetric: jest.fn((token) => {
    if (token === successfulToken.substring(4)) {
      return {
        iss: 'bitbucket',
        aud: [successfulClientKey],
        // exp: (new Date()).setHours((new Date).getHours() + 1),
      }
    } else {
      return undefined
    }
  }),
  SymmetricAlgorithm: {
    HS256: '',
  },
}))

describe('BitbucketWebhookController', () => {
  let app: INestApplication

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: BitbucketProvider,
          useValue: mockBitbucketProvider,
        },
        {
          provide: EventDispatcher,
          useValue: mockEventDispatcher,
        },
        {
          provide: PipelineProvider,
          useValue: mockPipelineProvider,
        },
        {
          provide: PipelineRunnerProvider,
          useValue: mockPipelineRunnerProvider,
        },
        {
          provide: PusherProvider,
          useValue: mockPusherProvider,
        },
      ],
      controllers: [BitBucketWebhookController],
    }).compile()

    app = module.createNestApplication()
  })

  describe('handleEventTypes', () => {
    it('installClient', async () => {
      const bitBucketWebhookController = app.get<BitBucketWebhookController>(BitBucketWebhookController)
      const clientKey = 'clientKey'
      mockBitbucketProvider.installClient.mockImplementationOnce(() => [{}, {}])

      await bitBucketWebhookController.handle(
        {
          eventType: 'installed',
          clientKey,
        },
        {} as any,
      )

      expect(mockBitbucketProvider.installClient).toHaveBeenCalledWith(clientKey, {
        clientKey,
        eventType: 'installed',
      })
    })
  })

  describe('handlePushEvent', () => {
    it('Can start deployment from bitbucket push event', async () => {
      const bitBucketWebhookController = app.get<BitBucketWebhookController>(BitBucketWebhookController)
      const clientKey = successfulClientKey

      mockPipelineProvider.findByRepo.mockImplementationOnce(() =>
        plainToInstance(PipelineEntity, {
          branch: 'master',
          buildStatus: 'SUCCEEDED',
        }),
      )
      mockBitbucketProvider.findByClientKey.mockImplementationOnce(() => ({}))
      mockPipelineRunnerProvider.pipelineRunnerCountRunning.mockImplementationOnce(() => 0)
      mockPipelineRunnerProvider.create.mockImplementationOnce(() => plainToInstance(PipelineRunnerEntity, {}))

      await bitBucketWebhookController.handle(
        {
          clientKey,
          event: 'push',
          data: {
            repository: {
              full_name: '',
            },
            push: {
              changes: [
                {
                  new: {
                    name: 'master',
                  },
                },
              ],
            },
          },
        },
        {
          headers: {
            authorization: successfulToken,
          },
          path: '',
        } as any,
      )

      expect(mockPipelineRunnerProvider.create).toHaveBeenCalled()
      expect(mockEventDispatcher.triggerCodebuildExecutor).toHaveBeenCalled()
    })
  })
})
