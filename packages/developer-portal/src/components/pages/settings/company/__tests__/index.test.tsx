import React from 'react'
import { SettingsCompanyPage } from '..'
import { render } from '../../../../../tests/react-testing'

describe('SettingsCompanyPage', () => {
  it('should match snapshot', () => {
    expect(render(<SettingsCompanyPage />)).toMatchSnapshot()
  })
})
