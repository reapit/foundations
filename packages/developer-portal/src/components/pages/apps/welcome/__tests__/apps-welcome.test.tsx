import React from 'react'
import { render } from '../../../../../tests/react-testing'
import { AppsWelcome } from '../apps-welcome'

describe('AppsWelcome', () => {
  it('should match a snapshot when apps are present', () => {
    expect(render(<AppsWelcome />)).toMatchSnapshot()
  })
})
