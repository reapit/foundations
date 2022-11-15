import React from 'react'
import { handleDeleteAuthenticator, handleRefresh, DeleteAuthenticator } from '../delete-authenticator'
import { render } from '../../../tests/react-testing'
import { mockAuthenticatorModel } from '../../../tests/__stubs__/authenticator'

describe('DeleteAuthenticator', () => {
  it('should render component with props', () => {
    expect(
      render(<DeleteAuthenticator authenticatorId={mockAuthenticatorModel.id} refreshAuthenticators={jest.fn()} />),
    ).toMatchSnapshot()
  })
})

describe('handleDeleteAuthenticator', () => {
  it('should call the delete authenticator method', () => {
    const deleteAuthenticator = jest.fn()
    const curried = handleDeleteAuthenticator(deleteAuthenticator)

    curried()

    expect(deleteAuthenticator).toHaveBeenCalledTimes(1)
  })
})

describe('handleRefresh', () => {
  it('should refresh the authenticators if one is deleted', () => {
    const refreshAuthenticators = jest.fn()
    const hasDeleted = true
    const curried = handleRefresh(refreshAuthenticators, hasDeleted)

    curried()

    expect(refreshAuthenticators).toHaveBeenCalledTimes(1)
  })
})
