import * as React from 'react'
import { shallow } from 'enzyme'
import OfficesGroupsTab, { OfficeGroupsContent, onPageChangeHandler } from '../offices-groups-tab'
import { createBrowserHistory } from 'history'
import Routes from '@/constants/routes'
import { data } from '../__stubs__/office-groups'

const locationMock = { pathname: '/offices/groups' }

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLocation: jest.fn(() => locationMock),
}))

jest.mock('swr', () =>
  jest.fn(() => ({
    data,
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
  it('should match a snapshot', () => {
    expect(shallow(<OfficeGroupsContent data={data} columns={columns} onPageChange={jest.fn} />)).toMatchSnapshot()
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
