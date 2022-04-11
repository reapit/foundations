import React from 'react'
import { SettingsProfilePage } from '..'
import { render } from '../../../../../tests/react-testing'

jest.mock('../../state/use-settings-state')

describe('SettingsProfilePage', () => {
  it('should match snapshot', () => {
    expect(render(<SettingsProfilePage />)).toMatchSnapshot()
  })
})
