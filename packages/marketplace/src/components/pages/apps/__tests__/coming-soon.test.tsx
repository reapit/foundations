/* eslint-disable react/jsx-no-undef */
import * as React from 'react'
import { shallow } from 'enzyme'
import ComingSoonApps, {
  onImageError,
  getComingAppLinkHref,
  handleComingSoonSectionResizeObserver,
  ComingSoonAppComponent,
} from '../coming-soon'

jest.mock('@/assets/images/default-feature-image.jpg', () => 'placeHolderImage')

const config = {
  agencyCloud: [
    { image: 'comingSoonImageYourkeys', email: 'sales@yourkeys.com' },
    { image: 'comingSoonImageVyomm', email: 'hello@vyomm.com' },
    { image: 'comingSoonSmsSpeedWayIdVerification', email: 'support@sms-speedway.com' },
    { image: 'comingSoonSmsSpeedway', email: 'support@sms-speedway.com' },
    { image: 'comingSoonReapitPayments', email: 'hphillips@reapit.com' },
    { image: 'comingSoonImageMAB', email: 'hphillips@reapit.com' },
    { image: 'comingSoonPerfectPortal', email: 'helpdesk@perfectportal.co.uk' },
    { image: 'comingSoonMovingHub', email: 'partner@movinghub.co.uk' },
  ],
  thirdParty: [
    { image: 'comingSoonImageStarberry', email: 'hello@starberry.tv' },
    { image: 'comingSoonImageYomdel', email: 'sales@yomdel.com' },
    { image: 'comingSoonImageIntegrated', email: 'info@integratedinterest.com' },
    { image: 'comingSoonImageZero', email: 'enquiries@zerodeposit.com' },
    { image: 'comingSoonImageTwentyci', email: 'enquiries@twentyea.co.uk' },
    { image: 'comingSoonImageTwentyCiVMC', email: 'enquiries@viewmychain.com' },
    { image: 'comingSoonIAMProperty', email: 'app-support@iamproperty.com' },
    { image: 'comingSoonImageSpectre', email: 'support@spectre.uk.com' },
  ],
  portals: [
    { image: 'comingSoonImageZoopla', email: '' },
    { image: 'comingSoonOnTheMarket', email: '' },
    { image: 'comingSoonRightMove', email: '' },
  ],
}

describe('ComingSoonApps', () => {
  window.reapit.config.comingSoonApps = config
  it('should match a snapshot', () => {
    expect(shallow(<ComingSoonApps />)).toMatchSnapshot()
  })
})

describe('ComingSoonAppComponent', () => {
  it('should match a snapshot', () => {
    expect(shallow(<ComingSoonAppComponent app={config.agencyCloud[0]} isDesktop={false} />)).toMatchSnapshot()
  })
})

describe('getComingAppLinkHref', () => {
  test('email is string', () => {
    expect(getComingAppLinkHref(false, 'nghia')).toBe(
      'mailto:nghia?subject=Reapit%20Foundations%20Marketplace%20-%20Coming%20Soon&body=Dear%20Reapit%20App%20Developer%2C%20%0A%0AI%20would%20like%20more%20information%20about%20your%20app%20featured%20in%20the%20%E2%80%98Coming%20Soon%E2%80%99%20section%20of%20the%20Reapit%20Marketplace%20%0A%0ARegards',
    )
  })
  test('email is empty', () => {
    expect(getComingAppLinkHref(false)).toBeNull()
  })
})

describe('onImageError', () => {
  it('should set src correctly', () => {
    const eventMock = {
      currentTarget: {
        src: 'src1',
      },
    } as any
    onImageError(eventMock)
    const srcNew = eventMock.currentTarget.src
    expect(srcNew).toBe('placeHolderImage')
  })
})

describe('handleComingSoonSectionResizeObserver', () => {
  it('should run correctly', () => {
    const mockSetHeight = jest.fn()
    const mockEntry = {
      contentRect: {
        bottom: 0,
        height: 10,
        left: 0,
        right: 0,
        top: 0,
        width: 10,
        x: 0,
        y: 0,
      },
    } as ResizeObserverEntry

    const fn = handleComingSoonSectionResizeObserver(mockSetHeight)
    fn(mockEntry)
    expect(mockSetHeight).toBeCalledWith(mockEntry.contentRect.height)
  })
})
