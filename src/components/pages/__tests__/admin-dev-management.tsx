import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import {
  AdminDevManagement,
  AdminDevManagementProps,
  onPageChangeHandler,
  onSearchHandler,
  mapStateToProps
} from '../admin-dev-management'
import { AdminDevManamgenetState } from '@/reducers/admin-dev-management'
import { AdminDevManagementFilterFormValues } from '@/components/ui/admin-dev-management-filter-form'
import { RouteComponentProps } from 'react-router'
import { getMockRouterProps } from '@/utils/mock-helper'
import { ReduxState } from '@/types/core'

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

  it('should show loader when LOADING true', () => {
    const props: AdminDevManagementProps = {
      adminDevManagementState: { loading: true, data: undefined } as AdminDevManamgenetState,
      filterValues: {} as AdminDevManagementFilterFormValues,
      onPageChange: jest.fn(),
      onSearch: jest.fn()
    }

    expect(toJson(shallow(<AdminDevManagement {...props} />))).toMatchSnapshot()
  })

  it('should render blank Info when data is empty', () => {
    const props: AdminDevManagementProps = {
      adminDevManagementState: { loading: false, data: [] } as AdminDevManamgenetState,
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

describe('mapStateToProps', () => {
  it('should return correctly', () => {
    const mockState = {
      adminDevManagement: {
        loading: true,
        data: undefined
      }
    } as ReduxState

    const ownState: RouteComponentProps = mockRouterProps
    const filterValues = { name: '', company: '' }

    const result = mapStateToProps(mockState, ownState)
    const output = {
      adminDevManagementState: mockState.adminDevManagement,
      filterValues,
      onPageChange: expect.any(Function),
      onSearch: expect.any(Function)
    }

    expect(result).toEqual(output)
  })
})
