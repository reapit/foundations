import React from 'react'
import { SettingsPage } from '../index'
import { render } from '../../../../../tests/react-testing'

jest.mock('../../../../../core/use-global-state')

describe('SettingsPage', () => {
  it('should match a snapshot', () => {
    expect(render(<SettingsPage />)).toMatchSnapshot()
  })
})
