import { createPipeline } from '../functions/create-pipeline'
import { v4 as uuid } from 'uuid'
import { Context } from 'aws-lambda'
import { HttpStatusCode } from '@homeservenow/serverless-aws-handler'
import { DeploymentStatus } from '@reapit/foundations-ts-definitions'
import { mockRequestHandlerContext } from '@/__tests__/mock'

jest.mock('../core/db')

describe('Create Pipeline', () => {
  it('Can create pipeline', async () => {
    const deploymentId = uuid()

    const result = await createPipeline(mockRequestHandlerContext({}, `/${deploymentId}`), {} as Context)
    const body = JSON.parse(result.body)

    expect(result.statusCode).toBe(HttpStatusCode.OK)
    expect(body.deploymentId).toBe(deploymentId)
    expect(body.buildStatus).toBe(DeploymentStatus.PENDING)
  })
})
