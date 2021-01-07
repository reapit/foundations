import router from '../router'

describe('router', () => {
  it('should return an instance of Router with 3 routes', () => {
    expect(router.length).toBe(3)
  })
})
