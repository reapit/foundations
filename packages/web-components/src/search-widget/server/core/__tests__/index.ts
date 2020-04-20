import { APIGatewayProxyEvent, APIGatewayEventRequestContextWithAuthorizer } from 'aws-lambda'
import { searchWidgetHandler, parseHeadersFromEvent } from '../index'

describe('searchWidgetHandler', () => {
  it('should launch without crashing', async () => {
    try {
      await searchWidgetHandler({} as any, {} as any)
    } catch (err) {
      expect(err).toBeUndefined()
    }
  })
})

describe('parseHeadersFromEvent', () => {
  const mockEvent = {
    headers: {
      Accept: '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
      Host: 'mockHost',
      'User-Agent': 'PostmanRuntime/7.24.1',
      'X-Api-Key': '123456',
      'X-Forwarded-Port': '443',
      'X-Forwarded-Proto': 'https',
    },
    requestContext: {
      authorizer: {
        authorization: ' mockAuthorization',
        'reapit-customer': 'DXX',
        principalid: 'Allow',
      },
    } as APIGatewayEventRequestContextWithAuthorizer<any>,
    body: '',
    multiValueHeaders: {},
    httpMethod: 'GET',
    isBase64Encoded: false,
    path: '',
    pathParameters: {},
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    stageVariables: null,
    resource: '',
  } as APIGatewayProxyEvent
  const result = parseHeadersFromEvent(mockEvent)
  expect(result).toEqual({
    Accept: '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    Host: 'mockHost',
    'User-Agent': 'PostmanRuntime/7.24.1',
    'X-Api-Key': '123456',
    'X-Forwarded-Port': '443',
    'X-Forwarded-Proto': 'https',
    authorization: 'Bearer mockAuthorization',
    principalid: 'Allow',
    'reapit-customer': 'DXX',
  })
})
