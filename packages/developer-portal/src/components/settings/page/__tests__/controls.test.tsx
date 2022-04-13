import React from 'react'
import { render } from '../../../../tests/react-testing'
import { Controls, handleLogout } from '../controls'

jest.mock('../../../../core/use-global-state')

describe('Controls', () => {
  it('should match a snapshot', () => {
    expect(render(<Controls />)).toMatchSnapshot()
  })
})

describe('handleLogout', () => {
  it('should handle member update', () => {
    const connectLogoutRedirect = jest.fn()

    const curried = handleLogout(connectLogoutRedirect)

    curried()

    expect(connectLogoutRedirect).toHaveBeenCalledTimes(1)
  })
})
