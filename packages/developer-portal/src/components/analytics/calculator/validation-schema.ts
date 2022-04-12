/* istanbul ignore file */

import * as Yup from 'yup'
import errorMessages from '../../../constants/error-messages'
import { numberOnlyRegex } from '@reapit/utils-common'

export const validationSchema = Yup.object().shape({
  endpointsUsed: Yup.string().trim().required(errorMessages.FIELD_REQUIRED),
  apiCalls: Yup.string()
    .trim()
    .required(errorMessages.FIELD_REQUIRED)
    .matches(numberOnlyRegex, 'Must be a numeric value'),
})
