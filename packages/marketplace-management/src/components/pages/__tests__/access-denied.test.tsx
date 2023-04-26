import React from 'react'
import { render } from '@testing-library/react'
import AccessDenied, { onLogoutButtonClick, onMarketplaceButtonClick } from '../access-denied'
import { reapitConnectBrowserSession } from '../../../core/connect-session'

describe('AccessDenied', () => {
  it('should match a snapshot', () => {
    expect(render(<AccessDenied />)).toMatchSnapshot()
  })

  describe('onLogoutButtonClick', () => {
    it('should run correctly', () => {
      const logoutSpy = jest.spyOn(reapitConnectBrowserSession, 'connectLogoutRedirect')
      onLogoutButtonClick()
      expect(logoutSpy).toBeCalledWith()
    })
  })

  describe('onMarketplaceButtonClick', () => {
    it('should correctly open a page', () => {
      const openSpy = jest.spyOn(window, 'open')
      onMarketplaceButtonClick()
      expect(openSpy).toBeCalledWith(`${process.env.marketplaceUrl}/installed`, '_self')
      openSpy.mockReset()
    })
  })
})
