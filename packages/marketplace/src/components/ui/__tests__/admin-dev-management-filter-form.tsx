import * as React from 'react'
import { shallow } from 'enzyme'

import { AdminDevManagementFilterForm, AdminDevManagementFilterFormProps } from '../admin-dev-management-filter-form'

const initProps = (): AdminDevManagementFilterFormProps => ({
  filterValues: {
    name: 'name',
    company: 'company',
    registeredFrom: '2020/04/03',
    registeredTo: '2020/04/04',
  },
  onSearch: jest.fn(),
})

describe('AdminDevManagementFilterForm', () => {
  it('should match a snapshot', () => {
    expect(shallow(<AdminDevManagementFilterForm {...initProps()} />)).toMatchSnapshot()
  })
})
