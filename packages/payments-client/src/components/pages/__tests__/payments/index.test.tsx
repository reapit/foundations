import * as React from 'react'
import { shallow } from 'enzyme'
import { History } from 'history'
import Routes from '@/constants/routes'
import Payments, { onPageChangeHandler, onSearchHandler } from '../../payments'

const locationMock = { search: '', pathname: '/test' }
jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as Object),
  useHistory: () => ({ push: jest.fn() }),
  useLocation: jest.fn(() => locationMock),
}))

const historyMock = ({
  push: jest.fn(),
} as unknown) as History<any>

describe('Payments ', () => {
  it('should match a snapshot', () => {
    expect(shallow(<Payments />)).toMatchSnapshot()
  })
})

describe('onPageChangeHandler', () => {
  it('should return a function when executing', () => {
    jest.spyOn(historyMock, 'push')
    const onPageChangeHandlerFn = onPageChangeHandler(historyMock, {})
    expect(onPageChangeHandlerFn).toBeDefined()

    onPageChangeHandlerFn(2)
    expect(historyMock.push).toHaveBeenLastCalledWith(`${Routes.PAYMENTS}?pageNumber=2`)
  })
})

const fn = onSearchHandler(historyMock)
const spy = jest.spyOn(historyMock, 'push')
describe('onSearchHandler', () => {
  it('should setStatus when !query', () => {
    fn({ description: '' })
    expect(spy).toHaveBeenCalledWith(`${Routes.PAYMENTS}`)
  })
})

describe('onSearchHandler', () => {
  it('should push historyMock  when has query', () => {
    fn({ description: 'description' })
    expect(spy).toHaveBeenCalledWith(`${Routes.PAYMENTS}?pageNumber=1&description=description`)
  })
})
