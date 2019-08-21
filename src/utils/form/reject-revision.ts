import { RejectRevisionModel } from '@/types/marketplace-api-schema'
import { validateRequire } from '@reapit/elements'

export type SubmitRevisionFormErrorKeys = keyof RejectRevisionModel

export const validate = (values: RejectRevisionModel) => {
  let errors = validateRequire<RejectRevisionModel, SubmitRevisionFormErrorKeys>({
    values,
    currentErrors: {},
    keys: ['rejectionReason']
  })

  return errors
}
