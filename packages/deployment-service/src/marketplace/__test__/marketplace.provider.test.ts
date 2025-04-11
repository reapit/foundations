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
        appId: 'appId',
      },
    }),
  ),
}

describe('MarketplaceProvider', () => {
  let provider: MarketplaceProvider

  beforeEach(() => {
    provider = new MarketplaceProvider(new HttpService(mockAxios as any), {
      connectUrl: connectUrl,
    } as ConfigType<typeof marketplace>)
  })

  it('updateAppUrls', async () => {
    await provider.updateAppUrls('appId', 'domain', 'developerId', 'appName')

    expect(mockAxios.post).toHaveBeenCalledTimes(2)
  })

  it('getAppDetails', async () => {
    await provider.getAppDetails('appId')

    expect(mockAxios.post).toHaveBeenCalled()
    expect(mockAxios.get).toHaveBeenCalled()
  })
})
