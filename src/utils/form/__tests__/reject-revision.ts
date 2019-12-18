import { validate } from '../reject-revision'
import { RejectRevisionModel } from '@reapit/foundations-ts-definitions'

import errorMessages from '@/constants/error-messages'

describe('rejectRevisionValidation', () => {
  it('validate required fields', () => {
    const input: RejectRevisionModel = {
      rejectionReason: ''
    }

    const validateRequiredKeys = ['rejectionReason']

    const output = {}
    for (let key of validateRequiredKeys) {
      output[key] = errorMessages.FIELD_REQUIRED
    }
    expect(validate(input)).toEqual(output)
  })
})
