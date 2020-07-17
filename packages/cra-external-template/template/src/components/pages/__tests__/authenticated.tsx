import * as React from 'react'
import { shallow } from 'enzyme'
import Authenticated from '../authenticated'
import { AuthContext } from '../../../context'
import { mockContext } from '../../../context/__mocks__/mock-context'

describe('Authenticated', () => {
  it('should match a snapshot', () => {
    expect(
      shallow(
        <AuthContext.Provider value={mockContext}>
          <Authenticated />
        </AuthContext.Provider>,
      ),
    ).toMatchSnapshot()
  })
})
