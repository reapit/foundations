import { getNumberOfItems } from '../browse-app'

describe('Browse apps', () => {
  test('getNumberOfItems', () => {
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 680 })
    expect(getNumberOfItems()).toEqual(9)
    Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 1200 })
    expect(getNumberOfItems()).toEqual(18)
  })
})
