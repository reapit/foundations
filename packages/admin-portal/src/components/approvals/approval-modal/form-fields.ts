import { FormFieldInfo } from '@reapit/utils-common'
export type FieldKeyDeclineModal = 'rejectionReasonField'

export const formFieldsDeclineModal: Record<FieldKeyDeclineModal, FormFieldInfo> = {
  rejectionReasonField: {
    name: 'rejectionReason',
    label: 'Rejection reason',
  },
}
