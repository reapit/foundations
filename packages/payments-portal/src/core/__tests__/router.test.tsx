import React from 'react'
import { render } from '../../tests/react-testing'
import Router from '../router'

describe('Router', () => {
  it('should match a snapshot', () => {
    expect(render(<Router />)).toMatchSnapshot()
  })
})
