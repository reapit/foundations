import { FormFieldInfo } from '@reapit/utils'
export type FieldKeyDeclineModal = 'rejectionReasonField'

export const formFieldsDeclineModal: Record<FieldKeyDeclineModal, FormFieldInfo> = {
  rejectionReasonField: {
    name: 'rejectionReason',
    label: 'Rejection reason',
  },
}
