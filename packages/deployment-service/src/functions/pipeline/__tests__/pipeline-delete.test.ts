import { mockGatewayProxy } from '../../../tests/helpers/gateway-proxy'
import { pipelineDelete } from '../pipeline-delete'
import { Context } from 'aws-lambda'
import { sqs } from '../../../services'

const DELETABLE_PIPELINE_ID = 'DELETABLE_PIPELINE_ID'
const NOT_DELETABLE_PIPELINE_ID = 'NOT_DELETABLE_PIPELINE_ID'
const DEVELOPER_ID = 'DEVELOPER_ID'
const NOT_AUTHED_DEVELOPER_ID = 'NOT_AUTHED_DEVELOPER_ID'

jest.mock('../../../services/pipeline', () => ({
  findPipelineById: (id) => {
    switch (id) {
      case DELETABLE_PIPELINE_ID:
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
      case NOT_DELETABLE_PIPELINE_ID:
        return Promise.resolve({
          id,
          developerId: DEVELOPER_ID,
          buildStatus: 'IN_PROGRESS',
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

jest.mock('../../../services/sqs', () => ({
  sqs: {
    sendMessage: jest.fn((params, callback) => callback()),
  },
}))

jest.mock('../../../services/pusher', () => ({
  pusher: {
    trigger: () => Promise.resolve(),
  },
}))

describe('pipeline-delete', () => {
  it('Unable to delete', async () => {
    const result = await pipelineDelete(
      mockGatewayProxy({
        pathParameters: {
          pipelineId: NOT_DELETABLE_PIPELINE_ID,
        },
      }),
      {} as Context,
    )

    expect(result.statusCode).toBe(409)
    expect(sqs.sendMessage).not.toHaveBeenCalled()
  })

  it('Can delete pipeline', async () => {
    const result = await pipelineDelete(
      mockGatewayProxy({
        pathParameters: {
          pipelineId: DELETABLE_PIPELINE_ID,
        },
      }),
      {} as Context,
    )

    expect(result.statusCode).toBe(202)
    expect(sqs.sendMessage).toHaveBeenCalled()
  })

  it('Rejection from ownership', async () => {
    const result = await pipelineDelete(
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
