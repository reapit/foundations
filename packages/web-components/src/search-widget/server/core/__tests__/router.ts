import router from '../router'

describe('router', () => {
  it('should handle get requests to properties', () => {
    expect(router.stack[0].route.path).toEqual('/properties')
    expect(router.stack[0].route.methods.get).toBe(true)
  })

  it('should handle get requests to properties/:id', () => {
    expect(router.stack[1].route.path).toEqual('/properties/:id')
    expect(router.stack[1].route.methods.get).toBe(true)
  })

  it('should handle get requests to propertyimages', () => {
    expect(router.stack[2].route.path).toEqual('/propertyImages')
    expect(router.stack[2].route.methods.get).toBe(true)
  })
})
