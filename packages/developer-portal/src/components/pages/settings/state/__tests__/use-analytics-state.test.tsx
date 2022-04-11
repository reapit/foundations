import React from 'react'
import { render } from '../../../../../tests/react-testing'
import { SettingsProvider } from '../use-settings-state'

describe('AnalyticsProvider', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <SettingsProvider>
          <div />
        </SettingsProvider>,
      ),
    ).toMatchSnapshot()
  })
})
