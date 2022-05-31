import * as React from 'react'
import { render } from '../../../tests/react-testing'
import PropertySection from '../property-section'
import { stubPropertyModel } from '../__stubs__/property'

describe('PropertySection', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<PropertySection property={stubPropertyModel} />)
    expect(wrapper).toMatchSnapshot()
  })
})
