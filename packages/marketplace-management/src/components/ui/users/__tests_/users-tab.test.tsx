import * as React from 'react'
import { shallow } from 'enzyme'
import { createBrowserHistory } from 'history'
import Routes from '@/constants/routes'
import UsersTab, { UsersContent, onPageChangeHandler } from '../users-tab'
import { data } from '../__stubs__/users'

jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as Object),
  useLocation: jest.fn(() => ({
    search: '/users',
  })),
}))

jest.mock('swr', () =>
  jest.fn(() => ({
    data: require('../__stubs__/users').data,
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
