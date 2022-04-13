import React from 'react'
import { render } from '../../tests/react-testing'
import Router, { FourOFour } from '../router'

describe('Router', () => {
  it('should match a snapshot', () => {
    window.reapit.config.appEnv = 'development'
    expect(render(<Router />)).toMatchSnapshot()
  })
})

describe('FourOFour', () => {
  it('should match a snapshot', () => {
    expect(render(<FourOFour />)).toMatchSnapshot()
  })
})
