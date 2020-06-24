import * as Yup from 'yup'
import { formFields } from './form-fields'
import errorMessages from '@/constants/error-messages'

const { FIELD_REQUIRED } = errorMessages

const { name, officeEmail } = formFields
export const companyInformationFormSchema = Yup.object().shape({
  [name.name]: Yup.string()
    .trim()
    .required(FIELD_REQUIRED),
  [officeEmail.name]: Yup.string().email(),
})
