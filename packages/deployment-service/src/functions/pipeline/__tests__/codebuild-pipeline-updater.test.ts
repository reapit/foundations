import { codebuildPipelineUpdater } from '../codebuild-pipeline-updater'
import { handlePhaseChange } from '../codebuild-pipeline-updater/handle-phase-change'
import { handleStateChange } from '../codebuild-pipeline-updater/handle-state-change'
import { CodebuildEventStateEnum } from '../codebuild-pipeline-updater/types'
import { SNSEventRecord, Context } from 'aws-lambda'

const SUCCESS_PIPELINE_RUNNER_CODEBUILD_ID = 'SUCCESS_PIPELINE_RUNNER_CODEBUILD_ID'

jest.mock('../codebuild-pipeline-updater/handle-phase-change', () => ({
  handlePhaseChange: jest.fn(),
}))

jest.mock('../codebuild-pipeline-updater/handle-state-change', () => ({
  handleStateChange: jest.fn(),
}))

describe('codebuild-pipeline-updater-handler', () => {
  it('Can call handle-state-change', async () => {
    await codebuildPipelineUpdater(
      {
        Records: [
          {
            Sns: {
              Message: JSON.stringify({
                'detail-type': CodebuildEventStateEnum.STATE_CHANGE,
                detail: {
                  'build-id': `:${SUCCESS_PIPELINE_RUNNER_CODEBUILD_ID}`,
                },
              }),
            },
          } as SNSEventRecord,
        ],
      },
      {} as Context,
      () => {},
    )

    expect(handleStateChange).toHaveBeenCalled()
  })

  it('Can call handle-phase-change', async () => {
    await codebuildPipelineUpdater(
      {
        Records: [
          {
            Sns: {
              Message: JSON.stringify({
                'detail-type': CodebuildEventStateEnum.PHASE_CHANGE,
                detail: {
                  'build-id': `:${SUCCESS_PIPELINE_RUNNER_CODEBUILD_ID}`,
                },
              }),
            },
          } as SNSEventRecord,
        ],
      },
      {} as Context,
      () => {},
    )

    expect(handlePhaseChange).toHaveBeenCalled()
  })
})
