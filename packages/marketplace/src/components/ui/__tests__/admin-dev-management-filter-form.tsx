import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { AdminDevManagementFilterForm, AdminDevManagementFilterFormProps } from '../admin-dev-management-filter-form'

const initProps = (): AdminDevManagementFilterFormProps => ({
  filterValues: {
    name: 'name',
    company: 'company'
  },
  onSearch: jest.fn()
})

describe('AdminDevManagementFilterForm', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<AdminDevManagementFilterForm {...initProps()} />))).toMatchSnapshot()
  })
})
