import * as React from 'react'
import { mount } from 'enzyme'
import MarketplaceAppPage, { handleLoadAppListing } from '../marketplace-app'
import useSWR from 'swr'

jest.mock('swr')

const mockSWR = useSWR as jest.Mock

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: () => ({
    connectIsDesktop: false,
  }),
}))

jest.mock('react-router', () => ({
  useParams: jest.fn(() => ({
    appId: 'SOME_ID',
  })),
}))

describe('MarketplaceAppPage', () => {
  it('should match a snapshot when loading', () => {
    mockSWR.mockReturnValue({
      data: null,
      error: null,
      mutate: jest.fn(),
    })
    expect(mount(<MarketplaceAppPage />)).toMatchSnapshot()
  })

  it('should match a snapshot when has an error', () => {
    mockSWR.mockReturnValue({
      data: {},
      error: {},
      mutate: jest.fn(),
    })
    expect(mount(<MarketplaceAppPage />)).toMatchSnapshot()
  })

  it('should match a snapshot when has data', () => {
    mockSWR.mockReturnValue({
      data: {},
      error: null,
      mutate: jest.fn(),
    })
    expect(mount(<MarketplaceAppPage />)).toMatchSnapshot()
  })
})

describe('handleLoadAppListing', () => {
  it('should set window.location.href in desktop mode', async () => {
    window.reapit.config.marketplaceUrl = 'SOME_URL'
    const mockAppId = 'SOME_ID'

    const curried = handleLoadAppListing(true, mockAppId)

    curried()

    expect(window.location.href).toEqual(`agencycloud://process/webpage?url=SOME_URL/apps/${mockAppId}`)
  })
})
