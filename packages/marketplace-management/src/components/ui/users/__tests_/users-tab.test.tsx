import * as React from 'react'
import { shallow } from 'enzyme'
import { createBrowserHistory } from 'history'
import Routes from '@/constants/routes'
import UsersTab, { onPageChangeHandler } from '../users-tab'
// import { data } from '../__stubs__/users'

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

jest.mock('../../../../utils/use-org-id', () => ({
  useOrgId: () => ({
    orgIdState: {
      orgId: 'SOME_ID',
      orgName: 'SOME_NAME',
      orgClientId: 'SOME_CLIENT_ID',
    },
  }),
}))

describe('UsersTab', () => {
  it('should match a snapshot', () => {
    window.reapit.config.groupIdsWhitelist = []
    expect(shallow(<UsersTab />)).toMatchSnapshot()
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
