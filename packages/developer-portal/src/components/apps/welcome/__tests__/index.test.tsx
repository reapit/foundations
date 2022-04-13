import React from 'react'
import { render } from '../../../../tests/react-testing'
import AppsWelcomePage from '../index'

describe('AppsWelcome', () => {
  it('should match a snapshot when apps are present', () => {
    expect(render(<AppsWelcomePage />)).toMatchSnapshot()
  })
})
