import * as React from 'react'
import { shallow } from 'enzyme'
import { AuthContext } from '@/context'
import { mockContext } from '@/context/__mocks__/mock-context'
import { Menu, generateMenuConfig, callbackAppClick } from '../menu'

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLocation: jest.fn(() => ({
    location: 'location',
  })),
}))

describe('Menu', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(
      <AuthContext.Provider value={mockContext}>
        <Menu />
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
      const logoutCallback = jest.fn()
      const result = generateMenuConfig(logoutCallback, location)
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
