import { HttpService } from '@nestjs/axios'
import { MarketplaceProvider } from '../marketplace.provider'
import { ConfigType } from '@nestjs/config'
import marketplace from '../../config/marketplace'

const connectUrl = 'connect-url'

const mockAxios = {
  post: jest.fn(() =>
    Promise.resolve({
      data: {
        access_token: 'access_token',
        token_type: 'bearer',
      },
    }),
  ),
  get: jest.fn(() =>
    Promise.resolve({
      data: {
        data: [
          {
            id: 'some-revision-id',
            appId: 'some-app-id',
            signoutUrls: [],
            redirectUrls: [],
          },
          {
            id: 'some-revision-id',
            appId: 'some-app-id',
            signoutUrls: [],
            redirectUrls: [],
          },
        ],
      },
    }),
  ),
  patch: jest.fn(() => Promise.resolve()),
}

describe('MarketplaceProvider', () => {
  let provider: MarketplaceProvider

  beforeEach(() => {
    provider = new MarketplaceProvider(new HttpService(mockAxios as any), {
      connectUrl: connectUrl,
    } as ConfigType<typeof marketplace>)
  })

  it('updateAppUrls', async () => {
    await provider.updateAppUrls('appId', 'domain')

    expect(mockAxios.patch).toHaveBeenCalledTimes(1)
    expect(mockAxios.get).toHaveBeenCalledTimes(1)
  })
})
