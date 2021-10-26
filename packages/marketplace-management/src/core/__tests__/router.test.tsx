import * as React from 'react'
import { render } from '@testing-library/react'
import Router, { catchChunkError } from '../router'

describe('Router', () => {
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
