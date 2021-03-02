import * as Yup from 'yup'
import { formFieldsDeclineModal } from './form-fields'
import errorMessages from '@/constants/error-messages'

export const validationSchemaDeclineModal = Yup.object().shape({
  [formFieldsDeclineModal.rejectionReasonField.name]: Yup.string().trim().required(errorMessages.FIELD_REQUIRED),
})
