import React from 'react'
import { catchChunkError } from '../catch-chunk-error'
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
