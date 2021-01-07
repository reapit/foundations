import * as React from 'react'
import { mount } from 'enzyme'
import MarketplacePage, { handleFetchApps, handleFetchRestrictions, onPageChangeHandler } from '../marketplace'
import { getAppRestrictionsService, getAppsService } from '../../../services/apps'
import { History } from 'history'
import Routes from '../../../constants/routes'

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

jest.mock('react-router', () => ({
  useLocation: jest.fn(() => ({
    pathname: '/offices',
  })),

  useHistory: jest.fn(() => ({
    history: () => {},
  })),
}))

describe('MarketplacePage', () => {
  it('should match a snapshot', () => {
    expect(mount(<MarketplacePage />)).toMatchSnapshot()
  })
})

describe('handleFetchRestrictions', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  it('should fetch restrictions', async () => {
    const mockSetRestrictions = jest.fn()
    const mockLoading = jest.fn()

    const curried = handleFetchRestrictions(mockSetRestrictions, mockLoading)

    await curried()

    expect(mockLoading).toHaveBeenCalledTimes(2)
    expect(getAppRestrictionsService).toHaveBeenCalledTimes(1)
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

    const curried = handleFetchApps(mockSetRestrictions, mockLoading, mockQuery)

    await curried()

    expect(mockLoading).toHaveBeenCalledTimes(2)
    expect(getAppsService).toHaveBeenCalledTimes(1)
    expect(getAppsService).toHaveBeenCalledWith(mockQuery)
  })
})

describe('onPageChangeHandler', () => {
  it('should update the history object', async () => {
    const mockHistory = ({ push: jest.fn() } as unknown) as History
    const mockPage = 2

    const curried = onPageChangeHandler(mockHistory)

    curried(mockPage)

    expect(mockHistory.push).toHaveBeenCalledWith(`${Routes.MARKETPLACE}?pageNumber=${mockPage}&pageSize=12`)
  })
})
