import { getApiErrorsFromResponse, ApiFormErrorsResponse } from '../errors'
import { CreateAppModel } from '@reapit/foundations-ts-definitions'

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

  it('should return null', () => {
    expect(getApiErrorsFromResponse(null)).toEqual(null)
  })

  it('should return null', () => {
    expect(getApiErrorsFromResponse(undefined)).toEqual(null)
  })
})
