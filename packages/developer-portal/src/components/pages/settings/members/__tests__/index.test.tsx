import React from 'react'
import { SettingsMembersPage } from '..'
import { render } from '../../../../../tests/react-testing'

describe('SettingsMembersPage', () => {
  it('should match snapshot', () => {
    expect(render(<SettingsMembersPage />)).toMatchSnapshot()
  })
})
