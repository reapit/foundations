import * as React from 'react'
import { render } from '@testing-library/react'
import MarketplaceAppPage, { handleLoadAppListing } from '../marketplace-app'
import useSWR from 'swr'
import { useOrgId } from '../../../utils/use-org-id'
import { mockAppDetail } from '../../../services/__stubs__/apps'

jest.mock('swr')

const mockSWR = useSWR as jest.Mock
const mockUseOrgId = useOrgId as jest.Mock

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: () => ({
    connectIsDesktop: false,
    connectSession: {
      loginIdentity: {
        developerId: 'SOME_ID',
        email: 'some@email.com',
      },
    },
  }),
}))

jest.mock('../../../utils/use-org-id')

jest.mock('react-router', () => ({
  useParams: jest.fn(() => ({
    appId: 'SOME_ID',
  })),
  useHistory: jest.fn(() => ({
    push: jest.fn(),
  })),
}))

describe('MarketplaceAppPage', () => {
  it('should match a snapshot when loading', () => {
    mockSWR.mockReturnValue({
      data: null,
      error: null,
      mutate: jest.fn(),
    })
    expect(render(<MarketplaceAppPage />)).toMatchSnapshot()
  })

  it('should match a snapshot when has an error', () => {
    mockSWR.mockReturnValue({
      data: {},
      error: {},
      mutate: jest.fn(),
    })
    expect(render(<MarketplaceAppPage />)).toMatchSnapshot()
  })

  it('should match a snapshot when has data', () => {
    mockSWR.mockReturnValue({
      data: mockAppDetail,
      error: null,
      mutate: jest.fn(),
    })
    expect(render(<MarketplaceAppPage />)).toMatchSnapshot()
  })

  it('should match a snapshot where no orgClientId exists', () => {
    mockUseOrgId.mockReturnValueOnce({ orgIdState: {} })
    expect(render(<MarketplaceAppPage />)).toMatchSnapshot()
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

  it('should open a window when not in desktop mode', async () => {
    const navSpy = jest.spyOn(window, 'open')
    window.reapit.config.marketplaceUrl = 'SOME_URL'
    const mockAppId = 'SOME_ID'

    const curried = handleLoadAppListing(false, mockAppId)

    curried()

    expect(navSpy).toHaveBeenCalledWith(`${window.reapit.config.marketplaceUrl}/apps/${mockAppId}`, '_blank')
  })
})
