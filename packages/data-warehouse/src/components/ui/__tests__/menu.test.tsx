import * as React from 'react'
import { mount } from 'enzyme'
import { Menu, generateMenuConfig, MenuProps } from '../menu'
import { Router } from 'react-router'
import { createBrowserHistory } from 'history'

describe('Menu', () => {
  it('should match a snapshot', () => {
    const history = createBrowserHistory()
    const props = {} as MenuProps
    const wrapper = mount(
      <Router history={history}>
        <Menu {...props} />
      </Router>,
    )
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
