import mixpanel from 'mixpanel-browser'
import { trackEvent, getRoleFromGroups, trackEventHandler } from '../analytics'
import { TrackingEvent } from '../analytics-events'

jest.mock('mixpanel-browser', () => ({
  track: jest.fn(),
  identify: jest.fn(),
  has_opted_in_tracking: jest.fn(() => true),
  has_opted_out_tracking: jest.fn(() => false),
  people: {
    set: jest.fn(),
  },
}))

window.reapit.config.appEnv = 'production'

describe('trackEvent', () => {
  it('should not track an event when shouldTrack is false', () => {
    trackEvent(TrackingEvent.ChangePassword, false)

    expect(mixpanel.track).not.toHaveBeenCalled()
  })

  it('should not track an event when has opted out with mixpanel', () => {
    mixpanel.has_opted_in_tracking.mockReturnValueOnce(false)
    trackEvent(TrackingEvent.ChangePassword, true)

    expect(mixpanel.track).not.toHaveBeenCalled()
  })

  it('should not track an event when app env is local', () => {
    window.reapit.config.appEnv = 'local'
    trackEvent(TrackingEvent.ChangePassword, false)

    expect(mixpanel.track).not.toHaveBeenCalled()

    window.reapit.config.appEnv = 'production'
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
    const curried = trackEventHandler(TrackingEvent.LoadAppDetail, true, data)

    curried()

    expect(mixpanel.track).toHaveBeenLastCalledWith(TrackingEvent.LoadAppDetail, data)
  })
})
