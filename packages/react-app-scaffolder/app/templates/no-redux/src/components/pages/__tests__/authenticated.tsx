import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Authenticated from '../authenticated'
import { AuthProvider } from '@/context/auth-context'

describe('Authenticated', () => {
  it('should match a snapshot', () => {
    expect(
      toJson(
        shallow(
          <AuthProvider>
            <Authenticated />
          </AuthProvider>,
        ),
      ),
    ).toMatchSnapshot()
  })
})
