import * as React from 'react'
import { shallow } from 'enzyme'
import PropertySection from '../../payments/property-section'
import { data } from '../../__stubs__/property'

describe('PropertySection', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<PropertySection property={data} />)
    expect(wrapper).toMatchSnapshot()
  })
})
