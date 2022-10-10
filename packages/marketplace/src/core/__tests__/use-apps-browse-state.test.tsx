import React from 'react'
import { render } from '../../tests/react-testing'
import { AppsBrowseProvider } from '../use-apps-browse-state'

describe('AppsBrowseProvider', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <AppsBrowseProvider>
          <div />
        </AppsBrowseProvider>,
      ),
    ).toMatchSnapshot()
  })
})
