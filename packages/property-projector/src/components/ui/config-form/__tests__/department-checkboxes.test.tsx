import React from 'react'
import { shallow } from 'enzyme'
import DepartmentCheckboxes from '../department-checkboxes'

describe('DepartmentCheckboxes', () => {
  const wrapper = shallow(
    <DepartmentCheckboxes departments={[{ id: 'G', name: 'General', propertyTypes: ['house', 'bungalow'] }]} />,
  )
  it('should match a snap shot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
