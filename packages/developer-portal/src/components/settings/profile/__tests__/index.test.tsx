import React from 'react'
import { SettingsProfilePage } from '..'
import { render } from '../../../../tests/react-testing'

jest.mock('../../../../core/use-global-state')

describe('SettingsProfilePage', () => {
  it('should match snapshot', () => {
    expect(render(<SettingsProfilePage />)).toMatchSnapshot()
  })
})
