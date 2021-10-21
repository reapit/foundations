import * as React from 'react'
import { shallow } from 'enzyme'
import MarketplacePage, { handleFetchApps, onPageChangeHandler } from '../marketplace'
import { getAppsService } from '../../../services/apps'
import { History } from 'history'
import Routes from '../../../constants/routes'
import { ReapitConnectSession } from '@reapit/connect-session'

jest.mock('../../../services/apps', () => ({
  getAppsService: jest.fn(() => ({})),
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

jest.mock('../../../utils/use-org-id', () => ({
  useOrgId: () => ({
    orgIdState: {
      orgId: 'SOME_ID',
      orgName: 'SOME_NAME',
      orgClientId: 'SOME_CLIENT_ID',
    },
  }),
}))

jest.mock('react-router', () => ({
  useLocation: jest.fn(() => ({
    pathname: '/marketplace',
  })),
  useHistory: jest.fn(() => ({
    history: () => {},
  })),
  withRouter: jest.fn((component) => component),
}))

describe('MarketplacePage', () => {
  it('should match a snapshot', () => {
    expect(shallow(<MarketplacePage />)).toMatchSnapshot()
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
