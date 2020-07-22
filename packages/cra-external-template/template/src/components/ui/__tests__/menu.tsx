import * as React from 'react'
import { shallow } from 'enzyme'
import { getMockRouterProps } from '../../../core/__mocks__/mock-router'
import { Menu, generateMenuConfig, callbackAppClick, MenuProps } from '../menu'

describe('Menu', () => {
  it('should match a snapshot', () => {
    const props = {
      ...getMockRouterProps({ params: {}, search: '' }),
    }
    const wrapper = shallow(<Menu {...props} />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('generateMenuConfig', () => {
    it('should return config', () => {
      const props = {
        ...getMockRouterProps({ params: {}, search: '' }),
      } as MenuProps
      const logoutCallback = jest.fn()
      const result = generateMenuConfig(logoutCallback, props.location, 'WEB')
      expect(result).toBeDefined()
    })
  })

  describe('callbackAppClick', () => {
    it('should run correcly', () => {
      window.location.href = 'dev'
      const fn = callbackAppClick()
      expect(fn).toEqual('https://dev.marketplace.reapit.cloud/installed')
    })
  })
})
