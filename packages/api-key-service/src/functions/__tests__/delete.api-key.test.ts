import { deleteApiKey } from './../'
import { HttpStatusCode } from '@homeservenow/serverless-aws-handler'
import { APIGatewayEventRequestContextWithAuthorizer, Context } from 'aws-lambda'
import { v4 as uuid } from 'uuid'

const mockDeveloperId = uuid()

jest.mock('../../core/db')
jest.mock('@reapit/connect-session', () => ({
  connectSessionVerifyDecodeIdTokenWithPublicKeys: jest.fn((header) => {
    return header ? { developerId: mockDeveloperId } : undefined
  }),
}))

const mockRequestHandlerContext = (
  body: { [s: string]: any },
  headers: { [s: string]: any } = {},
  path: string = '/',
) => ({
  body: JSON.stringify(body),
  pathParameters: {},
  headers,
  httpMethod: 'post',
  path,
  queryStringParameters: {},
  multiValueHeaders: {},
  isBase64Encoded: false,
  requestContext: {} as APIGatewayEventRequestContextWithAuthorizer<any>,
  multiValueQueryStringParameters: {},
  stageVariables: {},
  resource: '',
})

describe('Delete ApiKey', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('Can result in unauthorised', async () => {
    const result = await deleteApiKey(mockRequestHandlerContext({}), {} as Context)

    expect(result.statusCode).toBe(HttpStatusCode.UNAUTHORIZED)
  })

  it('Can result in not found if key does not exist', async () => {
    // TODO add mock test for not found result
    const result = await deleteApiKey(
      mockRequestHandlerContext(
        {},
        {
          authorization: '1234',
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
      ),
      {} as Context,
    )

    expect(result.statusCode).toBe(HttpStatusCode.NO_CONTENT)
  })
})
