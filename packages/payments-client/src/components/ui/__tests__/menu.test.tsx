import * as React from 'react'
import { render } from '../../../tests/react-testing'
import { Menu, generateMenuConfig, MenuProps } from '../menu'

describe('Menu', () => {
  it('should match a snapshot', () => {
    const props = {} as MenuProps
    const wrapper = render(<Menu {...props} />)
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
