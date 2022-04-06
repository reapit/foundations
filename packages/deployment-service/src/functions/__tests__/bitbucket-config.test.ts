import { bitbucketConfig } from '../bitbucket-config'
import { Context } from 'aws-lambda'
import { mockGatewayProxy } from '../../tests/helpers/gateway-proxy'

describe('BitbucketConfig', () => {
  it('Can return bitbucket config', () => {
    expect(bitbucketConfig(mockGatewayProxy({}), {} as Context))
  })
})
