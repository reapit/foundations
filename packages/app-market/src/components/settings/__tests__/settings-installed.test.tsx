import React from 'react'
import { render } from '../../../tests/react-testing'
import { SettingsInstalled } from '../settings-installed'

describe('SettingsInstalled', () => {
  it('should match a snapshot', () => {
    expect(render(<SettingsInstalled />)).toMatchSnapshot()
  })
})
