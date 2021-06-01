import { paginateApiKeys } from './../'
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

describe('Paginate ApiKey', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('Can result in unauthorised', async () => {
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

    expect(result.statusCode).toBe(HttpStatusCode.UNAUTHORIZED)
  })

  it('Can result in pagination returned', async () => {
    const result = await paginateApiKeys(mockRequestHandlerContext({}), {} as Context)

    const body = JSON.parse(result.body)

    expect(result.statusCode).toBe(HttpStatusCode.OK)
    expect(body).toHaveProperty('items')
    expect(body).toHaveProperty('meta')
  })
})
