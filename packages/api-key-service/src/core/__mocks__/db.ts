import { v4 as uuid } from 'uuid'

export const db = {
  put: jest.fn((ob) => ({
    ...ob,
    id: uuid(),
    apiKey: uuid(),
    keyCreatedAt: new Date().toISOString(),
  })),
  get: jest.fn(),
  query: jest.fn(() => ({
    async *[Symbol.asyncIterator]() {
      yield* [];
    },
  })),
  delete: jest.fn(),
}
