import { validationResult } from 'express-validator'
import validateRequest from '../validate-request'

jest.mock('express-validator', () => ({
  validationResult: jest.fn(() => ({
    isEmpty: () => false,
    array: () => 'errors here',
  })),
}))

describe('validateRequest middleware', () => {
  it('should throw an error if theyve been detected', () => {
    const req: any = {}
    const res: any = {
      status: jest.fn(),
      json: jest.fn(),
    }
    const next = jest.fn()

    validateRequest(req, res, next)

    expect(validationResult).toHaveBeenCalledWith(req)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({
      errors: 'errors here',
    })
  })
})
