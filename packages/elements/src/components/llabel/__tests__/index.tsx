import * as React from 'react'
import { shallow } from 'enzyme'
import { Label } from '../'

describe('Label component', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<Label />)
    expect(wrapper).toMatchSnapshot()
  })
})
