import { isDemo } from '../is-demo'

describe('isDemo', () => {
  it('should return false if the demo query string does not exist', () => {
    expect(isDemo()).toBe(false)
  })

  it('should return true if the demo query string exists', () => {
    window.location.search = '?demo=true'
    expect(isDemo()).toBe(true)
  })
})
