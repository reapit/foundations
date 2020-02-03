import { logger } from '../error-logger'
import * as Sentry from '@sentry/browser'

jest.mock('@sentry/browser')

const error = new Error('test')
const spy = jest.spyOn(console, 'error')

describe('logger', () => {
  const INITIAL_NODE_ENV = process.env.NODE_ENV

  beforeEach(() => {
    jest.resetModules()
    delete process.env.NODE_ENV
  })
  afterEach(() => {
    jest.clearAllMocks()
    process.env.NODE_ENV = INITIAL_NODE_ENV
  })

  it('should call appropriate sentry logger on production', () => {
    process.env.NODE_ENV = 'production'
    logger(error)
    expect(Sentry.captureException).toHaveBeenCalledWith(error)
  })

  it('should call console.err on development', () => {
    process.env.NODE_ENV = 'development'
    logger(error)
    expect(spy).toHaveBeenCalledWith(error)
  })
})
