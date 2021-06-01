import { ApiKeyModel } from '@/models'
import { v4 as uuid } from 'uuid'

export const db = {
  put: jest.fn((ob) => ({
    ...ob,
    id: uuid(),
    apiKey: uuid(),
    keyCreatedAt: new Date().toISOString(),
  })),
  get: jest.fn((ob) => {
    if (ob.id === '1234') {
      const model = Object.assign(new ApiKeyModel(), ob)
      model.apiKey = uuid()
      model.id = '1234'

      return model
    }
  }),
  query: jest.fn(() => ({
    async *[Symbol.asyncIterator]() {
      yield* []
    },
  })),
  delete: jest.fn(),
}
