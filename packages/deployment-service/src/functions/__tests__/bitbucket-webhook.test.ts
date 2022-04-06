import { mockGatewayProxy } from '../../tests/helpers/gateway-proxy'
import { bitbucketWebhook } from '../bitbucket-webhook'
import { Context } from 'aws-lambda'

const database = {}

jest.mock('../../services/', () => ({
  saveClientInfo: (key, info) => {
    database[key] = info
    return Promise.resolve(info)
  },
  sqs: () => ({
    sendMessage: () => {},
  }),
}))

describe('BtiBucketWebhook', () => {
  it('Can save auth info', async () => {
    const result = await bitbucketWebhook(
      mockGatewayProxy({
        body: JSON.stringify({
          eventType: 'installed',
          clientKey: 'client_key',
        }),
      }),
      {} as Context,
    )

    expect(database).toHaveProperty('client_key')
    expect(result.statusCode).toBe(202)
  })

  it('Healthcheck', async () => {
    const result = await bitbucketWebhook(
      mockGatewayProxy({
        path: 'healthcheck',
        body: '{}',
      }),
      {} as Context,
    )

    expect(result.statusCode).toBe(200)
  })

  // it('Can authenticate', async () => {
  //   const result = await bitbucketWebhook(mockGatewayProxy({
  //     body: JSON.stringify({
  //       event: "installed",
  //       clientKey: "client_key",
  //     }),
  //   }), {} as Context)

  //   expect(database).toHaveProperty('client_key')
  //   expect(result.statusCode).toBe(202)
  // })
})
