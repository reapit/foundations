import { Request, Response } from 'express'

export const mockRes = ({ status: jest.fn(), json: jest.fn(), end: jest.fn() } as Partial<Response>) as Response
export const mockReq = {
  url: '/mock/url',
  body: {}
} as Request
