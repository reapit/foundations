import * as Sentry from '@sentry/react'
import { logger } from '..'

describe('sentryLogger', () => {
  const spyWithContext = jest.spyOn(Sentry, 'setContext')
  const spyCaptureException = jest.spyOn(Sentry, 'captureException')
  it('should correctly capture', () => {
    process.env.NODE_ENV = 'production'
    const error = new Error('mockError')
    logger(error)
    expect(spyWithContext).toBeCalled()
    expect(spyCaptureException).toBeCalled()
  })
})
