import React from 'react'
import { render } from '@testing-library/react'
import { MarketplacePage, handleFetchApps, onPageChangeHandler } from '../marketplace'
import { getAppsService } from '../../../services/apps'
import { History } from 'history'
import Routes from '../../../constants/routes'
import { ReapitConnectSession } from '@reapit/connect-session'
import { useOrgId } from '../../../utils/use-org-id'
import { mockAppsList } from '../../../services/__stubs__/apps'

const mockUseOrgId = useOrgId as jest.Mock

jest.mock('../../../services/apps', () => ({
  getAppsService: jest.fn(() => mockAppsList),
  getAppRestrictionsService: jest.fn(() => ({})),
}))

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: () => ({
    connectSession: {
      loginIdentity: {
        developerId: 'SOME_ID',
      },
    },
  }),
}))

jest.mock('../../../utils/use-org-id')

jest.mock('react-router', () => ({
  useLocation: jest.fn(() => ({
    pathname: '/marketplace',
  })),
  useHistory: jest.fn(() => ({
    history: () => {},
  })),
}))

describe('MarketplacePage', () => {
  it('should match a snapshot', () => {
    expect(render(<MarketplacePage />)).toMatchSnapshot()
  })

  it('should match a snapshot where no orgClientId exists', () => {
    mockUseOrgId.mockReturnValueOnce({ orgIdState: {} })
    expect(render(<MarketplacePage />)).toMatchSnapshot()
  })
})

describe('handleFetchApps', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  it('should fetch apps', async () => {
    const mockSetRestrictions = jest.fn()
    const mockLoading = jest.fn()
    const mockQuery = '?pageNumber=1'

    const curried = handleFetchApps(mockSetRestrictions, mockLoading, mockQuery, 'SBOX', {} as ReapitConnectSession)

    await curried()

    expect(mockLoading).toHaveBeenCalledTimes(2)
    expect(getAppsService).toHaveBeenCalledTimes(1)
    expect(getAppsService).toHaveBeenCalledWith(mockQuery, 'SBOX')
  })
})

describe('onPageChangeHandler', () => {
  it('should update the history object', async () => {
    const mockHistory = { push: jest.fn() } as unknown as History
    const mockPage = 2

    const curried = onPageChangeHandler(mockHistory)

    curried(mockPage)

    expect(mockHistory.push).toHaveBeenCalledWith(`${Routes.MARKETPLACE}?pageNumber=${mockPage}&pageSize=12`)
  })
})
