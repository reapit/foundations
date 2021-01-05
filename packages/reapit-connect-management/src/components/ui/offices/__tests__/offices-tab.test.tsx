import * as React from 'react'
import { shallow } from 'enzyme'
import OfficesTab, { OfficesContent, onPageChangeHandler } from '../offices-tab'
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
