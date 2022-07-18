import app from '../server'

jest.mock('../router', () => ({
  router: jest.fn(),
}))

jest.mock('express', () => () => ({
  use: jest.fn(),
  post: jest.fn(),
  get: jest.fn(),
  Router: jest.fn(),
  disable: jest.fn(),
}))

describe('app', () => {
  it('should correctly set up middleware', () => {
    expect(app.use).toHaveBeenCalledTimes(5)
    expect(app.get).toHaveBeenCalledTimes(1)
  })
})
