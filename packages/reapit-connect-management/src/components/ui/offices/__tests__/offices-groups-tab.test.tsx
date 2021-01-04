import * as React from 'react'
import { shallow } from 'enzyme'
import OfficesGroupsTab, { OfficeGroupsContent, onPageChangeHandler } from '../offices-groups-tab'
import { createBrowserHistory } from 'history'
import Routes from '@/constants/routes'

const locationMock = { pathname: '/offices/groups' }

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLocation: jest.fn(() => locationMock),
}))

const data = {
  _embedded: [
    {
      id: 'string',
      created: '2019-08-14T12:30:02.0000000Z',
      modified: '2019-08-14T12:30:02.0000000Z',
      organisationId: 'string',
      name: 'string',
      tag: 'string',
      officeIds: 'string',
      status: 'string',
    },
  ],
  pageNumber: 0,
  pageSize: 0,
  pageCount: 0,
  totalPageCount: 0,
  totalCount: 0,
  _links: {
    additionalProp1: {
      href: 'string',
    },
    additionalProp2: {
      href: 'string',
    },
    additionalProp3: {
      href: 'string',
    },
  },
}

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

describe('OfficeGroupsContent', () => {
  it('should match a snapshot', () => {
    const columns = [
      { Header: 'Group Name', accessor: 'name' },
      { Header: 'Office List', accessor: 'officeIds' },
      { Header: 'Last Updated', accessor: 'description' },
      { Header: 'Edit' },
    ]
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
    expect(history.push).toHaveBeenLastCalledWith(`${Routes.OFFICES_GROUPS}?pageNumber=2`)
  })
})
