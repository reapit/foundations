import React from 'react'
import { render } from '../../../tests/react-testing'
import { SettingsProfile } from '../settings-profile'

describe('SettingsProfile', () => {
  it('should match a snapshot', () => {
    expect(render(<SettingsProfile />)).toMatchSnapshot()
  })
})
