import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Router from '../router'

describe('Router', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<Router />))).toMatchSnapshot()
  })
})
