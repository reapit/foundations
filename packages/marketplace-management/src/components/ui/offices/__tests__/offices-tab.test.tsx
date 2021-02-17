import * as React from 'react'
import { shallow } from 'enzyme'
import { History } from 'history'
import OfficesTab, { OfficesContent, onPageChangeHandler, onSearchHandler } from '../offices-tab'
import { createBrowserHistory } from 'history'
import Routes from '@/constants/routes'
import { data } from '../__stubs__/offices'

const locationMock = { pathname: '/offices' }

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLocation: jest.fn(() => locationMock),
}))

jest.mock('swr', () =>
  jest.fn(() => ({
    data,
  })),
)

const historyMock = ({
  push: jest.fn(),
} as unknown) as History<any>

describe('OfficesTab', () => {
  it('should match a snapshot', () => {
    expect(shallow(<OfficesTab />)).toMatchSnapshot()
  })
})

describe('OfficesContent', () => {
  it('should match a snapshot', () => {
    const columns = [
      { Header: 'Office Name', accessor: 'name' },
      { Header: 'Address', accessor: 'address' },
      { Header: 'Last Updated', accessor: 'description' },
    ]
    expect(shallow(<OfficesContent data={data} columns={columns} onPageChange={jest.fn} />)).toMatchSnapshot()
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
