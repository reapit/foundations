import { v4 as uuid } from 'uuid'

const mockDeveloperId = uuid()

jest.mock('../../core/db')
jest.mock('@reapit/connect-session', () => ({
  connectSessionVerifyDecodeIdTokenWithPublicKeys: jest.fn((header) => {
    return header ? { developerId: mockDeveloperId } : undefined
  }),
}))

import { deleteApiKey } from './../'
import { HttpStatusCode } from '@homeservenow/serverless-aws-handler'
import { Context } from 'aws-lambda'
import { mockRequestHandlerContext } from '../tests/mock.hander.context'

describe('Delete ApiKey', () => {
  afterAll(() => {
    jest.resetAllMocks()
  })

  it('Can result in unauthorised', async () => {
    const result = await deleteApiKey(mockRequestHandlerContext({}), {} as Context)

    expect(result.statusCode).toBe(HttpStatusCode.UNAUTHORIZED)
  })

  it('Can result in not found if key does not exist', async () => {
    const result = await deleteApiKey(
      mockRequestHandlerContext(
        {},
        {
          Authorization: '1234',
        },
        {
          id: '/56765',
        },
      ),
      {} as Context,
    )

    expect(result.statusCode).toBe(HttpStatusCode.NOT_FOUND)
  })

  it('Can result in deletion', async () => {
    const result = await deleteApiKey(
      mockRequestHandlerContext(
        {},
        {
          Authorization: '1234',
        },
        {
          id: '1234',
        },
      ),
      {} as Context,
    )

    expect(result.statusCode).toBe(HttpStatusCode.NO_CONTENT)
  })
})
