import { validate, REJECT_EMPTY_MESSAGE } from '../reject-revision'
import { RejectRevisionModel } from '@reapit/foundations-ts-definitions'

describe('rejectRevisionValidation', () => {
  it('validate required fields', () => {
    const input: RejectRevisionModel = {
      rejectionReason: '',
    }

    const output = {
      rejectionReason: REJECT_EMPTY_MESSAGE,
    }

    expect(validate(input)).toEqual(output)
  })

  it('validate required fields with spaces', () => {
    const input: RejectRevisionModel = {
      rejectionReason: ' ',
    }

    const output = {
      rejectionReason: REJECT_EMPTY_MESSAGE,
    }

    expect(validate(input)).toEqual(output)
  })
})
