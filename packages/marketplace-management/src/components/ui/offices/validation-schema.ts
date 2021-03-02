import * as Yup from 'yup'
import { formFields } from './form-fields'
import errorMessages from '../../../constants/error-messages'

const { name, officeIds } = formFields

export const validationSchema = Yup.object().shape({
  [name.name]: Yup.string().trim().required(errorMessages.FIELD_REQUIRED),
  [officeIds.name]: Yup.array().min(1, errorMessages.FIELD_REQUIRED),
})
