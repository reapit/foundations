import { RejectRevisionModel } from '@reapit/foundations-ts-definitions'
import { validateRequire } from '@reapit/elements'
import { cleanObject } from '@reapit/utils'

export type SubmitRevisionFormErrorKeys = keyof RejectRevisionModel

export const REJECT_EMPTY_MESSAGE = 'Rejection reason is invalid'

export const validate = (values: RejectRevisionModel) => {
  const errors = validateRequire<RejectRevisionModel, SubmitRevisionFormErrorKeys>({
    values,
    currentErrors: {},
    keys: ['rejectionReason'],
  })

  const formattedValues: RejectRevisionModel = cleanObject(values)
  const { rejectionReason } = formattedValues

  const isEmptyRejectionReason = !rejectionReason

  // Custom validate messages
  if (isEmptyRejectionReason) {
    errors.rejectionReason = REJECT_EMPTY_MESSAGE
  }

  return errors
}
