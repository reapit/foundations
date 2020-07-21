import * as React from 'react'
import { shallow } from 'enzyme'
import { Welcome } from '../welcome'

describe('Welcome', () => {
  it('should match snapshot', () => {
    expect(shallow(<Welcome />)).toMatchSnapshot()
  })
})
