import { APIGatewayEventRequestContextWithAuthorizer } from 'aws-lambda'

export const mockRequestHandlerContext = (
  body: { [s: string]: any },
  headers: { [s: string]: any } = {},
  pathParameters: { [s: string]: string } = {},
) => ({
  body: JSON.stringify(body),
  pathParameters,
  headers,
  httpMethod: 'post',
  path: Object.values(pathParameters).join('/'),
  queryStringParameters: {},
  multiValueHeaders: {},
  isBase64Encoded: false,
  requestContext: {} as APIGatewayEventRequestContextWithAuthorizer<any>,
  multiValueQueryStringParameters: {},
  stageVariables: {},
  resource: '',
})
