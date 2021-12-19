import * as React from 'react'
import { shallow } from 'enzyme'
import { Nav, callbackAppClick } from '../nav'

describe('Nav', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<Nav />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('callbackAppClick', () => {
    it('should run correcly', () => {
      const fn = callbackAppClick()
      expect(fn).toEqual('https://marketplace.reapit.cloud/installed')
    })
  })
})
