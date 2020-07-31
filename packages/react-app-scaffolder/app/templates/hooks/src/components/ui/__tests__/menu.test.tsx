import * as React from 'react'
import { shallow } from 'enzyme'
import { Menu, generateMenuConfig, MenuProps } from '../menu'

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
})
