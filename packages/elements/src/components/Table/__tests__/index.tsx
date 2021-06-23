import * as React from 'react'
import { shallow } from 'enzyme'
import { Table } from '../'

describe('Table component', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<Table />)
    expect(wrapper).toMatchSnapshot()
  })
})
