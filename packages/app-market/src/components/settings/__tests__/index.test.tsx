import React from 'react'
import { render } from '../../../tests/react-testing'
import { SettingsPage } from '../index'

describe('SettingsPage', () => {
  it('should match a snapshot', () => {
    expect(render(<SettingsPage />)).toMatchSnapshot()
  })
})
