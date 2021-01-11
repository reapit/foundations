import * as React from 'react'
import { mount } from 'enzyme'
import AccessDenied, { onLogoutButtonClick, onMarketplaceButtonClick } from '../access-denied'
import { reapitConnectBrowserSession } from '../../../core/connect-session'

describe('AccessDenied', () => {
  it('should match a snapshot', () => {
    expect(mount(<AccessDenied />)).toMatchSnapshot()
  })

  describe('onLogoutButtonClick', () => {
    it('should run correctly', () => {
      const fnSpy = jest.spyOn(reapitConnectBrowserSession, 'connectLogoutRedirect')
      onLogoutButtonClick()
      expect(fnSpy).toBeCalledWith()
    })
  })

  describe('onMarketplaceButtonClick', () => {
    it('should run correctly', () => {
      jest.spyOn(window, 'open')
      onMarketplaceButtonClick()
      expect(window.open).toBeCalledWith(window.reapit.config.marketplaceUrl, '_self')
      ;(window.open as jest.Mock).mockReset()
    })
  })
})
