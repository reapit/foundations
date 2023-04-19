import React from 'react'
import { render } from '../../tests/react-testing'
import { FourOFour, RoutesComponent } from '../router'

describe('RouteRoutesComponent', () => {
  it('should match a snapshot', () => {
    process.env.appEnv = 'development'
    expect(render(<RoutesComponent />)).toMatchSnapshot()
  })
})

describe('FourOFour', () => {
  it('should match a snapshot', () => {
    expect(render(<FourOFour />)).toMatchSnapshot()
  })
})
