import { v4 as uuid } from 'uuid'

const mockDeveloperId = uuid()

jest.mock('../../core/db')
jest.mock('@reapit/connect-session', () => ({
  connectSessionVerifyDecodeIdTokenWithPublicKeys: jest.fn((header) => {
    return header ? { developerId: mockDeveloperId } : undefined
  }),
}))

import { createApiKey } from './../'
import { HttpStatusCode } from '@homeservenow/serverless-aws-handler'
import { Context } from 'aws-lambda'
import { mockRequestHandlerContext } from '../tests/mock.hander.context'

describe('Create ApiKey', () => {
  afterAll(() => {
    jest.resetAllMocks()
  })

  it('Can result in unauthorised', async () => {
    const result = await createApiKey(mockRequestHandlerContext({}), {} as Context)

    expect(result.statusCode).toBe(HttpStatusCode.UNAUTHORIZED)
  })

  it('Can result in validation errors', async () => {
    const result = await createApiKey(
      mockRequestHandlerContext(
        {},
        {
          Authorization: '1234',
          'Content-Type': 'application/json',
        },
      ),
      {} as Context,
    )

    const body = JSON.parse(result.body)

    expect(result.statusCode).toBe(HttpStatusCode.BAD_REQUEST)
    expect(body).toHaveProperty('data')
    expect(body.data.length).toBe(2)
  })

  it('Can result in creation of api-key', async () => {
    const result = await createApiKey(
      mockRequestHandlerContext(
        {
          keyExpiresAt: '2021-06-21T12:12:12',
          name: 'new name',
          entityType: 'deployment',
        },
        {
          Authorization: '1234',
          'Content-Type': 'application/json',
        },
      ),
      {} as Context,
    )

    const body = JSON.parse(result.body)

    expect(result.statusCode).toBe(HttpStatusCode.OK)
    expect(body).toHaveProperty('apiKey')
    expect(body).toHaveProperty('id')
    expect(body).toHaveProperty('entityType')
    expect(body).toHaveProperty('keyCreatedAt')
    expect(body).toHaveProperty('developerId')
  })
})
