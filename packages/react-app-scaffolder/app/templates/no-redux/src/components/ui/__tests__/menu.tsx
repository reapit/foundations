import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { getMockRouterProps } from '@/core/__mocks__/mock-router'
import { AuthContext } from '@/context'
import { mockContext } from '@/context/__mocks__/mock-context'
import { Menu, MenuProps, generateMenuConfig, callbackAppClick } from '../menu'

describe('Menu', () => {
  it('should match a snapshot', () => {
    const props = {
      ...getMockRouterProps({ params: {}, search: '' }),
    }
    const wrapper = shallow(
      <AuthContext.Provider value={mockContext}>
        <Menu {...props} />
      </AuthContext.Provider>,
    )
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
      const fn = callbackAppClick()
      expect(fn).toEqual('https://dev.marketplace.reapit.cloud/client/installed')
    })
  })

})
