import * as React from 'react'
import { shallow } from 'enzyme'
import { Menu, MenuProps, mapStateToProps, mapDispatchToProps, generateMenuConfig } from '../menu'
import { ReduxState } from '@/types/core'

const props: MenuProps = {
  loginType: 'CLIENT',
  logout: jest.fn(),
  // @ts-ignore: ignore to fullfil the definition of RouteComponentProps
  location: {
    pathname: '/client',
  },
}

describe('Menu', () => {
  it('should match a snapshot', () => {
    expect(shallow(<Menu {...props} />)).toMatchSnapshot()
  })

  describe('mapStateToProps', () => {
    it('should return loginType', () => {
      const input = {
        auth: {
          loginType: 'ADMIN',
          refreshSession: {
            mode: 'WEB',
          },
        },
      } as ReduxState
      const output = { loginType: 'ADMIN', mode: 'WEB', isAdmin: false }
      const result = mapStateToProps(input)
      expect(output).toEqual(result)
    })
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
      const result = generateMenuConfig(logoutCallback, props.location, 'WEB', false)
      expect(result).toBeDefined()
    })
  })
})
