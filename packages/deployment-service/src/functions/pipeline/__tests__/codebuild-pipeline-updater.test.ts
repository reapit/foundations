import { pusher } from '../../../services'
import { handleStateChange } from '../codebuild-pipeline-updater/handle-state-change'
import { BuildStateChangeEvent, CodebuildEventStateEnum } from '../codebuild-pipeline-updater/types'

const SUCCESS_PIPELINE_RUNNER_CODEBUILD_ID = 'SUCCESS_PIPELINE_RUNNER_CODEBUILD_ID'

jest.mock('../../../services/github-app', () => ({
  githubApp: {
    getInstallationOctokit: () => {
      return Promise.resolve({
        request: () =>
          Promise.resolve({
            data: new ArrayBuffer(10),
          }),
      })
    },
  },
}))

jest.mock('../../../services/pusher', () => ({
  pusher: {
    trigger: jest.fn(() => new Promise((resolve) => resolve(undefined))),
  },
}))

jest.mock('../../../services/sqs', () => ({
  sqs: {
    sendMessage: (params, callback) => {
      callback()
    },
  },
}))

const mockReturnValue = jest.fn()

jest.mock('../../../services/pipeline-runner', () => ({
  findPipelineRunnerByCodeBuildId: (codebuildId) => {
    switch (codebuildId) {
      case SUCCESS_PIPELINE_RUNNER_CODEBUILD_ID:
        return Promise.resolve({
          codebuildId,
          pipeline: {
            buildStatus: 'QUEUED',
          },
          buildStatus: 'QUEUED',
        })
      default:
        return Promise.resolve(undefined)
    }
  },
  savePipelineRunnerEntity: (entity) =>
    new Promise<void>((resolve) => {
      mockReturnValue(entity)
      resolve(entity)
    }),
}))

describe('codebuild-pipeline-updater', () => {
  describe('handle-state-change', () => {
    beforeEach(() => {
      jest.resetAllMocks()
    })

    it('Can start codebuild state change handler', async () => {
      await handleStateChange({
        event: {
          'detail-type': CodebuildEventStateEnum.STATE_CHANGE,
          detail: {
            'build-status': 'STARTED',
            'additional-information': {
              'build-complete': false,
              initiator: 'test',
              'build-start-time': 'test',
              'queued-timeout-in-minutes': 23456,
            },
          },
        } as BuildStateChangeEvent,
        buildId: SUCCESS_PIPELINE_RUNNER_CODEBUILD_ID,
      })

      expect(mockReturnValue).toHaveBeenCalled()
      expect(mockReturnValue.mock.calls[0][0].pipeline.buildStatus).toBe('IN_PROGRESS')
      expect(mockReturnValue.mock.calls[0][0].buildStatus).toBe('IN_PROGRESS')
      expect(pusher.trigger).toHaveBeenCalled()
    })

    it('Can complete failure', async () => {
      await handleStateChange({
        event: {
          'detail-type': CodebuildEventStateEnum.STATE_CHANGE,
          detail: {
            'build-status': 'FAILED',
            'additional-information': {
              'build-complete': true,
              initiator: 'test',
              'build-start-time': 'test',
              'queued-timeout-in-minutes': 23456,
            },
          },
        } as BuildStateChangeEvent,
        buildId: SUCCESS_PIPELINE_RUNNER_CODEBUILD_ID,
      })

      expect(pusher.trigger).toHaveBeenCalled()
      expect(mockReturnValue).toHaveBeenCalled()
      expect(mockReturnValue.mock.calls[0][0].pipeline.buildStatus).toBe('FAILED')
      expect(mockReturnValue.mock.calls[0][0].buildStatus).toBe('FAILED')
    })
  })

  describe('handle-phase-change', () => {})
})
