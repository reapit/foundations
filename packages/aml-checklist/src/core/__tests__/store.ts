import StoreInstance, { Store } from '../store'

describe('Store', () => {
  it('should return a singleton instance of Store', () => {
    expect(StoreInstance instanceof Store).toBe(true)
  })

  it('should export a store', () => {
    expect(StoreInstance.reduxStore).toBeDefined()
    expect(typeof StoreInstance.reduxStore).toBe('object')
  })

  it('should export a state', () => {
    expect(StoreInstance.state).toBeDefined()
    expect(typeof StoreInstance.state).toBe('object')
  })

  it('should export a dispatch', () => {
    expect(StoreInstance.dispatch).toBeDefined()
    expect(typeof StoreInstance.dispatch).toBe('function')
  })
})
