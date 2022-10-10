import React from 'react'
import { render } from '../../tests/react-testing'
import Router, { catchChunkError } from '../router'

jest.mock('../analytics')
jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: () => ({
    connectSession: {
      loginIdentity: {},
      groups: [],
    },
    connectInternalRedirect: '',
  }),
}))

describe('Router', () => {
  window.location.pathname = '/'
  it('should match a snapshot', () => {
    expect(render(<Router />)).toMatchSnapshot()
  })

  describe('catchChunkError', () => {
    it('should return promise', (done) => {
      const fn = jest.fn().mockResolvedValue(<div>Test</div>)
      const promiseFn = catchChunkError(fn)
      expect(promiseFn).toBeDefined()
      expect(fn).toBeCalled()
      expect(
        promiseFn.then((result) => {
          expect(result).toEqual(<div>Test</div>)
          done()
        }),
      )
    })
  })
})
