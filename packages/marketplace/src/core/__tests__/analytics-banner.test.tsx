import { ReapitConnectSession } from '@reapit/connect-session'
import {
  AnalyticsBanner,
  handleTrackingBannerClick,
  registerUserHandler,
  handleSetUserConsent,
  handleSetDoNotTrack,
} from '../analytics-banner'
import mixpanel from 'mixpanel-browser'
import { render } from '../../tests/react-testing'
import React, { MouseEvent } from 'react'
import { useAppsBrowseState } from '../use-apps-browse-state'
import { mockAppsBrowseState } from '../__mocks__/use-apps-browse-state'
import { mockUserModel } from '../../tests/__stubs__/user'
import { SendFunction } from '@reapit/utils-react'
import { UpdateUserModel } from '@reapit/foundations-ts-definitions'

jest.mock('../use-apps-browse-state')
jest.mock('mixpanel-browser', () => ({
  track: jest.fn(),
  identify: jest.fn(),
  has_opted_in_tracking: jest.fn(() => true),
  has_opted_out_tracking: jest.fn(() => false),
  opt_in_tracking: jest.fn(),
  opt_out_tracking: jest.fn(),
  people: {
    set: jest.fn(),
  },
}))

const mockUseAppsBrowseState = useAppsBrowseState as jest.Mock

describe('AnalyticsBanner', () => {
  it('should match snapshot', () => {
    window.reapit.config.appEnv = 'production'
    expect(render(<AnalyticsBanner />)).toMatchSnapshot()
  })

  it('should match snapshot when there is no current user', () => {
    window.reapit.config.appEnv = 'production'
    mockUseAppsBrowseState.mockReturnValueOnce({
      ...mockAppsBrowseState,
      currentUserState: null,
    })
    expect(render(<AnalyticsBanner />)).toMatchSnapshot()
  })
})

describe('registerUserHandler', () => {
  it('should register a user', () => {
    window.reapit.config.appEnv = 'production'
    const connectSession = {
      loginIdentity: {
        clientId: 'MOCK_CLIENT_ID',
        developerId: 'MOCK_DEVELOPER_ID',
        groups: ['OrganisationAdmin'],
        name: 'MOCK_NAME',
        email: 'foo@example.com',
        orgName: 'MOCK_ORG_NAME',
      },
    } as unknown as ReapitConnectSession
    const analyticsRegistered = false
    const setAnalyticsRegistered = jest.fn()

    const curried = registerUserHandler(connectSession, analyticsRegistered, setAnalyticsRegistered)

    curried()

    expect(mixpanel.identify).toHaveBeenCalledWith(connectSession.loginIdentity.email)
    expect(mixpanel.people.set).toHaveBeenCalledWith({
      $name: connectSession.loginIdentity.name,
      $email: connectSession.loginIdentity.email,
      'User Neg Code': connectSession.loginIdentity.userCode,
      'Organisation Name': connectSession.loginIdentity.orgName,
      'Organisation Client Code': connectSession.loginIdentity.clientId,
      'Developer Id': connectSession.loginIdentity.developerId,
      'User Roles': 'Group Organisation Admin',
    })
    expect(setAnalyticsRegistered).toHaveBeenCalledWith(true)
  })
})

describe('handleTrackingBannerClick', () => {
  it('handles tracking banner click', () => {
    const setTrackingBannerVisible = jest.fn()
    const trackingBannerVisibile = true

    const curried = handleTrackingBannerClick(setTrackingBannerVisible, trackingBannerVisibile)

    curried()

    expect(setTrackingBannerVisible).toBeCalledWith(false)
  })
})

describe('handleSetUserConsent', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should set user consent as true from user model', () => {
    const currentUserState = mockUserModel
    const setTrackingBannerVisible = jest.fn()

    const curried = handleSetUserConsent(currentUserState, setTrackingBannerVisible)

    curried()

    expect(mixpanel.opt_in_tracking).toHaveBeenCalledTimes(1)
    expect(mixpanel.opt_out_tracking).not.toHaveBeenCalled()
    expect(setTrackingBannerVisible).toHaveBeenCalledWith(true)
  })

  it('should set user consent as false from user model', () => {
    const currentUserState = { ...mockUserModel, consentToTrack: false }
    const setTrackingBannerVisible = jest.fn()

    const curried = handleSetUserConsent(currentUserState, setTrackingBannerVisible)

    curried()

    expect(mixpanel.opt_in_tracking).not.toHaveBeenCalled()
    expect(mixpanel.opt_out_tracking).toHaveBeenCalledTimes(1)
    expect(setTrackingBannerVisible).not.toHaveBeenCalled()
  })

  it('should set user consent as false if no user model', () => {
    const currentUserState = null
    const setTrackingBannerVisible = jest.fn()

    const curried = handleSetUserConsent(currentUserState, setTrackingBannerVisible)

    curried()

    expect(mixpanel.opt_in_tracking).not.toHaveBeenCalled()
    expect(mixpanel.opt_out_tracking).not.toHaveBeenCalled()
    expect(setTrackingBannerVisible).not.toHaveBeenCalled()
  })
})

describe('handleSetDoNotTrack', () => {
  it('should set opt out tracking', async () => {
    const setTrackingBannerVisible = jest.fn()
    const updateUser = jest.fn(() => true) as unknown as SendFunction<UpdateUserModel, boolean>
    const currentUserState = mockUserModel
    const refreshCurrentUser = jest.fn()
    const event = {
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    } as unknown as MouseEvent<HTMLElement>

    const curried = handleSetDoNotTrack(setTrackingBannerVisible, updateUser, currentUserState, refreshCurrentUser)

    await curried(event)

    expect(mixpanel.opt_out_tracking).toHaveBeenCalledTimes(1)
    expect(setTrackingBannerVisible).toHaveBeenCalledWith(false)
    expect(updateUser).toHaveBeenCalledWith({
      ...mockUserModel,
      consentToTrack: false,
    })
    expect(refreshCurrentUser).toHaveBeenCalledTimes(1)
  })
})
