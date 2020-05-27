import * as React from 'react'
import { shallow } from 'enzyme'

import Router, { catchError } from '../router'

describe('Router', () => {
  it('should match a snapshot', () => {
    window.reapit.config.appEnv === 'development'
    expect(shallow(<Router />)).toMatchSnapshot()
  })

  describe('catchError', () => {
    it('should return promise', done => {
      const fn = jest.fn().mockResolvedValue(<div>Test</div>)
      const promiseFn = catchError(fn)
      expect(promiseFn).toBeDefined()
      expect(fn).toBeCalled()
      expect(
        promiseFn.then(result => {
          expect(result).toEqual(<div>Test</div>)
          done()
        }),
      )
    })
  })
})
