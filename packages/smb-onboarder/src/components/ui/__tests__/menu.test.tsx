import React from 'react'
import { shallow } from 'enzyme'
import { getMockRouterProps } from '@/core/__mocks__/mock-router'
import { Menu, MenuProps, generateMenuConfig, callbackAppClick } from '@/components/ui/menu'
import { AuthContext } from '@/context'
import { mockContext } from '@/context/__mocks__/mock-context'

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLocation: jest.fn(() => ({
    location: 'location',
  })),
}))

describe('Menu', () => {
  it('should match a snapshot', () => {
    const props = {
      ...getMockRouterProps({ params: {}, search: '' }),
    } as MenuProps
    const wrapper = shallow(
      <AuthContext.Provider value={mockContext}>
        <Menu {...props} />
      </AuthContext.Provider>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  describe('generateMenuConfig', () => {
    it('should return config', () => {
      const location = {
        hash: 'mockHash',
        key: 'mockKey',
        pathname: 'mockPathname',
        search: '',
        state: {},
      }

      const logout = jest.fn()
      const result = generateMenuConfig(logout, location)
      expect(result).toBeDefined()
    })
  })

  describe('callbackAppClick', () => {
    it('should run correcly', () => {
      const fn = callbackAppClick()
      expect(fn).toEqual('https://marketplace.reapit.cloud/client/installed')
    })
  })
})
