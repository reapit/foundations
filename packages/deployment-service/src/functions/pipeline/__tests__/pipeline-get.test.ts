import { mockGatewayProxy } from '../../../tests/helpers/gateway-proxy'
import { Context } from 'aws-lambda'
import { pipelineGet } from '../pipeline-get'

const FINDABLE_PIPELINE_ID = 'DELETABLE_PIPELINE_ID'
const DEVELOPER_ID = 'DEVELOPER_ID'
const NOT_AUTHED_DEVELOPER_ID = 'NOT_AUTHED_DEVELOPER_ID'

jest.mock('../../../services/pipeline', () => ({
  findPipelineById: (id) => {
    switch (id) {
      case FINDABLE_PIPELINE_ID:
        return Promise.resolve({
          id,
          developerId: DEVELOPER_ID,
          buildStatus: 'SUCCEEDED',
        })
      case NOT_AUTHED_DEVELOPER_ID:
        return Promise.resolve({
          id,
          developerId: NOT_AUTHED_DEVELOPER_ID,
          buildStatus: 'SUCCEEDED',
        })
      default:
        return Promise.resolve(undefined)
    }
  },
  updatePipelineEntity: jest.fn((entity) => {
    return Promise.resolve(entity)
  }),
}))

jest.mock('../../../utils/resolve-creds', () => ({
  resolveCreds: () =>
    new Promise((resolve) =>
      resolve({
        developerId: DEVELOPER_ID,
        clientId: 'client-id',
      }),
    ),
}))

jest.mock('../../../services/github-app', () => ({
  githubApp: () => {
    return {}
  },
}))

describe('pipeline-get', () => {
  it('Unable to get pipeline', async () => {
    const result = await pipelineGet(
      mockGatewayProxy({
        pathParameters: {
          pipelineId: 'not-a-pipeline-id',
        },
      }),
      {} as Context,
    )

    expect(result.statusCode).toBe(404)
  })

  it('Can find pipeline', async () => {
    const result = await pipelineGet(
      mockGatewayProxy({
        pathParameters: {
          pipelineId: FINDABLE_PIPELINE_ID,
        },
      }),
      {} as Context,
    )

    const body = JSON.parse(result.body)

    expect(result.statusCode).toBe(200)
    expect(body.id).toBe(FINDABLE_PIPELINE_ID)
  })

  it('Rejection from ownership', async () => {
    const result = await pipelineGet(
      mockGatewayProxy({
        pathParameters: {
          pipelineId: NOT_AUTHED_DEVELOPER_ID,
        },
      }),
      {} as Context,
    )

    expect(result.statusCode).toBe(403)
  })
})
