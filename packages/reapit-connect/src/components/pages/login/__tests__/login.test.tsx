import * as React from 'react'
import { shallow } from 'enzyme'
import { Login } from '../login'

describe('Login', () => {
  it('should match snapshot', () => {
    expect(shallow(<Login />)).toMatchSnapshot()
  })
})
