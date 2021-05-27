import { v4 as uuid } from 'uuid'
import { AppTypeEnum, PipelineModelInterface } from '@reapit/foundations-ts-definitions'
import * as services from '@/services'
import { workflowCreation } from '@/functions'
import { taskPopulation } from '../functions/task.population'
import { Context } from 'aws-lambda'

jest.mock('../core/db')
jest.mock('../executables')

describe('Task Runner', () => {
  let pipeline: PipelineModelInterface

  beforeAll(async () => {
    pipeline = await services.createPipelineModel({
      deploymentId: uuid(),
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
