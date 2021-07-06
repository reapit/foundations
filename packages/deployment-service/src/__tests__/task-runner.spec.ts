import { v4 as uuid } from 'uuid'
import { AppTypeEnum, PipelineRunnerModelInterface } from '@reapit/foundations-ts-definitions'
import * as services from '@/services'
import { workflowCreation } from '@/functions'
import { taskPopulation } from '../functions/pipeline/task-population'
import { Context } from 'aws-lambda'

jest.mock('../core/db')
jest.mock('../executables')

describe('Task Runner', () => {
  let pipeline: PipelineRunnerModelInterface

  beforeAll(async () => {
    pipeline = await services.createPipelineRunnerEntity({
      pipeline: {
        id: uuid(),
      },
    })
    const tasks = await workflowCreation(pipeline, {
      appType: AppTypeEnum.NODE,
    })

    pipeline.tasks = tasks
  })

  it('Can run successful pipeline', async () => {
    const result = await taskPopulation({}, {} as Context, () => {})

    expect(result).toBe('')
  })
})
