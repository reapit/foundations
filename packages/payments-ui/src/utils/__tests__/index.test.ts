import { navigateRoute } from '..'

describe('navigate', () => {
  it('should open a new page', () => {
    const navigate = jest.fn()

    const curried = navigateRoute(navigate, '/payments')

    curried()

    expect(navigate).toHaveBeenCalledWith('/payments')
  })
})
