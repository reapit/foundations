import * as React from 'react'
import { shallow } from 'enzyme'
import Home from '../home'

describe('Home', () => {
  it('should match a snapshot', () => {
    expect(shallow(<Home />)).toMatchSnapshot()
  })
})
