import * as React from 'react'
import { shallow } from 'enzyme'
import PropertySection from '../property-section'
import { stubPropertyModel } from '../__stubs__/property'

describe('PropertySection', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<PropertySection property={stubPropertyModel} />)
    expect(wrapper).toMatchSnapshot()
  })
})
