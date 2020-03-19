import { getMarketplaceGlobalsByKey, GLOBAL_KEY } from '../utils'

let oldWindow = (global as any).window

beforeAll(() => {
  ;(global as any).window = undefined
})
afterAll(() => {
  ;(global as any).window = oldWindow
})

describe('getMarketplaceGlobalsByKey', () => {
  it('Should return undefined if window or window[GLOBAL_KEY] undefined', () => {
    ;(global as any).window = undefined as any
    expect(getMarketplaceGlobalsByKey()).toBeUndefined()
    ;(global as any).window[GLOBAL_KEY] = undefined
    expect(getMarketplaceGlobalsByKey()).toBeUndefined()
  })

  it('Should return entire object if key is undefined', () => {
    const globalObject = { key: 'value' }
    ;(global as any).window[GLOBAL_KEY] = globalObject
    expect(getMarketplaceGlobalsByKey()).toEqual(globalObject)
  })
  it('Should return correct key', () => {
    const globalObject = { key1: 'value' }
    ;(global as any).window[GLOBAL_KEY] = globalObject
    expect(getMarketplaceGlobalsByKey('key1')).toEqual('value')
  })
})
