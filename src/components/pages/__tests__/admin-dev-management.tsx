import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import {
  AdminDevManagement,
  AdminDevManagementProps,
  onPageChangeHandler,
  onSearchHandler
} from '../admin-dev-management'
import { AdminDevManamgenetState } from '@/reducers/admin-dev-management'
import { AdminDevManagementFilterFormValues } from '@/components/ui/admin-dev-management-filter-form'
import { match } from 'react-router'
import { getMockRouterProps } from '@/utils/mock-helper'

describe('AdminDevManagement', () => {
  it('should match a snapshot when LOADING false', () => {
    const props: AdminDevManagementProps = {
      adminDevManagementState: { loading: false, data: undefined } as AdminDevManamgenetState,
      filterValues: {} as AdminDevManagementFilterFormValues,
      onPageChange: jest.fn(),
      onSearch: jest.fn()
    }

    expect(toJson(shallow(<AdminDevManagement {...props} />))).toMatchSnapshot()
  })
})

const mockRouterProps = getMockRouterProps({ page: 2 })

describe('onPageChangeHandler', () => {
  it('should return a function when executing', () => {
    const onPageChangeHandlerFn = onPageChangeHandler(mockRouterProps.history, {
      name: '',
      company: ''
    } as AdminDevManagementFilterFormValues)
    expect(onPageChangeHandlerFn).toBeDefined()

    onPageChangeHandlerFn(2)
    expect(mockRouterProps.history.push).toBeCalled()
  })
})

describe('onSearchHandler', () => {
  it('should return a function when executing', () => {
    const onSearchHandlerFn = onSearchHandler(mockRouterProps.history, mockRouterProps.match)
    expect(onSearchHandlerFn).toBeDefined()

    onSearchHandlerFn({
      name: '',
      company: ''
    } as AdminDevManagementFilterFormValues)
    expect(mockRouterProps.history.push).toBeCalled()
  })
})
