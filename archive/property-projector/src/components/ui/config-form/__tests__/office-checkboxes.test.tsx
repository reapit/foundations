import * as React from 'react'
import { shallow } from 'enzyme'
import OfficeCheckboxes from '../office-checkboxes'

describe('OfficeCheckboxes', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(
      <OfficeCheckboxes
        offices={[
          { id: 'ABC', name: 'Solihull' },
          { id: 'XYZ', name: 'London' },
        ]}
      />,
    )
  })
  it('should match a snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should make sure there are 2 office checkboxes.', () => {
    expect(wrapper.find('.office-checkbox').children().length).toEqual(2)
  })
})
