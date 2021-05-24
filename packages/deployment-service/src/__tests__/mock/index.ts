import { APIGatewayEventRequestContextWithAuthorizer } from 'aws-lambda'

export const mockRequestHandlerContext = (body: { [s: string]: any }, path: string = '/') => ({
  body: JSON.stringify(body),
  pathParameters: {},
  headers: {
    'reapit-connect-token': 'any',
    'reapit-customer': 'any',
  },
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
