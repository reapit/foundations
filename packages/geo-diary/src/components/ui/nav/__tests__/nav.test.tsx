import * as React from 'react'
import { render } from '../../../../tests/react-testing'
import { Nav, callbackAppClick } from '../nav'

describe('Nav', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<Nav />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('callbackAppClick', () => {
    it('should run correcly', () => {
      const fn = callbackAppClick()
      expect(fn).toEqual('https://marketplace.reapit.cloud/installed')
    })
  })
})
