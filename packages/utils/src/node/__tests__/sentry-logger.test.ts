import * as Sentry from '@sentry/node'
import { createWistonLoggerErrorFn, stringifyError, cleanObject } from '../sentry-logger'

jest.mock('serialize-error', () => ({
  serializeError: jest.fn(() => ({
    stack: 'test',
  })),
}))

describe('stringifyError', () => {
  it('should serialize correct error', () => {
    const err = new Error('err')
    expect(stringifyError(err)).toEqual(JSON.stringify({ stack: 'test' }))
  })
})

describe('cleanObject', () => {
  it('should run correctly', () => {
    expect(cleanObject({})).toEqual({})
    expect(cleanObject({ a: undefined })).toEqual({})
    expect(cleanObject({ a: undefined, b: 'a' })).toEqual({ b: 'a' })
    expect(cleanObject({ a: null, b: 'a' })).toEqual({ b: 'a' })
  })
})

describe('createWistonLoggerErrorFn', () => {
  const mockScope = { setExtra: jest.fn() }
  const spyWithScope = jest.spyOn(Sentry, 'withScope')
  const spyCaptureException = jest.spyOn(Sentry, 'captureException')
  const mockInputLoggerErrorFn = jest.fn()

  it('should send error to try correctly', () => {
    const loggerErrorFn = createWistonLoggerErrorFn(mockInputLoggerErrorFn)
    process.env.NODE_ENV = 'production'
    const error = new Error('mockError')

    const caller = 'test'
    const meta = { error, headers: 'test', traceId: 'test' }
    loggerErrorFn(caller, meta)

    expect(spyWithScope).toHaveBeenCalled()
    spyWithScope.mock.calls[0][0]((mockScope as unknown) as Sentry.Scope)
    expect(mockScope.setExtra).toHaveBeenCalled()
    expect(spyCaptureException).toHaveBeenCalledWith(error)
  })
})
