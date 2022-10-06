import React from 'react'
import { render } from '../../../tests/react-testing'
import { Nav, callbackAppClick } from '..'

describe('Nav', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<Nav />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('callbackAppClick', () => {
    it('should correctly navigate to marketplace', () => {
      const marketplaceUri = 'https://marketplace.reapit.cloud/installed'
      window.reapit.config.marketplaceUrl = 'https://marketplace.reapit.cloud/installed'
      callbackAppClick()
      expect(window.location.href).toEqual(marketplaceUri)
    })
  })
})
