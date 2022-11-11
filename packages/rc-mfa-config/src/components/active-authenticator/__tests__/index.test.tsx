import React from 'react'
import { ActiveAuthenticator } from '../index'
import { render } from '../../../tests/react-testing'
import { mockAuthenticatorModel } from '../../../tests/__stubs__/authenticator'

describe('ActiveAuthenticator', () => {
  it('should render component with props', () => {
    expect(
      render(<ActiveAuthenticator activeAuthenticator={mockAuthenticatorModel} refreshAuthenticators={jest.fn()} />),
    ).toMatchSnapshot()
  })
})
