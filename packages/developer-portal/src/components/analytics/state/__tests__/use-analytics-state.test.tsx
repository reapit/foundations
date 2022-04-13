import React from 'react'
import { render } from '../../../../tests/react-testing'
import { AnalyticsProvider } from '../use-analytics-state'

describe('AnalyticsProvider', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <AnalyticsProvider>
          <div />
        </AnalyticsProvider>,
      ),
    ).toMatchSnapshot()
  })
})
