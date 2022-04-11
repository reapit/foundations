import { AppTypeEnum } from '../../../dto'
import { Context } from 'aws-lambda'
import { mockGatewayProxy } from '../../../tests/helpers/gateway-proxy'
import { pipelineCreate } from '../pipeline-create'
import { PackageManagerEnum } from '@reapit/foundations-ts-definitions/deployment-schema'
import { v4 as uuid } from 'uuid'

const DUPLICATE_APP_ID = uuid()

const mockReturnFunc = jest.fn()

jest.mock('../../../services/pipeline', () => ({
  findPipelineById: (appId) => {
    switch (appId) {
      case DUPLICATE_APP_ID:
        return Promise.resolve({
          ...appId,
          id: appId,
        })
      default:
        return Promise.resolve(undefined)
    }
  },
  createPipelineEntity: (entity) => {
    return new Promise((resolve) => resolve(entity))
  },
}))

jest.mock('../../../services/pusher', () => ({
  pusher: {
    trigger: jest.fn(() => Promise.resolve()),
  },
}))

jest.mock('../../../services/github-app', () => ({
  githubApp: () => {
    return {}
  },
}))

jest.mock('../../../utils/resolve-creds', () => ({
  resolveCreds: () =>
    new Promise((resolve) =>
      resolve({
        developerId: 'developer-id',
        clientId: 'client-id',
      }),
    ),
}))

jest.mock('../../../services/sqs', () => ({
  sqs: {
    sendMessage: (params, callback) => {
      mockReturnFunc()
      callback()
    },
  },
}))

describe('pipeline-create', () => {
  beforeEach(() => {
    mockReturnFunc.mockReset()
  })

  it('Can create pipeline', async () => {
    const result = await pipelineCreate(
      mockGatewayProxy({
        body: JSON.stringify({
          name: 'TEST',
          appType: AppTypeEnum.REACT,
          packageManager: PackageManagerEnum.YARN,
          appId: uuid(),
        }),
      }),
      {} as Context,
    )

    const body = JSON.parse(result.body)

    expect(result.statusCode).toBe(200)
    expect(body.name).toBe('TEST')
    expect(mockReturnFunc).toHaveBeenCalled()
  })

  it('Can prevent duplicate of infra', async () => {
    const result = await pipelineCreate(
      mockGatewayProxy({
        body: JSON.stringify({
          name: 'TEST',
          appType: AppTypeEnum.REACT,
          packageManager: PackageManagerEnum.YARN,
          appId: DUPLICATE_APP_ID,
        }),
      }),
      {} as Context,
    )

    const body = JSON.parse(result.body)

    expect(result.statusCode).toBe(200)
    expect(body.name).toBe('TEST')
    expect(mockReturnFunc).not.toHaveBeenCalled()
  })
})
