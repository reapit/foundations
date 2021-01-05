import * as React from 'react'
import { shallow } from 'enzyme'
import { createBrowserHistory } from 'history'
import Routes from '@/constants/routes'
import UserGroupsTab, { UserGroupsContent, onPageChangeHandler } from '../user-groups-tab'
import { data } from '../__stubs__/user-groups'

const locationMock = { pathname: '/users/groups' }

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

describe('UserGroupsTab', () => {
  it('should match a snapshot', () => {
    expect(shallow(<UserGroupsTab />)).toMatchSnapshot()
  })
})

describe('UserGroupsContent', () => {
  it('should match a snapshot', () => {
    const columns = [
      { Header: 'Name', accessor: 'name' },
      { Header: 'Email', accessor: 'email' },
      { Header: 'User Groups', accessor: 'groups' },
      { Header: 'Edit' },
    ]

    expect(shallow(<UserGroupsContent data={data} columns={columns} onPageChange={jest.fn} />)).toMatchSnapshot()
  })
})

describe('onPageChangeHandler', () => {
  it('should return a function when executing', () => {
    const history = createBrowserHistory()
    jest.spyOn(history, 'push')
    const onPageChangeHandlerFn = onPageChangeHandler(history)
    expect(onPageChangeHandlerFn).toBeDefined()

    onPageChangeHandlerFn(2)
    expect(history.push).toHaveBeenLastCalledWith(`${Routes.USERS_GROUPS}?pageNumber=2`)
  })
})
