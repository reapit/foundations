import * as React from 'react'
import { render } from '../../tests/react-testing'
import Router from '../router'

describe('Router', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<Router />)
    expect(wrapper).toMatchSnapshot()
  })
})
