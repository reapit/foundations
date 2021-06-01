import { v4 as uuid } from 'uuid'

export const db = {
  put: jest.fn((ob) => ({
    ...ob,
    id: uuid(),
    apiKey: uuid(),
    keyCreatedAt: new Date().toISOString(),
  })),
  get: jest.fn(),
  getBatch: jest.fn(),
  delete: jest.fn(),
  query: jest.fn(),
}
