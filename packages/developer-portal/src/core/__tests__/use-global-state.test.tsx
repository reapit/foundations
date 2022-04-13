import React from 'react'
import { render } from '../../tests/react-testing'
import { GlobalProvider } from '../use-global-state'

describe('AnalyticsProvider', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <GlobalProvider>
          <div />
        </GlobalProvider>,
      ),
    ).toMatchSnapshot()
  })
})
