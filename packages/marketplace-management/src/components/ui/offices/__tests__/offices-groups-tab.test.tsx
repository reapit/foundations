import * as React from 'react'
import { shallow } from 'enzyme'
import OfficesGroupsTab, { OfficeGroupsContent, onPageChangeHandler, renderResult } from '../offices-groups-tab'
import { createBrowserHistory } from 'history'
import Routes from '@/constants/routes'
import { data } from '../__stubs__/office-groups'

jest.mock('../../../../core/connect-session')
jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as Object),
  useLocation: jest.fn(() => ({ pathname: '/offices/groups' })),
}))

jest.mock('swr', () =>
  jest.fn(() => ({
    data: require('../__stubs__/office-groups').data,
    mutate: jest.fn,
  })),
)

describe('OfficesGroupsTab', () => {
  it('should match a snapshot', () => {
    expect(shallow(<OfficesGroupsTab />)).toMatchSnapshot()
  })
})

const columns = [
  { Header: 'Group Name', accessor: 'name' },
  { Header: 'Office List', accessor: 'officeIds' },
  { Header: 'Last Updated', accessor: 'description' },
  { Header: 'Edit' },
]

describe('OfficeGroupsContent', () => {
  const onPageChange = jest.fn()
  it('should match a snapshot', () => {
    expect(
      shallow(<OfficeGroupsContent officeGroups={data} columns={columns} onPageChange={onPageChange} />),
    ).toMatchSnapshot()
  })
})

describe('onPageChangeHandler', () => {
  it('should return a function when executing', () => {
    const history = createBrowserHistory()
    jest.spyOn(history, 'push')
    const onPageChangeHandlerFn = onPageChangeHandler(history)
    expect(onPageChangeHandlerFn).toBeDefined()

    onPageChangeHandlerFn(2)
    expect(history.push).toHaveBeenCalledWith(`${Routes.OFFICES_GROUPS}?pageNumber=2`)
  })
})

describe('renderResult', () => {
  const columns = [
    { Header: 'Group Name', accessor: 'name' },
    { Header: 'Office List', accessor: 'officeIds' },
    { Header: 'Last Updated' },
    { Header: 'Edit' },
  ]
  it('should match snapshot when no result', () => {
    const result = renderResult(columns, [])
    expect(result).toMatchSnapshot()
  })

  it('should match snapshot when has result data', () => {
    const result = renderResult(columns, data._embedded)
    expect(result).toMatchSnapshot()
  })
})
