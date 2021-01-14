import * as React from 'react'
import { shallow } from 'enzyme'
import PropertySection from '../../payments/property-section'
import { data } from '../../__stubs__/property'

jest.mock('swr', () =>
  jest.fn(() => ({
    data,
  })),
)

describe('PropertySection', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<PropertySection propertyId="propertyId" />)
    expect(wrapper).toMatchSnapshot()
  })
})
