import * as React from 'react'
import { shallow } from 'enzyme'
import { Login, LoginProps } from '../login'

const props: LoginProps = {
  error: false,
  isLogin: false,
  login: jest.fn(),
  authChangeLoginType: jest.fn(),
  loginType: 'CLIENT',
  // @ts-ignore: ignore to fullfil the definition of RouteComponentProps
  location: {
    pathname: '/client'
  }
}

describe('Login', () => {
  it('should match a snapshot', () => {
    expect(shallow(<Login {...props} />)).toMatchSnapshot()
  })
})
