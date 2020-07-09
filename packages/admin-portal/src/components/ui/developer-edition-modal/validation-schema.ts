import * as Yup from 'yup'
import { formFields } from './form-fields'
import errorMessages from '@/constants/error-messages'

const { developerList } = formFields

/* istanbul ignore next */
const validationSchema = Yup.object().shape({
  [developerList.name]: Yup.string().required(errorMessages.FIELD_REQUIRED),
})

export default validationSchema
