import * as React from 'react'
import { shallow } from 'enzyme'
import { createBrowserHistory } from 'history'
import Routes from '@/constants/routes'
import UserGroupsTab, { onPageChangeHandler } from '../user-groups-tab'
// import { data } from '../__stubs__/user-groups'

jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as Object),
  useLocation: jest.fn(() => ({ pathname: '/users/groups' })),
}))

jest.mock('swr', () =>
  jest.fn(() => ({
    data: require('../__stubs__/user-groups').data,
    mutate: jest.fn,
  })),
)

describe('UserGroupsTab', () => {
  it('should match a snapshot', () => {
    expect(shallow(<UserGroupsTab />)).toMatchSnapshot()
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
