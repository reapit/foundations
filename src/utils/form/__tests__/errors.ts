import { getApiErrorsFromResponse, ApiFormErrorsResponse } from '../errors'
import { CreateAppModel } from '@/types/marketplace-api-schema'

type InputOutput = [ApiFormErrorsResponse, CreateAppModel | null]

const values: InputOutput[] = [
  [{ errors: [{ field: 'developerId', message: 'invalid' }] }, { developerId: 'invalid' }],
  [{ errors: [] }, {}],
  [{ errors: null }, null],
  [{}, null],
  [undefined, null],
  [null, null]
]

describe('getApiErrorsFromResponse', () => {
  it('should return to correct structure', () => {
    values.forEach(([input, output]) => {
      expect(getApiErrorsFromResponse(input)).toEqual(output)
    })
  })
})
