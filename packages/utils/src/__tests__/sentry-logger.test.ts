import * as Sentry from '@sentry/browser'
import { logger } from '../sentry-logger'

describe('sentryLogger', () => {
  const spyWithScope = jest.spyOn(Sentry, 'withScope')
  const spyCaptureException = jest.spyOn(Sentry, 'captureException')
  it('shoudl run correctly', () => {
    process.env.NODE_ENV = 'production'
    const error = new Error('mockError')
    logger(error)
    expect(spyWithScope).toBeCalled()
    expect(spyCaptureException).toBeCalled()
  })
})
