import React from 'react'
import { render } from '../../tests/react-testing'
import { RoutesComponent } from '../router'

describe('RoutesComponent', () => {
  it('should match a snapshot', () => {
    expect(render(<RoutesComponent />)).toMatchSnapshot()
  })
})
