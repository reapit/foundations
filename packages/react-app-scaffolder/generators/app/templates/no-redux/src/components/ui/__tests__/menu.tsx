import * as React from 'react'
import { shallow } from 'enzyme'
import { Menu, MenuProps, mapDispatchToProps, generateMenuConfig } from '../menu'
import toJson from 'enzyme-to-json'

const props: MenuProps = {
  logout: jest.fn(),
  // @ts-ignore: ignore to fullfil the definition of RouteComponentProps
  location: {
    pathname: '/client',
  },
}

describe('Menu', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<Menu {...props} />))).toMatchSnapshot()
  })

  describe('mapDispatchToProps', () => {
    it('should return loginType', () => {
      const dispatch = jest.fn()
      const fn = mapDispatchToProps(dispatch)
      fn.logout()
      expect(dispatch).toBeCalled()
    })
  })

  describe('generateMenuConfig', () => {
    it('should return config', () => {
      const logoutCallback = jest.fn()
      const result = generateMenuConfig(logoutCallback, props.location, 'WEB')
      expect(result).toBeDefined()
    })
  })
})
