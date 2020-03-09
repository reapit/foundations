import * as React from 'react'
import { shallow } from 'enzyme'
import { Menu, MenuProps, generateMenuConfig, callbackAppClick } from '../menu'
import toJson from 'enzyme-to-json'
import { getMockRouterProps } from '@/core/__mocks__/mock-router'

describe('Menu', () => {
  it('should match a snapshot', () => {
    const props = {
      ...getMockRouterProps({ params: {}, search: '' }),
    } as MenuProps
    expect(toJson(shallow(<Menu {...props} />))).toMatchSnapshot()
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
      expect(fn).toEqual('https://marketplace.reapit.cloud/client/installed')
    })
  })
})
