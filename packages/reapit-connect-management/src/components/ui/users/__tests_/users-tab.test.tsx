import * as React from 'react'
import { shallow } from 'enzyme'
import { createBrowserHistory } from 'history'
import Routes from '@/constants/routes'
import UsersTab, { UsersContent, onPageChangeHandler } from '../users-tab'

const locationMock = { pathname: '/users' }

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLocation: jest.fn(() => locationMock),
}))

const data = {
  _embedded: [
    {
      id: 'string',
      modified: '2019-08-14T12:30:02.0000000Z',
      created: '2019-08-14T12:30:02.0000000Z',
      description: 'string',
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

describe('UsersTab', () => {
  it('should match a snapshot', () => {
    expect(shallow(<UsersTab />)).toMatchSnapshot()
  })
})

describe('UsersContent ', () => {
  it('should match a snapshot', () => {
    const columns = [
      { Header: 'Group Name', accessor: 'id' },
      { Header: 'Members', accessor: '' },
      { Header: 'Manage', Cell: <div>Manage</div> },
    ]

    expect(shallow(<UsersContent data={data} columns={columns} onPageChange={jest.fn} />)).toMatchSnapshot()
  })
})

describe('onPageChangeHandler', () => {
  it('should return a function when executing', () => {
    const history = createBrowserHistory()
    jest.spyOn(history, 'push')
    const onPageChangeHandlerFn = onPageChangeHandler(history)
    expect(onPageChangeHandlerFn).toBeDefined()

    onPageChangeHandlerFn(2)
    expect(history.push).toHaveBeenLastCalledWith(`${Routes.USERS}?pageNumber=2`)
  })
})
