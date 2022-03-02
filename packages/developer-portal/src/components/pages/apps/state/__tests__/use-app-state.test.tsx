import React from 'react'
import { render } from '../../../../../tests/react-testing'
import { AppProvider } from '../use-app-state'

describe('AppProvider', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <AppProvider>
          <div />
        </AppProvider>,
      ),
    ).toMatchSnapshot()
  })
})
