import * as React from 'react'
import { shallow } from 'enzyme'
import Router from '../router'

describe('Router', () => {
  it('should match a snapshot', () => {
    expect(shallow(<Router />)).toMatchSnapshot()
  })
})
