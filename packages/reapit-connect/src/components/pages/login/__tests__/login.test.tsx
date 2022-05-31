import * as React from 'react'
import { render } from '../../../tests/react-testing'
import { Login } from '../login'

describe('Login', () => {
  it('should match snapshot', () => {
    expect(render(<Login />)).toMatchSnapshot()
  })
})
