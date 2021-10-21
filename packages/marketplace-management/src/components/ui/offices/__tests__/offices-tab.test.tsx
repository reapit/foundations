import * as React from 'react'
import { shallow } from 'enzyme'
import { History } from 'history'
import OfficesTab, { onPageChangeHandler, onSearchHandler } from '../offices-tab'
import { createBrowserHistory } from 'history'
import Routes from '@/constants/routes'
// import { data } from '../__stubs__/offices'

jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as Object),
  useLocation: jest.fn(() => ({ pathname: '/offices' })),
}))

jest.mock('swr', () =>
  jest.fn(() => ({
    data: require('../__stubs__/offices').data,
  })),
)

const historyMock = {
  push: jest.fn(),
} as unknown as History<any>

describe('OfficesTab', () => {
  it('should match a snapshot', () => {
    expect(shallow(<OfficesTab />)).toMatchSnapshot()
  })
})

describe('onPageChangeHandler', () => {
  it('should return a function when executing', () => {
    const history = createBrowserHistory()
    jest.spyOn(history, 'push')
    const onPageChangeHandlerFn = onPageChangeHandler(history, { name: 'reapit' })
    expect(onPageChangeHandlerFn).toBeDefined()

    onPageChangeHandlerFn(2)
    expect(history.push).toHaveBeenLastCalledWith(`${Routes.OFFICES}?pageNumber=2&name=reapit`)
  })
})

describe('onSearchHandler', () => {
  const fn = onSearchHandler(historyMock)
  const spy = jest.spyOn(historyMock, 'push')
  it('should setStatus when !query', () => {
    fn({ name: '' })
    expect(spy).toHaveBeenCalledWith(`${Routes.OFFICES}`)
  })
  it('should push history when has query', () => {
    fn({ name: 'test' })
    expect(spy).toHaveBeenCalledWith(`${Routes.OFFICES}?page=1&name=test`)
  })
})
