import React from 'react'
import { SettingsProfilePage } from '..'
import { render } from '../../../../../tests/react-testing'

describe('SettingsProfilePage', () => {
  it('should match snapshot', () => {
    expect(render(<SettingsProfilePage />)).toMatchSnapshot()
  })
})
