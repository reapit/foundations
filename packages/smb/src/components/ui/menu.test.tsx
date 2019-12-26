import * as React from 'react'
import { shallow } from 'enzyme'
import { Menu, MenuProps, generateMenuConfig, logoutCallback } from './menu'
import toJson from 'enzyme-to-json'
import { getMockRouterProps } from '@/core/__mocks__/mock-router'

describe('Menu', () => {
  it('should match a snapshot', () => {
    const props = {
      logout: jest.fn(),
      mode: 'DESKTOP',
      ...getMockRouterProps({ params: {}, search: '' }),
    } as MenuProps
    expect(toJson(shallow(<Menu {...props} />))).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    const props = {
      logout: jest.fn(),
      mode: 'WEB',
      ...getMockRouterProps({ params: {}, search: '' }),
    } as MenuProps
    expect(toJson(shallow(<Menu {...props} />))).toMatchSnapshot()
  })

  describe('generateMenuConfig', () => {
    it('should return config', () => {
      const props = {
        logout: jest.fn(),
        mode: 'WEB',
        ...getMockRouterProps({ params: {}, search: '' }),
      } as MenuProps
      const logoutCallback = jest.fn()
      const result = generateMenuConfig(logoutCallback, props.location, 'WEB')
      expect(result).toBeDefined()
    })
  })

  describe('logoutCallback', () => {
    it('should call logout', () => {
      const logout = jest.fn()
      const fn = logoutCallback(logout)
      fn()
      expect(logout).toBeCalled()
    })
  })
})
