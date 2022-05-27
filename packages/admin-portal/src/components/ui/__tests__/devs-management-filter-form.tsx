import * as React from 'react'
import { render } from '../../../tests/react-testing'

import { DevsManagementFilterForm, DevsManagementFilterFormProps } from '../devs-management-filter-form'

const initProps = (): DevsManagementFilterFormProps => ({
  filterValues: {
    name: 'name',
    company: 'company',
    registeredFrom: '2020/04/03',
    registeredTo: '2020/04/04',
    status: 'incomplete',
  },
  onSearch: jest.fn(),
})

describe('DevsManagementFilterForm', () => {
  it('should match a snapshot', () => {
    expect(render(<DevsManagementFilterForm {...initProps()} />)).toMatchSnapshot()
  })
})
