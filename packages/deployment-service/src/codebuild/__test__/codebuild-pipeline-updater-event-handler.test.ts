import { PipelineRunnerProvider } from '../../pipeline-runner'
import { Test, TestingModule } from '@nestjs/testing'
import { v4 as uuid } from 'uuid'
import { EventDispatcher, PusherProvider } from '../../events'
import { CodebuildPipelineUpdaterEventHandler } from '../codebuild-pipeline-updater-event-handler'
import { BuildPhaseChangeStatusEvent, BuildStateChangeEvent, CodebuildEventStateEnum } from '../event-types'
import { SNSEventRecord } from 'aws-lambda'

const mockPipelineRunnerProvider = {
  save: jest.fn(),
  findByCodebuildId: jest.fn(),
}

const mockPusherProvider = {
  trigger: jest.fn(),
}

const mockEventDispatcher = {
  triggerCodebuildVersionDeploy: jest.fn(),
}

describe('CodebuildPipelineUpdateEventHandler', () => {
  let module: TestingModule
  beforeAll(async () => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'))

    module = await Test.createTestingModule({
      providers: [
        {
          provide: PipelineRunnerProvider,
          useValue: mockPipelineRunnerProvider,
        },
        {
          provide: PusherProvider,
          useValue: mockPusherProvider,
        },
        {
          provide: EventDispatcher,
          useValue: mockEventDispatcher,
        },
        CodebuildPipelineUpdaterEventHandler,
      ],
    }).compile()
  })

  describe('phaseChange', () => {
    afterEach(() => jest.resetAllMocks())

    it('Can update tasks from phase chage from QUEUED to IN_PROGRESS', async () => {
      const codebuildPipelineUpdateEventHandler = module.get<CodebuildPipelineUpdaterEventHandler>(
        CodebuildPipelineUpdaterEventHandler,
      )

      const codebuildEvent: BuildPhaseChangeStatusEvent = {
        id: uuid(),
        'detail-type': CodebuildEventStateEnum.PHASE_CHANGE,
        detail: {
          'build-id': uuid(),
          'additional-information': {
            phases: [
              {
                'phase-type': 'INSTALL',
                'phase-status': 'IN_PROGRESS',
                'start-time': new Date(),
                'duration-in-seconds': 0,
              },
            ],
          },
        },
      }

      mockPipelineRunnerProvider.findByCodebuildId.mockImplementationOnce(() => ({
        codebuildId: codebuildEvent.id,
        buildStatus: 'QUEUED',
        tasks: [
          {
            functionName: 'INSTALL',
            buildStatus: 'PENDING',
          },
        ],
      }))

      await codebuildPipelineUpdateEventHandler.handle({
        Sns: {
          Message: JSON.stringify(codebuildEvent),
        },
      } as SNSEventRecord)

      expect(mockPipelineRunnerProvider.save).toHaveBeenCalledWith({
        buildStatus: 'IN_PROGRESS',
        codebuildId: codebuildEvent.id,
        tasks: [
          {
            functionName: 'INSTALL',
            buildStatus: 'IN_PROGRESS',
            elapsedTime: '0',
            startTime: new Date(),
          },
        ],
      })
    })

    it('Can update tasks from phase chage from IN_PROGRESS to SUCCEEDED', async () => {
      const codebuildPipelineUpdateEventHandler = module.get<CodebuildPipelineUpdaterEventHandler>(
        CodebuildPipelineUpdaterEventHandler,
      )

      const codebuildEvent: BuildPhaseChangeStatusEvent = {
        id: uuid(),
        'detail-type': CodebuildEventStateEnum.PHASE_CHANGE,
        detail: {
          'build-id': uuid(),
          'additional-information': {
            phases: [
              {
                'phase-type': 'INSTALL',
                'phase-status': 'SUCCEEDED',
                'start-time': new Date(),
                'duration-in-seconds': 0,
              },
            ],
          },
        },
      }

      mockPipelineRunnerProvider.findByCodebuildId.mockImplementationOnce(() => ({
        codebuildId: codebuildEvent.id,
        buildStatus: 'QUEUED',
        tasks: [
          {
            functionName: 'INSTALL',
            buildStatus: 'PENDING',
          },
        ],
      }))

      await codebuildPipelineUpdateEventHandler.handle({
        Sns: {
          Message: JSON.stringify(codebuildEvent),
        },
      } as SNSEventRecord)

      expect(mockPipelineRunnerProvider.save).toHaveBeenCalledWith({
        buildStatus: 'IN_PROGRESS',
        codebuildId: codebuildEvent.id,
        tasks: [
          {
            functionName: 'INSTALL',
            buildStatus: 'SUCCEEDED',
            elapsedTime: '0',
            startTime: new Date(),
          },
        ],
      })
    })
  })

  describe('stateChange', () => {
    afterEach(() => jest.resetAllMocks())

    it('Can save pipeline runner as successful', async () => {
      const codebuildPipelineUpdateEventHandler = module.get<CodebuildPipelineUpdaterEventHandler>(
        CodebuildPipelineUpdaterEventHandler,
      )

      const codebuildEvent: BuildStateChangeEvent = {
        'detail-type': CodebuildEventStateEnum.STATE_CHANGE,
        detail: {
          'build-status': 'SUCCEEDED',
          'build-id': uuid(),
          'project-name': 'any',
          'additional-information': {
            'build-complete': true,
            initiator: '',
            'build-start-time': new Date().toISOString(),
            'queued-timeout-in-minutes': 12,
          },
          'current-phase': 'BUILD',
          'current-phase-context': 'SUCCEEDED',
          version: 'v2.0.0',
        },
      }

      mockPipelineRunnerProvider.findByCodebuildId.mockImplementationOnce(() => ({
        codebuildId: codebuildEvent.detail['build-id'],
        buildStatus: 'IN_PROGRESS',
        pipeline: {
          buildStatus: 'IN_PROGRESS',
        },
        tasks: [
          {
            functionName: 'DEPLOY',
            buildStatus: 'IN_PROGRESS',
          },
        ],
      }))

      await codebuildPipelineUpdateEventHandler.handle({
        Sns: {
          Message: JSON.stringify(codebuildEvent),
        },
      } as SNSEventRecord)

      expect(mockEventDispatcher.triggerCodebuildVersionDeploy).toHaveBeenCalled()
    })

    it('Can save pipeline runner as failed', async () => {
      const codebuildPipelineUpdateEventHandler = module.get<CodebuildPipelineUpdaterEventHandler>(
        CodebuildPipelineUpdaterEventHandler,
      )

      const codebuildEvent: BuildStateChangeEvent = {
        'detail-type': CodebuildEventStateEnum.STATE_CHANGE,
        detail: {
          'build-status': 'FAILED',
          'build-id': uuid(),
          'project-name': 'any',
          'additional-information': {
            'build-complete': true,
            initiator: '',
            'build-start-time': new Date().toISOString(),
            'queued-timeout-in-minutes': 12,
          },
          'current-phase': 'BUILD',
          'current-phase-context': 'FAILED',
          version: 'v2.0.0',
        },
      }

      mockPipelineRunnerProvider.findByCodebuildId.mockImplementationOnce(() => ({
        codebuildId: codebuildEvent.detail['build-id'],
        buildStatus: 'FAILED',
        pipeline: {
          buildStatus: 'FAILED',
        },
        tasks: [
          {
            functionName: 'BUILD',
            buildStatus: 'IN_PROGRESS',
          },
        ],
      }))

      await codebuildPipelineUpdateEventHandler.handle({
        Sns: {
          Message: JSON.stringify(codebuildEvent),
        },
      } as SNSEventRecord)

      expect(mockPipelineRunnerProvider.save).toHaveBeenCalledWith({
        buildStatus: 'FAILED',
        codebuildId: codebuildEvent.detail['build-id'],
        pipeline: {
          buildStatus: 'FAILED',
        },
        tasks: [
          {
            functionName: 'BUILD',
            buildStatus: 'IN_PROGRESS',
          },
        ],
      })
    })
  })
})
