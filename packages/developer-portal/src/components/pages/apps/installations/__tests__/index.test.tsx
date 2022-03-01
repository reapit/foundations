import React from 'react'
import AppInstallations from '..'
import { render } from '../../../../../tests/react-testing'

jest.mock('../../state/use-app-state')

describe('AppInstallations', () => {
  it('should match a snapshot', () => {
    expect(render(<AppInstallations />)).toMatchSnapshot()
  })
})
