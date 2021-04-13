import * as React from 'react'
import { shallow } from 'enzyme'
import { Snack } from '../'

describe('Snack component', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<Snack />)
    expect(wrapper).toMatchSnapshot()
  })
})
