import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Home from '../home'
import { AuthProvider } from '@/context/auth-context'

describe('Home', () => {
  it('should match a snapshot', () => {
    expect(
      toJson(
        shallow(
          <AuthProvider>
            <Home />
          </AuthProvider>,
        ),
      ),
    ).toMatchSnapshot()
  })
})
