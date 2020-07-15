import * as React from 'react'
import { shallow } from 'enzyme'

import { DevsManagementFilterForm, DevsManagementFilterFormProps } from '../devs-management-filter-form'

const initProps = (): DevsManagementFilterFormProps => ({
  filterValues: {
    name: 'name',
    company: 'company',
    registeredFrom: '2020/04/03',
    registeredTo: '2020/04/04',
  },
  onSearch: jest.fn(),
})

describe('DevsManagementFilterForm', () => {
  it('should match a snapshot', () => {
    expect(shallow(<DevsManagementFilterForm {...initProps()} />)).toMatchSnapshot()
  })
})
