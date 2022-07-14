import React from 'react'
import { render } from '../../../tests/react-testing'
import { handleLogout, SettingsPage } from '../index'

describe('SettingsPage', () => {
  it('should match a snapshot', () => {
    expect(render(<SettingsPage />)).toMatchSnapshot()
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
