import * as React from 'react'
import { render } from '../../../tests/react-testing'
import PropertySection from '../property-section'
import { mockPropertyModel } from '../../../tests/__mocks__/property'

describe('PropertySection', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<PropertySection property={mockPropertyModel} />)
    expect(wrapper).toMatchSnapshot()
  })
})
