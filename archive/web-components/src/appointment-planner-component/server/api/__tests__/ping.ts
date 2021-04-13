import { Request, Response } from 'express'
import { ping } from '../ping'

describe('ping endpoint', () => {
  it('ping', () => {
    const req = {
      url: '/ping',
    } as Request

    const response = ({
      status: jest.fn(),
      end: jest.fn(),
    } as unknown) as Response

    ping(req, response)

    expect(response.status).toHaveBeenCalledWith(200)
    expect(response.end).toHaveBeenCalledTimes(1)
  })
})
