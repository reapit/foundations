import { v4 as uuid } from 'uuid'

const mockDeveloperId = uuid()

jest.mock('../../core/db')
jest.mock('@reapit/connect-session', () => ({
  connectSessionVerifyDecodeIdTokenWithPublicKeys: jest.fn((header) => {
    return header ? { developerId: mockDeveloperId } : undefined
  }),
}))

import { paginateApiKeys } from './../'
import { HttpStatusCode } from '@homeservenow/serverless-aws-handler'
import { Context } from 'aws-lambda'
import { mockRequestHandlerContext } from './mock.hander.context'

describe('Get ApiKey', () => {
  afterAll(() => {
    jest.resetAllMocks()
  })

  it('Can result in unauthorised', async () => {
    const result = await paginateApiKeys(mockRequestHandlerContext({}), {} as Context)

    expect(result.statusCode).toBe(HttpStatusCode.UNAUTHORIZED)
  })

  it('Can result in fetched returned', async () => {
    const result = await paginateApiKeys(
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

    expect(result.statusCode).toBe(HttpStatusCode.OK)
    expect(body).toBeTruthy()
  })
})
