/* eslint-disable react/jsx-no-undef */
import * as React from 'react'
import { render } from '../../../tests/react-testing'
import { onImageError, getComingAppLinkHref, ComingSoonAppComponent } from '../coming-soon'

jest.mock('@/assets/images/default-feature-image.jpg', () => 'placeHolderImage')

const config = {
  comingSoonApps: [
    { image: 'comingSoonImageYourkeys', email: 'sales@yourkeys.com', integrationType: 'Agency Cloud App' },
    { image: 'comingSoonImageVyomm', email: 'hello@vyomm.com', integrationType: 'Agency Cloud App' },
    {
      image: 'comingSoonSmsSpeedWayIdVerification',
      email: 'support@sms-speedway.com',
      integrationType: 'Agency Cloud App',
    },
    { image: 'comingSoonSmsSpeedway', email: 'support@sms-speedway.com', integrationType: 'Agency Cloud App' },
    { image: 'comingSoonReapitPayments', email: 'hphillips@reapit.com', integrationType: 'Agency Cloud App' },
    { image: 'comingSoonImageMAB', email: 'hphillips@reapit.com', integrationType: 'Agency Cloud App' },
    { image: 'comingSoonPerfectPortal', email: 'helpdesk@perfectportal.co.uk', integrationType: 'Agency Cloud App' },
    { image: 'comingSoonMovingHub', email: 'partner@movinghub.co.uk', integrationType: 'Agency Cloud App' },
    { image: 'comingSoonImageStarberry', email: 'hello@starberry.tv', integrationType: 'Agency Cloud App' },
    { image: 'comingSoonImageYomdel', email: 'sales@yomdel.com', integrationType: 'Agency Cloud App' },
    { image: 'comingSoonImageIntegrated', email: 'info@integratedinterest.com', integrationType: 'Agency Cloud App' },
    { image: 'comingSoonImageZero', email: 'enquiries@zerodeposit.com', integrationType: 'Agency Cloud App' },
    { image: 'comingSoonImageTwentyci', email: 'enquiries@twentyea.co.uk', integrationType: 'Agency Cloud App' },
    { image: 'comingSoonImageTwentyCiVMC', email: 'enquiries@viewmychain.com', integrationType: 'Agency Cloud App' },
    { image: 'comingSoonIAMProperty', email: 'app-support@iamproperty.com', integrationType: 'Agency Cloud App' },
    { image: 'comingSoonImageSpectre', email: 'support@spectre.uk.com', integrationType: 'Agency Cloud App' },
    { image: 'comingSoonImageZoopla', email: '', integrationType: 'Agency Cloud App' },
    { image: 'comingSoonOnTheMarket', email: '', integrationType: 'Agency Cloud App' },
    { image: 'comingSoonRightMove', email: '', integrationType: 'Agency Cloud App' },
  ],
}

describe('ComingSoonAppComponent', () => {
  it('should match a snapshot', () => {
    expect(render(<ComingSoonAppComponent app={config.comingSoonApps[0]} isDesktop={false} />)).toMatchSnapshot()
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
