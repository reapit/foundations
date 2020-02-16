import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Login } from '../login'
import { AuthProvider } from '@/context/auth-context'

describe('Login', () => {
  it('should match a snapshot', () => {
    expect(
      toJson(
        shallow(
          <AuthProvider>
            <Login />
          </AuthProvider>,
        ),
      ),
    ).toMatchSnapshot()
  })
})
