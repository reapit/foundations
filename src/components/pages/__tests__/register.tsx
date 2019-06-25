import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Register } from '../register'

describe('Register', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<Register />))).toMatchSnapshot()
  })
})
