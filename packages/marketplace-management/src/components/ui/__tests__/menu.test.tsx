import * as React from 'react'
import { shallow } from 'enzyme'
import { Menu, generateMenuConfig, MenuProps, callbackAppClick } from '../menu'

describe('Menu', () => {
  it('should match a snapshot', () => {
    const props = {} as MenuProps
    const wrapper = shallow(<Menu {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('generateMenuConfig', () => {
    it('should return config', () => {
      const props = {} as MenuProps
      const logoutCallback = jest.fn()
      const result = generateMenuConfig(logoutCallback, props.location, 'WEB')
      expect(result).toBeDefined()
    })
  })

  describe('callbackAppClick', () => {
    it('should run correcly', () => {
      const fn = callbackAppClick()
      expect(fn).toEqual('https://marketplace.reapit.cloud/installed')
    })
  })
})
