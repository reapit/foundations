import * as React from 'react'
import { shallow } from 'enzyme'
import OfficesGroupsTab, { onPageChangeHandler } from '../offices-groups-tab'
import { createBrowserHistory } from 'history'
import Routes from '@/constants/routes'

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
