import { codebuildDeploy } from '../codebuild-deploy'
import { SQSRecord, Context } from 'aws-lambda'
import { PipelineRunnerEntity } from '../../../entities/pipeline-runner.entity'
import { plainToClass } from 'class-transformer'
import { PipelineEntity } from '../../../entities/pipeline.entity'
import { savePipelineRunnerEntity, pusher, resetCurrentlyDeployed } from '../../../services'
import { TaskEntity } from '../../../entities/task.entity'
import { PipelineRunnerHasNoDeployTask } from '../../../exceptions'

const PIPELINE_RUNNER_ID = 'PIPELINE_RUNNER_ID'
const CANCELED_PIPELINE_RUNNER_ID = 'CANCELED_PIPELINE_RUNNER_ID'
const FAIL_TO_DEPLOY_PIPELINE_RUNNER_ID = 'FAIL_TO_DEPLOY_PIPELINE_RUNNER_ID'
const SUCCESSFULLY_DEPLOY_PIPELINE_RUNNER_ID = 'SUCCESSFULLY_DEPLOY_PIPELINE_RUNNER_ID'

const rootPipelineRunner: Partial<PipelineRunnerEntity> = {
  pipeline: plainToClass(PipelineEntity, {
    id: 'PIPELINE_ID',
  }),
  tasks: [],
}

jest.mock('../../../services/github-app', () => ({
  githubApp: () => {
    return {}
  },
}))

jest.mock('../../../services/pusher', () => ({
  pusher: {
    trigger: jest.fn(),
  },
}))

jest.mock('../../../services/sqs', () => ({
  sqs: {
    deleteMessage: (params, callback) => {
      callback()
    },
  },
}))

jest.mock('../../../executables', () => ({
  deployFromStore: jest.fn(({ pipelineRunner }) => {
    return pipelineRunner.id === FAIL_TO_DEPLOY_PIPELINE_RUNNER_ID ? Promise.reject('failed') : Promise.resolve()
  }),
}))

jest.mock('../../../services/pipeline', () => ({
  findPipelineRunnerById: jest.fn((id) => {
    switch (id) {
      case FAIL_TO_DEPLOY_PIPELINE_RUNNER_ID:
      case SUCCESSFULLY_DEPLOY_PIPELINE_RUNNER_ID:
        return Promise.resolve({
          id,
          ...rootPipelineRunner,
          tasks: [
            plainToClass(TaskEntity, {
              functionName: 'DEPLOY',
            }),
          ],
        })
      case CANCELED_PIPELINE_RUNNER_ID:
        return Promise.resolve({
          id,
          ...rootPipelineRunner,
          buildStatus: 'CANCEL',
        })
      case PIPELINE_RUNNER_ID:
        return Promise.resolve({
          id,
        })
      default:
        return Promise.resolve(undefined)
    }
  }),
}))

jest.mock('../../../services/pipeline-runner', () => ({
  savePipelineRunnerEntity: jest.fn((pipelineRunner) => Promise.resolve(pipelineRunner)),
  resetCurrentlyDeployed: jest.fn(() => Promise.resolve()),
}))

jest.mock('../../../services/task', () => ({
  updateTask: jest.fn((task) => task),
}))

describe('codebuild-deploy', () => {
  beforeEach(() => {
    // @ts-ignore
    savePipelineRunnerEntity.mockReset()
    // @ts-ignore
    pusher.trigger.mockReset()
    // @ts-ignore
    resetCurrentlyDeployed.mockReset()
  })

  it('cannot find pipeline runner', async () => {
    try {
      await codebuildDeploy(
        {
          Records: [
            {
              body: JSON.stringify({
                id: 'no-a-pipeline-runner-id',
              }),
              receiptHandle: '',
            } as SQSRecord,
          ],
        },
        {} as Context,
        () => {},
      )
    } catch (e) {
      expect(e).toBeInstanceOf(Error)
    }
  })

  it('Canceled pipeline', async () => {
    await codebuildDeploy(
      {
        Records: [
          {
            body: JSON.stringify({
              id: CANCELED_PIPELINE_RUNNER_ID,
            }),
            receiptHandle: '',
          } as SQSRecord,
        ],
      },
      {} as Context,
      () => {},
    )

    expect(savePipelineRunnerEntity).toHaveBeenCalled()
    expect(pusher.trigger).toHaveBeenCalled()
  })

  it('No Deploy task', async () => {
    try {
      await codebuildDeploy(
        {
          Records: [
            {
              body: JSON.stringify({
                id: PIPELINE_RUNNER_ID,
              }),
              receiptHandle: '',
            } as SQSRecord,
          ],
        },
        {} as Context,
        () => {},
      )
    } catch (e) {
      expect(e).toBeInstanceOf(PipelineRunnerHasNoDeployTask)
    }
  })

  it('Can Fail to Deploy gracefully', async () => {
    await codebuildDeploy(
      {
        Records: [
          {
            body: JSON.stringify({
              id: FAIL_TO_DEPLOY_PIPELINE_RUNNER_ID,
            }),
            receiptHandle: '',
          } as SQSRecord,
        ],
      },
      {} as Context,
      () => {},
    )

    // @ts-ignore
    expect(savePipelineRunnerEntity.mock.calls[0][0].buildStatus).toBe('FAILED')
    // @ts-ignore
    expect(savePipelineRunnerEntity.mock.calls[0][0].pipeline.buildStatus).toBe('FAILED')
    expect(pusher.trigger).toHaveBeenCalledTimes(2)
  })

  it('Can successfully Deploy', async () => {
    await codebuildDeploy(
      {
        Records: [
          {
            body: JSON.stringify({
              id: SUCCESSFULLY_DEPLOY_PIPELINE_RUNNER_ID,
            }),
            receiptHandle: '',
          } as SQSRecord,
        ],
      },
      {} as Context,
      () => {},
    )

    // @ts-ignore
    expect(savePipelineRunnerEntity.mock.calls[0][0].buildStatus).toBe('SUCCEEDED')
    // @ts-ignore
    expect(savePipelineRunnerEntity.mock.calls[0][0].pipeline.buildStatus).toBe('SUCCEEDED')
    // @ts-ignore
    expect(savePipelineRunnerEntity.mock.calls[0][0].tasks[0].buildStatus).toBe('SUCCEEDED')
    expect(pusher.trigger).toHaveBeenCalledTimes(2)
    expect(resetCurrentlyDeployed).toHaveBeenCalled()
  })
})
