import * as React from 'react'
import { shallow } from 'enzyme'
import { Container } from '../container'

describe('Container', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<Container width={0} />)
    expect(wrapper).toMatchSnapshot()
  })
})
