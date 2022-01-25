import { Request, Response } from 'express'
import { hello } from '../hello'

describe('Hello test', () => {
  it('Hello returns "Hello there!"', () => {
    hello(
      {} as Request,
      {
        send: (value) => {
          expect(value).toBe('Hello there!')
        },
      } as Response,
    )
  })
})
