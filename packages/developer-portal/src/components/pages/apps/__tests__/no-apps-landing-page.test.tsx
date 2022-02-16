import React from 'react'
import { render } from '../../../../tests/react-testing'
import { NoAppsLandingPage } from '../no-apps-landing-page'

describe('NoAppsLandingPage', () => {
  it('should match a snapshot when apps are present', () => {
    expect(render(<NoAppsLandingPage />)).toMatchSnapshot()
  })
})
