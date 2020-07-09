import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Authenticated from '../authenticated'
import { AuthContext } from '@/context'
import { mockContext } from '@/context/__mocks__/mock-context'

describe('Authenticated', () => {
  it('should match a snapshot', () => {
    expect(
      toJson(
        shallow(
          <AuthContext.Provider value={mockContext}>
            <Authenticated />
          </AuthContext.Provider>,
        ),
      ),
    ).toMatchSnapshot()
  })
})
