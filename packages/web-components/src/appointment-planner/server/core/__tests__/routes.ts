import routes from '../routers'

describe('routes', () => {
  it('should handle get requests to appointment-slots', () => {
    expect(routes.stack[0].route.path).toEqual('/appointment-slots')
    expect(routes.stack[0].route.methods.get).toBe(true)
  })
})
