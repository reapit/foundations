import * as React from 'react'
import { shallow } from 'enzyme'
import ComingSoonApps, { onImageError, getComingAppLinkHref, emptyComingSoonAppLinkHref } from '../coming-soon'

jest.mock('@/assets/images/default-feature-image.jpg', () => 'placeHolderImage')

describe('ComingSoonApps', () => {
  it('should match a snapshot', () => {
    expect(shallow(<ComingSoonApps />)).toMatchSnapshot()
  })
})

describe('getComingAppLinkHref', () => {
  test('email is string', () => {
    expect(getComingAppLinkHref('nghia')).toBe(
      'mailto:nghia?subject=Reapit%20Foundations%20Marketplace%20-%20Coming%20Soon&body=Dear%20Reapit%20App%20Developer%2C%20%0A%0AI%20would%20like%20more%20information%20about%20your%20app%20featured%20in%20the%20%E2%80%98Coming%20Soon%E2%80%99%20section%20of%20the%20Reapit%20Marketplace%20%0A%0ARegards',
    )
  })
  test('email is empty', () => {
    expect(getComingAppLinkHref()).toBe(emptyComingSoonAppLinkHref)
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
