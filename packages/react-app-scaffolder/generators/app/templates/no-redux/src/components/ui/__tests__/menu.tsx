import * as React from 'react'
import { shallow } from 'enzyme'
<<<<<<< HEAD
import { Menu, MenuProps, generateMenuConfig } from '../menu'
import toJson from 'enzyme-to-json'
import { AuthProvider } from '@/context/authContext'

const props: MenuProps = {
=======
import { Menu, MenuProps, mapDispatchToProps, generateMenuConfig } from '../menu'
import toJson from 'enzyme-to-json'

const props: MenuProps = {
  logout: jest.fn(),
>>>>>>> temp
  // @ts-ignore: ignore to fullfil the definition of RouteComponentProps
  location: {
    pathname: '/client',
  },
}

describe('Menu', () => {
  it('should match a snapshot', () => {
<<<<<<< HEAD
    expect(
      toJson(
        shallow(
          <AuthProvider>
            <Menu {...props} />
          </AuthProvider>,
        ),
      ),
    ).toMatchSnapshot()
=======
    expect(toJson(shallow(<Menu {...props} />))).toMatchSnapshot()
  })

  describe('mapDispatchToProps', () => {
    it('should return loginType', () => {
      const dispatch = jest.fn()
      const fn = mapDispatchToProps(dispatch)
      fn.logout()
      expect(dispatch).toBeCalled()
    })
>>>>>>> temp
  })

  describe('generateMenuConfig', () => {
    it('should return config', () => {
      const logoutCallback = jest.fn()
      const result = generateMenuConfig(logoutCallback, props.location, 'WEB')
      expect(result).toBeDefined()
    })
  })
})
