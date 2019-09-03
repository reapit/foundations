import * as React from 'react'
import { shallow } from 'enzyme'
import { Login, LoginProps } from '../login'

describe('Login', () => {
  it('should match a snapshot', () => {
    let mock: any = jest.fn()

    const props: LoginProps = {
      isLogin: false,
      error: false,
      login: mock,
      location: mock,
      history: mock,
      match: mock
    }

    expect(shallow(<Login {...props} />)).toMatchSnapshot()
  })
})
