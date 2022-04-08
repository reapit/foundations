import React from 'react'
import { SettingsPasswordPage } from '..'
import { render } from '../../../../../tests/react-testing'

describe('SettingsPasswordPage', () => {
  it('should match snapshot', () => {
    expect(render(<SettingsPasswordPage />)).toMatchSnapshot()
  })
})
