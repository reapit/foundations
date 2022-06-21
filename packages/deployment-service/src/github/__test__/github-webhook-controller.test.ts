import { EventDispatcher, PusherProvider } from '../../events'
import { PipelineProvider } from '../../pipeline'
import { PipelineRunnerProvider } from '../../pipeline-runner'
import { Test, TestingModule } from '@nestjs/testing'
import { GithubWebhookController } from '../github-webhook-controller'
import { App } from '@octokit/app'
import { plainToInstance } from 'class-transformer'
import { PipelineEntity } from '../../entities/pipeline.entity'

const mockEventDispatcher = {
  triggerCodebuildExecutor: jest.fn(),
}

const mockPipelineProvider = {
  findByRepo: jest.fn(),
  findPipelinesByRepositoryId: jest.fn(),
  updatePipelinesWithRepo: jest.fn(),
}

const mockPipelineRunnerProvider = {
  create: jest.fn(),
  pipelineRunnerCountRunning: jest.fn(),
}

const mockPusherProvider = {
  triggerArray: jest.fn(),
  trigger: jest.fn(),
}

const successToken = 'success-token'

const mockGithubProvider = {
  webhooks: {
    verify: jest.fn((something, token) => {
      if (token === successToken) {
        return {}
      } else return undefined
    }),
  },
}

describe('GithubWebhookController', () => {
  let module: TestingModule

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [
        {
          provide: App,
          useValue: mockGithubProvider,
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
      controllers: [GithubWebhookController],
    }).compile()
  })

  describe('Handle commits', () => {
    it('Can make deployment from commit event', async () => {
      const githubWebhookController = module.get<GithubWebhookController>(GithubWebhookController)
      mockPipelineRunnerProvider.pipelineRunnerCountRunning.mockImplementationOnce(() => 0)
      mockPipelineProvider.findPipelinesByRepositoryId.mockImplementationOnce(() => [
        plainToInstance(PipelineEntity, {
          branch: 'master',
          buildStatus: 'FAILED',
        }),
      ])

      await githubWebhookController.handler(
        {
          headers: {
            ['x-hub-signature-256']: successToken,
          },
        } as any,
        {
          ref: '/head/master/bin',
          commits: [],
          repository: {
            id: 'repo-id',
          },
        },
      )

      expect(mockEventDispatcher.triggerCodebuildExecutor).toHaveBeenCalled()
    })
  })

  describe('Handle install', () => {
    it('Can install repo to pipeline', async () => {
      const githubWebhookController = module.get<GithubWebhookController>(GithubWebhookController)
      mockPipelineRunnerProvider.pipelineRunnerCountRunning.mockImplementationOnce(() => 0)
      mockPipelineProvider.findPipelinesByRepositoryId.mockImplementationOnce(() => [
        plainToInstance(PipelineEntity, {
          branch: 'master',
          buildStatus: 'FAILED',
        }),
      ])
      mockPipelineProvider.updatePipelinesWithRepo.mockImplementationOnce(() => ({
        affected: 1,
      }))
      mockPipelineProvider.findPipelinesByRepositoryId.mockImplementationOnce(() => [
        {
          developerId: 'developerId',
        },
      ])

      await githubWebhookController.handler(
        {
          headers: {
            ['x-hub-signature-256']: successToken,
          },
        } as any,
        {
          action: 'added',
          repositories_added: [
            {
              id: 'repo-id',
              full_name: 'test',
            },
          ],
          installation: {
            id: 'installation-id',
          },
        },
      )

      expect(mockEventDispatcher.triggerCodebuildExecutor).toHaveBeenCalled()
    })
  })
})
