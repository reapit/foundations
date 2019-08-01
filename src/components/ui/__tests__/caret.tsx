import * as React from 'react'
import { shallow } from 'enzyme'
import Caret from '../caret'
import toJson from 'enzyme-to-json'

describe('Caret', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<Caret isActive />))).toMatchSnapshot()
  })
})
