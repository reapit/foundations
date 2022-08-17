import { ReapitConnectSession } from '@reapit/connect-session'
import mixpanel from 'mixpanel-browser'
import { trackEvent, getRoleFromGroups, onPageLoadHandler, registerUserHandler } from '../analytics'
import { TrackingEvent } from '../analytics-events'

jest.mock('mixpanel-browser', () => ({
  track: jest.fn(),
  identify: jest.fn(),
  people: {
    set: jest.fn(),
  },
}))

describe('trackEvent', () => {
  it('should not track an event when shouldTrack is false', () => {
    trackEvent(TrackingEvent.ChangePassword, false)

    expect(mixpanel.track).not.toHaveBeenCalled()
  })
  it('should track an event with data', () => {
    const data = {
      foo: 'bar',
    }
    trackEvent(TrackingEvent.ChangePassword, true, data)

    expect(mixpanel.track).toHaveBeenCalledWith(TrackingEvent.ChangePassword, data)
  })

  it('should track an event with no data', () => {
    trackEvent(TrackingEvent.ChangePassword, true)

    expect(mixpanel.track).toHaveBeenCalledWith(TrackingEvent.ChangePassword)
  })
})

describe('getRoleFromGroups', () => {
  it('should return a list of display strings if the groups are true', () => {
    const groups = [
      'OrganisationAdmin',
      'FoundationsDeveloper',
      'FoundationsDeveloperAdmin',
      'ReapitUser',
      'MarketplaceAdmin',
      'ReapitEmployee',
      'ReapitEmployeeFoundationsAdmin',
    ]
    const result = getRoleFromGroups(groups)

    expect(result).toEqual(
      'Group Organisation Admin, AgencyCloud Marketplace Admin, AgencyCloud User, Developer Admin, Developer, Reapit Employee, Reapit Employee Admin',
    )
  })

  it('should return an empty string if groups are empty', () => {
    const groups = []
    const result = getRoleFromGroups(groups)

    expect(result).toEqual('')
  })
})

describe('onPageLoadHandler', () => {
  it('should track an event with data', () => {
    const data = {
      foo: 'bar',
    }
    const curried = onPageLoadHandler(TrackingEvent.LoadAppDetail, true, data)

    curried()

    expect(mixpanel.track).toHaveBeenLastCalledWith(TrackingEvent.LoadAppDetail, data)
  })
})

describe('registerUserHandler', () => {
  it('should register a user', () => {
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
      Name: connectSession.loginIdentity.name,
      Email: connectSession.loginIdentity.email,
      'User Neg Code': connectSession.loginIdentity.userCode,
      'Organisation Name': connectSession.loginIdentity.orgName,
      'Organisation Client Code': connectSession.loginIdentity.clientId,
      'Developer Id': connectSession.loginIdentity.developerId,
      'User Roles': 'Group Organisation Admin',
    })
    expect(setAnalyticsRegistered).toHaveBeenCalledWith(true)
  })
})
