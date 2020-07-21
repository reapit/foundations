import * as React from 'react'
import { shallow } from 'enzyme'
import Authenticated from '../authenticated'

describe('Authenticated', () => {
  it('should match a snapshot', () => {
    expect(shallow(<Authenticated />)).toMatchSnapshot()
  })
})
