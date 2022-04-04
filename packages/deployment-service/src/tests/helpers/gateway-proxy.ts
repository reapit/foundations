import { APIGatewayProxyEvent } from 'aws-lambda'

export const mockGatewayProxy = (apiProxy: Partial<APIGatewayProxyEvent>): APIGatewayProxyEvent =>
  ({
    path: '',
    body: null,
    headers: {
      'content-type': 'application/json',
    },
    httpMethod: 'GET',
    isBase64Encoded: false,
    multiValueHeaders: {},
    pathParameters: {},
    queryStringParameters: {},
    stageVariables: {},
    resource: '',
    ...apiProxy,
  } as APIGatewayProxyEvent)
