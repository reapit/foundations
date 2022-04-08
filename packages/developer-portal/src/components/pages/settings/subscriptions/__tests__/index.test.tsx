import React from 'react'
import { SettingsSubscriptionsPage } from '..'
import { render } from '../../../../../tests/react-testing'

describe('SettingsSubscriptionsPage', () => {
  it('should match snapshot', () => {
    expect(render(<SettingsSubscriptionsPage />)).toMatchSnapshot()
  })
})
